<?php

class URLParser{

    private $parsrTimeout = 600;
    private $searchURLs = array();
    private $streamLimit = 8;
    private $domen = '';
    private $workBegin = null;
    private $csvfile = '';
    private $notParsedUrlInfo = array();
    private $isRuningNow = false;
    private $startURL = '';
    private $primaryRootUrl = '';
    private $secondaryRootUrl = '';
    public static $csvResultLocation = 'wp-content/uploads/';

    public function run(){
        if (isset($_POST['collect-site-urls'])){
            $this->parse($_POST['collect-site-urls']);
        }elseif (isset($_POST['old_website']) && isset($_POST['new_website'])){
            $this->compareOldNewURLs($_POST['old_website'], $_POST['new_website']);
        }elseif (isset($_POST['only-save-301'])){
            $this->save301RedirectMap();
        }elseif (isset($_POST['save-301-and-redirect'])){
            $this->add301RedirectMap();
        }elseif (isset($_POST['save-301-and-htaccess'])){
            $this->generateHtaccessRedirectPart();
        }
    }

    private function save301RedirectMap(){
        if (isset($_POST['source']) && is_array($_POST['source']) && is_array($_POST['target'])){
            $sourceHost = $_POST['sourceHost'];
            $targetHost = $_POST['targetHost'];
            $csvfile = $this->getCSVResultPath() . '301-map.csv';
            $fcsv = fopen($csvfile, 'w+');
            fputcsv($fcsv, array('Source', 'Target'));
            foreach ($_POST['source'] as $ks=>$source){
                $sourcepath = parse_url($source);
                $targetpath = parse_url($_POST['target'][$ks]);
                if (ltrim($source)!='' && ltrim($_POST['target'][$ks])!='' && ( trim($sourcepath['path'], '/')!=trim($targetpath['path'], '/')) ){
                    fputcsv($fcsv, array(rtrim($sourceHost, '/') . '/' . ltrim($source, '/'), rtrim($targetHost, '/') . '/' . ltrim($_POST['target'][$ks], '/')));
                }
            }
            fclose($fcsv);
            $noticeMessage = "Changes saved to 301-map.csv<br>";
            $this->addWpNotice($noticeMessage);
        }
    }

    private function generateHtaccessRedirectPart(){
        $this->save301RedirectMap();

        $insertValues = array();
        $csvfile = $this->getCSVResultPath() . '301-map.csv';
        $htaccessPart = $this->getCSVResultPath() . 'htaccess-redirect-part.txt';
        $htaccessHandle = fopen($htaccessPart, 'w+');
        $counter = 0;
        if (($handle = fopen($csvfile, "r")) !== FALSE && $htaccessHandle!== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $source = parse_url($data[0]);
                $target = parse_url($data[1]);
                if ($source['path']!=$target['path'] && strpos($data[0], 'http')!==false){
                    $counter++;
                    fputs($htaccessHandle, "Redirect 301 ^/".ltrim($source['path'], '/')."$ {$target['path']}\n");
                }
            }
            fclose($handle);
        }
        fclose($htaccessHandle);
        $noticeMessage = "htaccess-redirect-part.txt generated ($counter redirects)<br>";
        $this->addWpNotice($noticeMessage);
    }

    private function add301RedirectMap(){
        $this->save301RedirectMap();

        $redirectionPluginInstalled = is_plugin_active('redirection/redirection.php');
        if ($redirectionPluginInstalled){

            global $wpdb;
            $queries = array();
            $queries[] = "DELETE FROM {$wpdb->prefix}redirection_items WHERE {$wpdb->prefix}redirection_items.action_code=301";
            $insert = "INSERT INTO {$wpdb->prefix}redirection_items ({$wpdb->prefix}redirection_items.url, {$wpdb->prefix}redirection_items.regex, {$wpdb->prefix}redirection_items.position, {$wpdb->prefix}redirection_items.last_access, {$wpdb->prefix}redirection_items.action_type, {$wpdb->prefix}redirection_items.group_id, {$wpdb->prefix}redirection_items.action_code, {$wpdb->prefix}redirection_items.action_data, {$wpdb->prefix}redirection_items.match_type) VALUES ";
            $insertValues = array();
            $csvfile = $this->getCSVResultPath() . '301-map.csv';
            $counter = 0;
            if (($handle = fopen($csvfile, "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                    if ($data[0]=='' && $data[1]=='') continue;
                    $source = parse_url($data[0]);
                    $target = parse_url($data[1]);
                    if ($source['path']!=$target['path'] && strpos($data[0], 'http')!==false){
                        $counter++;
                        $insertValues[] = "( '^/".trim($source['path'], '/')."[/]?$', 1, $counter, '0000-00-00 00:00:00', 'url', 1, 301, '".$data[1]."', 'url' )";
                    }
                }
                fclose($handle);
            }
            $insert .= implode(', ', $insertValues) . ';';
            $queries[] = $insert;
            foreach ($queries as $q){
                $wpdb->query($q);
            }
            $noticeMessage = $counter." redirects(301) added to Redirection plugin";
            $this->addWpNotice($noticeMessage);
        }else{
            $noticeMessage = "Redirection plugin not installed. The List of redirects saved in file";
            $this->addWpNotice($noticeMessage);
        }
    }

    private function getPagesContent($parseUrls){
        $multi_init = curl_multi_init();
        $job = array();

        foreach ($parseUrls as $url=>$parsed){
            $init = curl_init($url);
            curl_setopt($init, CURLOPT_FOLLOWLOCATION, 0);
            curl_setopt($init, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($init, CURLOPT_CONNECTTIMEOUT, 100);
            curl_setopt($init, CURLOPT_TIMEOUT, 100);

            curl_setopt($init, CURLOPT_VERBOSE, 1);
            curl_setopt($init, CURLOPT_HEADER, 1);

            if (isset($_POST['parse-as-mobile']) && $_POST['parse-as-mobile']==1){
                curl_setopt($init,CURLOPT_USERAGENT,'User-agent: Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3B48b Safari/419.3');
            }

            $job[$url] = $init;
            curl_multi_add_handle($multi_init, $init);
        }
        $thread = null; // count active streams

        do { // start handle streams
            $thread_exec = curl_multi_exec($multi_init, $thread);
        }
        while ($thread_exec == CURLM_CALL_MULTI_PERFORM);
        $n = 0;
        while ($thread && ($thread_exec == CURLM_OK)) { // while there are active streams
            if ($this->timeoutExit())
                return;

            curl_multi_exec($multi_init, $thread); // doesnot work without that

            if (curl_multi_select($multi_init) === -1) { // PHP-CURL BUG FIX
                //if it returns -1, wait a bit, but go forward anyways!
                usleep(100);
            }
            if (curl_multi_select($multi_init) != -1) { // if stream is ready
                do { // wait anything changes in stream
                    if ($this->timeoutExit())
                        return;
                    $thread_exec = curl_multi_exec($multi_init, $thread);
                    $info = curl_multi_info_read($multi_init); // read stream info

                    if ($info['msg'] == CURLMSG_DONE) { // if stream finished
                        $init = $info['handle'];
                        $page = array_search($init, $job); // find current job
                        $job[$page] = curl_multi_getcontent($init); // get page content
                        curl_multi_remove_handle($multi_init, $init); // remove stream
                        curl_close($init); // close single stream
                    }
                }
                while ($thread_exec == CURLM_CALL_MULTI_PERFORM);
            }
            $n++;
            if ($n>1000){
                //print 'no result > next <br/>';
                break;
            }
        }

        curl_multi_close($multi_init);

        $fcsv = fopen($this->csvfile, 'a+');
        // parse links
        foreach ($job as $url=>$responce){

            list($headers, $source) = $this->parseCurlResponse($responce);

            if (!is_string($source))
                continue;
            preg_match( '/<h1.+<\/h1>/iU', $source, $title );
            if (!is_array($title)) $title = array('');
            //$url = trim($url, '/');
            $addToCsv = true;
            $csvData = array();
            $csvData[] = $url;
            if (isset($this->notParsedUrlInfo[$url])){
                $csvData[] = $this->notParsedUrlInfo[$url]['found_at'];
                $csvData[] = $this->notParsedUrlInfo[$url]['link_text'];
                unset($this->notParsedUrlInfo[$url]);
            }else{
                $csvData[] = '';
                $csvData[] = '';
            }
            $csvData[] = strip_tags($title[0]);
            $csvData[] = (isset($headers['Status']))?$headers['Status']:'';

//            // TODO: need to try to load url one more time if no response returned
//            if ( ( !isset($headers['Status']) || $headers['Status']==503 ) && $this->searchURLs[$url]==1 )
//                $this->searchURLs[$url] = 2;

            if ( isset($headers['Status']) && (($headers['Status']==301 || $headers['Status']==302)) && $headers['Location']){

                //if ( count($this->searchURLs)==1 && strpos(str_replace('www.', '', $headers['Location']), str_replace('www.', '', $this->primaryRootUrl))!==false ){ // it may be redirect to www or non www domen. when first url is redirected so we change $this->domen
                if ( count($this->searchURLs)==1){ // it may be redirect to www or non www domen. when first url is redirected so we change $this->domen
                    $l1 = parse_url($headers['Location']);
                    $l2 = parse_url($this->primaryRootUrl);
                    if ( $l1['host']!=$l2['host'] && strpos($l1['host'], str_replace('www.', '', $l2['host']))!==false || strpos($l2['host'], str_replace('www.', '', $l1['host']))!==false ){
                        $this->domen = parse_url($headers['Location']);
                        if ( strpos($headers['Location'], '://www.')===false ){
                            $this->primaryRootUrl = $this->domen['scheme'] . '://' . $this->domen['host'];
                            $this->secondaryRootUrl = $this->domen['scheme'] . '://www.' . str_replace('www.', '', $this->domen['host']);
                        }else{
                            $this->primaryRootUrl = $this->domen['scheme'] . '://www.' . str_replace('www.', '', $this->domen['host']);
                            $this->secondaryRootUrl = $this->domen['scheme'] . '://' . $this->domen['host'];
                        }
                        unset($this->searchURLs[$url]); // we were redirected to another (sub)domain of website from startUrl. we dont need the startUrl
                        $addToCsv = false;
                    }
                }
                $csvData[] = $headers['Location'];//trim($headers['Location'], '/');
                if (($oneUrl = $this->addToSearchUrls($headers['Location']))!==false) // add redirect to URL to urls list to parse
                    $this->notParsedUrlInfo[$oneUrl] = array('found_at'=>$url, 'link_text'=>'');
            }else
                $csvData[] = '';

            if ($addToCsv)
                fputcsv($fcsv,  $csvData );

            // search for new website urls in page content
            if ($source > '') {
                preg_match_all('/<a.*href=(\"|\')([^\"\']+)(\"|\').*>(.*)<\/a>/Uis', $source, $pageUrls);
                if (!is_array($pageUrls) || !is_array($pageUrls[2])) return;

                foreach ($pageUrls[2] as $j=>$oneUrl) {
                    if (($oneUrl = $this->addToSearchUrls($oneUrl))!==false){
                        $link_text = isset($pageUrls[4][$j])?$pageUrls[4][$j]:'';
                        $this->notParsedUrlInfo[$oneUrl] = array('found_at'=>$url, 'link_text'=>preg_replace( "/\r|\n/", "", strip_tags($link_text)));
                    }
                }
            }
        }
        fclose($fcsv);
    }

    // add the URL found in page source into array of website urls
    private function addToSearchUrls($oneUrl){
        if (isset($this->searchURLs[$oneUrl])) return false;

        if (strpos($oneUrl, '/')===0) // if related link
            $oneUrl = $this->primaryRootUrl . $oneUrl;

        if ($oneUrl=='#') return false;
        $oneUrl = explode('#', $oneUrl);
        if (is_array($oneUrl))
            $oneUrl = $oneUrl[0];
        $oneUrl = explode('?', $oneUrl);
        if (is_array($oneUrl))
            $oneUrl = $oneUrl[0];
        $oneUrl = ltrim($oneUrl, '/');

        if (preg_match('{^https?://}', $oneUrl) && !preg_match('{^' . preg_quote($this->primaryRootUrl) . '}', $oneUrl) && !preg_match('{^' . preg_quote($this->secondaryRootUrl) . '}', $oneUrl)) return false;
        if (preg_match('{^(mailto|callto|tel|javascript):}', $oneUrl)) return false;
        if (preg_match('{\.(css|pdf|xml|ico|png|jpg|gif)$}i', $oneUrl)) return false;
        //if (preg_match('{/page/\d+/?$}', $oneUrl)) return false;
        //if (strpos($oneUrl, '.php')!==false) return false;
        if (strpos($oneUrl, '/feed')!==false) return false;
        if (strpos($oneUrl, "http://") === false && strpos($oneUrl, "https://") === false)
            $oneUrl = $this->primaryRootUrl . '/' . $oneUrl;
        if (isset($this->searchURLs[$oneUrl]))  return false;
        if (!preg_match('{^' . preg_quote($this->primaryRootUrl) . '}', $oneUrl) && !preg_match('{^' . preg_quote($this->secondaryRootUrl) . '}', $oneUrl)) return false;

        if (!isset($this->searchURLs[$oneUrl])){
            $this->searchURLs[$oneUrl] = 0;
        }
        return $oneUrl;
    }

    public function parse($startURL){
        $starttime = time();
        $this->startURL = $startURL;//trim($startURL, '/');
        if (strpos($this->startURL, 'http')!==0)
            $this->startURL = 'http://' . $this->startURL;
        if ($this->startURL>''){
            $this->searchURLs[$this->startURL] = 0;
            $this->domen = parse_url($this->startURL);
            if ( strpos($this->startURL, '://www.')===false ){
                $this->primaryRootUrl = $this->domen['scheme'] . '://' . $this->domen['host'];
                $this->secondaryRootUrl = $this->domen['scheme'] . '://www.' . str_replace('www.', '', $this->domen['host']);
            }else{
                $this->primaryRootUrl = $this->domen['scheme'] . '://www.' . str_replace('www.', '', $this->domen['host']);
                $this->secondaryRootUrl = $this->domen['scheme'] . '://' . $this->domen['host'];
            }
            $this->workBegin = time();
            $this->csvfile = $this->getCSVResultPath() . $this->domen['host'].'-urls.csv';
            $fcsv = fopen($this->csvfile, 'w+');
            fputcsv($fcsv, array('Site URL', 'Found at page', 'Link Text was', 'URL Page Title', 'Status Code', 'Redirect To'));
            fclose($fcsv);
        }else return;

        set_time_limit(0);
        $this->isRuningNow = true;
        $countFoundAndParsed = 0;
        $noticeMessage = '';

        // any url is NOT parsed ==0 in $this->searchURLs
        while (in_array(0, $this->searchURLs) || in_array(2, $this->searchURLs)){
            $countUrlsToParse = 0;
//            if ( count($this->searchURLs)>20 ) exit;
            if ($this->timeoutExit())
                return;
            $searchURLsClone = array();
            $counter = 0;
            foreach ($this->searchURLs as $oneUrl=>$parsed){
                if ( (strpos($oneUrl, $this->primaryRootUrl)===false && strpos($oneUrl, $this->secondaryRootUrl)===false) || $parsed!=0 ) // other website OR already parsed/parsing
                    continue;
                $counter++;
                // run getPagesContent with limited list of urls. if some
                if ($counter <= $this->streamLimit){
                    $this->searchURLs[$oneUrl] = 1; // mark as parsing in process
                    $countUrlsToParse++;
//                    print "$counter : $oneUrl add to parsing <br>";
                    $searchURLsClone[$oneUrl] = 0;
                    if ($counter == $this->streamLimit)
                        break;
                }
            }
            // run only with full up to streamLimit list of urls
            if ($counter==$this->streamLimit || ($counter==count($searchURLsClone) && $counter>0 ) ){
                $countFoundAndParsed = $countFoundAndParsed + count($searchURLsClone);
                $this->getPagesContent($searchURLsClone);
                usleep(1000000);
            }
        }
        $noticeMessage .= $countFoundAndParsed . " urls found & parsed<br>";
        $noticeMessage .= "Total time:" . (time()-$starttime) . " seconds<br>";
        $noticeMessage .= "{$this->domen['host']}-urls.csv generated<br>";
        $this->addWpNotice($noticeMessage);
    }

    // may use for debugging
    private function timeoutExit(){
        if ($this->isRuningNow && (time()-$this->workBegin)>$this->parsrTimeout && $this->parsrTimeout>0){
            $this->csvfile = $this->getCSVResultPath() . $this->domen['host'].'-urls-not-parsed.csv';
            $fcsv = fopen($this->csvfile, 'w+');
            foreach ($this->searchURLs as $oneUrl=>$parsed){
                if ( $parsed==0 ){
                    $csvData = array($oneUrl);
                    if (isset($this->notParsedUrlInfo[$oneUrl])){
                        $csvData[] = $this->notParsedUrlInfo[$oneUrl]['found_at'];
                        $csvData[] = $this->notParsedUrlInfo[$oneUrl]['link_text'];
                        unset($this->notParsedUrlInfo[$oneUrl]);
                    }
                    fputcsv($fcsv, $csvData);
                }
            }
            fclose($fcsv);
            $this->searchURLs = array();
            $this->isRuningNow = false;

            $noticeMessage = "parse timeout";
            $noticeMessage .= "not parsed urls in {$this->domen['host']}-urls-not-parsed.csv file";
            $this->addWpNotice($noticeMessage);

            return true;
        }elseif (!$this->isRuningNow)
            return true;
        return false;
    }

    public function compareOldNewURLs($oldWebsiteURLsCsv, $newWebsiteURLsCsv){

        // read csv files containing source/target URLs
        $oldWebsiteURLs = array();
        $newWebsiteURLs = array();
        $first = true;
        if (($handle = fopen($oldWebsiteURLsCsv, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                if ($first){ $first=false; continue; }
                $oldWebsiteURLs[] = $data;
            }
            fclose($handle);
        }
        $first = true;
        if (($handle = fopen($newWebsiteURLsCsv, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                if ($first){ $first=false; continue; }
                $newWebsiteURLs[] = $data;
            }
            fclose($handle);
        }

        $matches = array();
        $handledOldWebsiteUrls = array();
        foreach ($oldWebsiteURLs as $ko=>$oneOldWebsiteURL){

            // check for redirection and find end point
            $oldUrlEndpoint = $oneOldWebsiteURL;
            $foundEndpoint = false;
            while ($oldUrlEndpoint[4]==301 || $oldUrlEndpoint[4]==302){
                foreach ($oldWebsiteURLs as $urlData){
                    if ($urlData[0]==$oldUrlEndpoint[5]){
                        $oldUrlEndpoint = $urlData;
                        $foundEndpoint = true;
                    }
                }
                if (!$foundEndpoint)
                    break;
            }

//            if ( strpos($oneOldWebsiteURL[0], 'tag/choice-based-conjoint-analysis')===false)
//                continue;
            $oneOldWebsiteURLInfo = parse_url($oldUrlEndpoint[0]);
            $oneOldWebsiteURLInfo['path'] = trim($oneOldWebsiteURLInfo['path'], '/');
            $pos = (int)strrpos( $oneOldWebsiteURLInfo['path'], '/' ) + 1;
            $oneOldWebsiteURLInfo['slug'] = trim(substr($oneOldWebsiteURLInfo['path'], $pos), '/');
            if ($oneOldWebsiteURLInfo['slug']=='') continue; // if slug=='' - its front page
            $oldUrlEndpoint[3] = mb_strtolower($this->clean_text($oldUrlEndpoint[3])); // Page Title

            $similarUrls = array();
            foreach ($newWebsiteURLs as $kn=>$oneNewWebsiteURL){
                $oneNewWebsiteURLInfo = parse_url($oneNewWebsiteURL[0]);
                $oneNewWebsiteURLInfo['path'] = trim($oneNewWebsiteURLInfo['path'], '/');
                $pos = (int)strrpos($oneNewWebsiteURLInfo['path'], '/' ) + 1;
                $oneNewWebsiteURLInfo['slug'] = trim(substr($oneNewWebsiteURLInfo['path'], $pos), '/');
                if ($oneNewWebsiteURLInfo['slug']=='') continue; // if slug=='' - its front page
                $oneNewWebsiteURL[3] = mb_strtolower($this->clean_text($oneNewWebsiteURL[3])); // Page Title

                $percentSimilarPageTitle = 0;
                similar_text($oldUrlEndpoint[3], $oneNewWebsiteURL[3], $percentSimilarPageTitle);

                if ($oneOldWebsiteURLInfo['path'] == $oneNewWebsiteURLInfo['path'] && $oldUrlEndpoint[3] == $oneNewWebsiteURL[3]){
                    $similarUrls[$kn] = 10;
                }elseif ($oneOldWebsiteURLInfo['slug'] == $oneNewWebsiteURLInfo['slug'] && $oldUrlEndpoint[3] == $oneNewWebsiteURL[3]){
                    $similarUrls[$kn] = 9;
                }elseif ($oneOldWebsiteURLInfo['path'] == $oneNewWebsiteURLInfo['path']){
                    $similarUrls[$kn] = 8;
                }elseif ($oneOldWebsiteURLInfo['path'] == $oneNewWebsiteURLInfo['path'] && $percentSimilarPageTitle>80){
                    $similarUrls[$kn] = 7;
                }elseif ($oneOldWebsiteURLInfo['slug'] == $oneNewWebsiteURLInfo['slug'] && $percentSimilarPageTitle>80){
                    $similarUrls[$kn] = 6;
                }elseif ($oneOldWebsiteURLInfo['slug'] == $oneNewWebsiteURLInfo['slug'] && $oneNewWebsiteURLInfo['slug']!=''){
                    $similarUrls[$kn] = 5;
                }
//                elseif ($oldUrlEndpoint[3] == $oneNewWebsiteURL[3] && $oneNewWebsiteURL[3]!=''){  // same titles
//                    $similarUrls[$kn] = 4;
//                }
            }
            arsort($similarUrls, SORT_NUMERIC);

            if (count($similarUrls)>0){
                $weight = array_shift(array_values($similarUrls));
                $kn = array_shift(array_keys($similarUrls));

                // check for redirection and find end point
                $newUrlEndpoint = $newWebsiteURLs[$kn];
                $foundEndpoint = false;
                while ($newUrlEndpoint[4]==301 || $newUrlEndpoint[4]==302){
                    foreach ($newWebsiteURLs as $k=>$urlData){
                        if ($urlData[0]==$newUrlEndpoint[5]){
                            $newUrlEndpoint = $urlData;
                            $foundEndpoint = true;
                        }
                    }
                    if (!$foundEndpoint)
                        break;
                }
                $matches[] = array($weight, $oneOldWebsiteURL, $newUrlEndpoint);
                //unset($oldWebsiteURLs[$ko]);
                //unset($newWebsiteURLs[$kn]);
                $handledOldWebsiteUrls[] = $ko;
            }
        }

        $this->csvfile = $this->getCSVResultPath() . '301-redirects-auto.csv';
        $fcsv = fopen($this->csvfile, 'w+');
        fputcsv($fcsv, array('Old', 'New', 'Old Page Title', 'New Page Title', 'Weight match'));
        foreach ($matches as $oneMatch){
            $csvData = array($oneMatch[1][0], $oneMatch[2][0], $oneMatch[1][3], $oneMatch[2][3], $oneMatch[0], $oneMatch[3]);
            fputcsv($fcsv, $csvData);
        }
        fclose($fcsv);

        $this->csvfile = $this->getCSVResultPath() . 'source-no-target.csv';
        $fcsv = fopen($this->csvfile, 'w+');
        fputcsv($fcsv, array('Site URL', 'Found at page', 'Link Text was', 'URL Page Title'));
        foreach ($oldWebsiteURLs as $ko=>$oneMatch){
            if (in_array($ko, $handledOldWebsiteUrls)) continue;
            if (strpos(str_replace('//', '', $oneMatch[0]), '/')!==false)
                fputcsv($fcsv, $oneMatch);
        }
        fclose($fcsv);

        $this->csvfile = $this->getCSVResultPath() . 'target-no-source.csv';
        $fcsv = fopen($this->csvfile, 'w+');
        fputcsv($fcsv, array('Site URL', 'Found at page', 'Link Text was', 'URL Page Title'));
        foreach ($newWebsiteURLs as $oneMatch){
            if (strpos(str_replace('//', '', $oneMatch[0]), '/')!==false)
                fputcsv($fcsv, $oneMatch);
        }
        fclose($fcsv);

        $noticeMessage = count($matches)." url matches found<br>";
        $noticeMessage .= "With no related URLs at new site: " . (count($oldWebsiteURLs)-count($matches)) . '<br>';
        $this->addWpNotice($noticeMessage);
    }

    public function addWpNotice($message, $isError = false){
            if ($isError)
                echo '<div id="message" class="error">';
            else
                echo '<div id="message" class="updated fade">';
            echo "<p><strong>".$message."</strong></p></div>";
    }

    public static function getCSVResultPath(){
        return self::fs_get_wp_config_path() . self::$csvResultLocation;
    }

    public static function fs_get_wp_config_path()
    {
        $base = dirname(__FILE__);
        $path = false;
        if (@file_exists(dirname(dirname($base))."/wp-config.php"))
        {
            $path = dirname(dirname($base))."/";
        }
        else
            if (@file_exists(dirname(dirname(dirname($base)))."/wp-config.php"))
            {
                $path = dirname(dirname(dirname($base)))."/";
            }
            else
                $path = false;

        if ($path != false)
        {
            $path = str_replace("\\", "/", $path);
        }
        return $path;
    }

    private function clean_text($text) {
        $new_text = preg_replace("/[\_\,|\.|\'|\"|\\|\/]/", "", $text);
        $new_text = preg_replace("/[\n|\t]/"," ",$new_text);
        $new_text = preg_replace("/[\-\_]/"," ",$new_text);
        $new_text = preg_replace('/(\s\s+)/', ' ', trim($new_text));
        return $new_text;
    }

    public function getSourceNoTargetURLs(){
        $csvfile = $this->getCSVResultPath() . 'source-no-target.csv';
        return $this->getCSVContent($csvfile);
    }
    public function getTargetNoSourceURLs(){
        $csvfile = $this->getCSVResultPath() . 'target-no-source.csv';
        return $this->getCSVContent($csvfile);
    }

    public function fileToLoadFrom(){
        if (isset($_POST['load-saved']) || isset($_POST['only-save-301']) || isset($_POST['save-301-and-redirect'] ))
            if (file_exists($this->getCSVResultPath() . '301-map.csv'))
                $csvfile = '301-map.csv';
            else
                $csvfile = '301-redirects-auto.csv';
        else
            if (file_exists($this->getCSVResultPath() . '301-map.csv'))
                $csvfile = '301-map.csv';
            else
                $csvfile = '301-redirects-auto.csv';
        return $csvfile;
    }

    public function get301URLs(){
        $csvfile = $this->getCSVResultPath() . $this->fileToLoadFrom();
        return $this->getCSVContent($csvfile);
    }

    private function getCSVContent($csvfile){
        $websiteURLs = array();
        $first = true;
        if ( file_exists($csvfile) && ($handle = fopen($csvfile, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                if ($first){ $first=false; continue; }
                $websiteURLs[] = $data;
            }
            fclose($handle);
        }
        return $websiteURLs;
    }

    private function parseCurlResponse($body){
        if (!is_string($body)){
            return array('', '');
        }
        $parts = explode("\r\n\r\nHTTP/", $body);
        $parts = (count($parts) > 1 ? 'HTTP/' : '').array_pop($parts);
        list($headers, $body) = explode("\r\n\r\n", $parts, 2);
        // parse headers into array
        $h = array();
        $headerRows = explode("\n",$headers);
        foreach($headerRows as $part){
            if (trim($part)=='') continue;
            if (preg_match('/HTTP\/(1\.0|1\.1)\s+(\d+)\s+\w+/', $part, $matches)){
                if ((isset($h['Status']) && $h['Status']==200) || !isset($h['Status']))
                    $h['Status'] = trim($matches[2]);
            }else{
                $middle=explode(": ",$part,2);
                $h[trim($middle[0])] = trim($middle[1]);
            }
        }
        return array($h, $body);
    }
}