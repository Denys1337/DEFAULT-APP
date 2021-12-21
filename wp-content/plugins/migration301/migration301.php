<?php
/*
Plugin Name: Migration 301 redirects
Plugin URI:
Description: Creates a page in the admin panel under Settings > Migration 301 redirects
Version: 1.0
Author: Pavel Zhdonchik
Author URI:
License: GPL v2 or higher
License URI: License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/
add_action( 'admin_menu', 'migration301_menu' );
function migration301_menu() {
    add_management_page( __( "Migration 301 redirects", 'migration301' ), __( "Migration 301 redirects", 'migration301' ), apply_filters( 'redirection_role', 'administrator' ), 'migration301', 'get_migration301_page_content' );
}

function migration301_hook_enqueue_admin_scripts(){
    wp_enqueue_style( 'select2css', plugin_dir_url( __FILE__ ).'select2.css' );
    wp_enqueue_script('select2.min.js', plugin_dir_url( __FILE__ ).'select2.min.js', array('jquery'));
}
add_action('admin_enqueue_scripts', 'migration301_hook_enqueue_admin_scripts');
add_action('admin_init','migration301_hook_admin_init');

function migration301_hook_admin_init(){
    require_once dirname(__FILE__) . '/URLParser.php';

    if (isset($_GET['delete']) && $_GET['delete']){
        unlink(URLParser::getCSVResultPath() . $_GET['delete']);
        wp_redirect(preg_replace('/&delete=.*/', '', curPageURL()));
        exit;
    }
}

function get_migration301_page_content() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
    $redirectionPluginInstalled = is_plugin_active('redirection/redirection.php');
    require_once dirname(__FILE__) . '/URLParser.php';
    $parser = new URLParser();
    $parser->run();
?>

<?php if (!$redirectionPluginInstalled):?>
    <p class="info-danger" style="color:#FCA4A4;">Install WP Redirection plugin to use all capabilities</p>
<?php endif;?>

<div>
    <h3>Get website URLs</h3>
    <form id = "myform1" action = "" method = "post">
        <input type="text" name="collect-site-urls" value="<?php echo get_site_url()?>"/>
        <input type="submit" class="button-primary1" value="Get all Website URLs" style="background:#5f9fa3;"/>
        <br>
        <label><input type="checkbox" name="parse-as-mobile" value="1"> - use mobile user-agent for parsing</label>
        <p>Get all websites urls in csv and compare them to find matches</p>
    </form>
</div>


<?php

$current_url = curPageURL();
// generated plugin files
$currentWebsiteHost = parse_url(get_site_url());
$currentWebsiteHost = $currentWebsiteHost['host'];
$dir = URLParser::getCSVResultPath();
$files = scandir($dir);
$csvfiles = array();
foreach ($files as $oneFile)
    if (preg_match('/\.csv/', $oneFile) || preg_match('/part\.txt/', $oneFile))
        $csvfiles[] = $oneFile;
if (count($csvfiles)>0){ ?>
<form action = "" method = "post">
<h3>Generated files with URLs:</h3>
        <table>
            <tr><th>Old Website</th><th>New Website</th><th>&nbsp;</th></tr>
            <tr>
                <td width="350" style="border: 1px solid #000000;vertical-align: top;">
                    <ol>
                    <?php
                    foreach ($csvfiles as $oneFile){
                        if (preg_match('/urls\.csv/', $oneFile)){
                            //$disabled = (strpos($oneFile, '-not-parsed')!==false)?' disabled ':'';
                            echo '<li><input type="radio" name="old_website" value="'.$dir.$oneFile.'" >
                            &nbsp;<a href="'.get_site_url() .'/'.URLParser::$csvResultLocation.$oneFile.'">'.$oneFile.'</a>
                            &nbsp;<a style="color:red;" href="'.$current_url.'&delete='.$oneFile.'">delete</a></li>';
                        }
                    }
                    ?>
                    </ol>
                </td>
                <td width="350" style="border: 1px solid #000000;vertical-align: top;">
                    <ol>
                        <?php
                        foreach ($csvfiles as $oneFile){
                            if (preg_match('/urls\.csv/', $oneFile)){
                                $checked = (strpos($oneFile, $currentWebsiteHost)!==false)?' checked ':'';
                                echo '<li><input type="radio" name="new_website" value="'.$dir.$oneFile.'" '.$checked.'>
                                &nbsp;<a href="'.get_site_url() .'/'.URLParser::$csvResultLocation.$oneFile.'">'.$oneFile.'</a>
                                &nbsp;<a style="color:red;" href="'.$current_url.'&delete='.$oneFile.'">delete</a></li>';
                            }
                        }
                        ?>
                    </ol>
                </td>
                <td width="350" style="border: 1px solid #000000;vertical-align: top;">
                    <ol>
                        <?php
                        foreach ($csvfiles as $oneFile){
                            if (!preg_match('/urls\.csv/', $oneFile) || preg_match('/part\.txt/', $oneFile)){
                                echo '<li>
                                        <a href="'.get_site_url() .'/'.URLParser::$csvResultLocation.$oneFile.'">'.$oneFile.'
                                        &nbsp;<a style="color:red;" href="'.$current_url.'&delete='.$oneFile.'">delete</a></li>';
                            }
                        }
                        ?>
                    </ol>
                </td>
            </tr>
        </table>
    <input type="submit" class="button-primary2" value="Compare" style="background:#5f9fa3;" >
</form>
<?php
}
?>





<?php
    // compare URL table
    $loadedFromFile = $parser->fileToLoadFrom();
    $url301Matches = $parser->get301URLs();
    $sourceNoTargetURLs = $parser->getSourceNoTargetURLs();
    $targetNoSourceURLs = $parser->getTargetNoSourceURLs();
    $linkCounter = 0;
    $first = true;
    $matchedURLs = array();

    $sourceHost = '';
    $targetHost = '';
    if ( count($url301Matches)>0 ){
        $sourcepath = parse_url($url301Matches[0][0]);
        if (isset($sourcepath['scheme']))
            $sourceHost = $sourcepath['scheme'] . '://' . $sourcepath['host'] . '/';
        $sourcepath = parse_url($url301Matches[0][1]);
        if (isset($sourcepath['scheme']))
            $targetHost = $sourcepath['scheme'] . '://' . $sourcepath['host'] . '/';
    }elseif ( count($sourceNoTargetURLs)>0 ){
        $sourcepath = parse_url($sourceNoTargetURLs[0][0]);
        if (isset($sourcepath['scheme']))
            $sourceHost = $sourcepath['scheme'] . '://' . $sourcepath['host'] . '/';
        $sourcepath = parse_url($sourceNoTargetURLs[0][1]);
        if (isset($sourcepath['scheme']))
            $targetHost = $sourcepath['scheme'] . '://' . $sourcepath['host'] . '/';
    }

    // to not display $sourceNoTargetURL - it already has saved redirection url
    foreach ($url301Matches as $oneMatch)
        $matchedURLs[] = $oneMatch[0];
    $linkicon = plugin_dir_url( __FILE__ ) . 'linkicon.png';
?>

<?php if (count($url301Matches)>0 || count($sourceNoTargetURLs)>0):?>

<h3>URL List ( loaded from <?php echo $loadedFromFile?> )
    <?php if ($loadedFromFile!='301-map.csv' && file_exists($parser->getCSVResultPath() . '301-map.csv')):?>
        <form action = "" method = "post"><input type="submit" value="Load from recently saved comparison (301-map.csv)" style="background:#5f9fa3;" name="load-saved"></form>
    <?php endif;?>
</h3>
<ul style="width: 370px;">
    <li class="has-pair">&nbsp;- the page from source website found on target website</li>
    <li class="no-pair">&nbsp;- the page from source website NOT found on target website</li>
</ul>
<form id = "myform3" action = "" method = "post">
<table style="width: 85%;">
    <tr>
        <th style="width:280px">Source URL</th>
        <th style="width:20px"></th>
        <th style="width:280px">Target URL</th>
        <th style="width:20px"></th>
        <th>Change</th>
    </tr>
    <tr>
        <th><input style="width:270px;" type="text" readonly value="<?php echo $sourceHost?>" name="sourceHost"/></th>
        <th style="width:20px"></th>
        <th><input style="width:270px;" type="text" readonly value="<?php echo $targetHost?>" name="targetHost"/></th>
        <th style="width:20px"></th>
        <th></th>
    </tr>


    <?php foreach ($sourceNoTargetURLs as $oneMatch):
        if (in_array($oneMatch[0], $matchedURLs)) continue;
        if (str_replace($sourceHost, '', $oneMatch[0])=='') continue;
        ?>
        <tr class="no-pair">
            <td><input type="text" name="source[<?php echo $linkCounter?>]" value="<?php echo str_replace($sourceHost, '', $oneMatch[0])?>" style="width: 100%;"/></td>
            <td><a href="<?php echo $oneMatch[0]?>" target="_blank"><img src="<?php echo $linkicon?>"></a></td>
            <td><input type="text" class="target-url" name="target[<?php echo $linkCounter?>]" value="" style="width: 100%;"/></td>
            <td></td>
            <td style="align: center;">
                <input type="button" class="map-url" value="Change Target URL" <?php if ($first):?> style="display:none;" <?php endif;?>>
                <div class="select-container">
                    <?php if ($first):$first=false;?>
                        <select id="target-select" class="select2" name="target-select">
                            <?php foreach ($targetNoSourceURLs as $oneMatch):
                                $v = str_replace($targetHost, '', $oneMatch[0]);
                                $t = $v . ($oneMatch[3]>''?"| {$oneMatch[3]}":'');
                                ?>
                                <option value="<?php echo $v?>"><?php echo $t?></option>
                                <?php ;endforeach;?>
                        </select>
                    <?php endif;?>
                </div>
            </td>
        </tr>
    <?php $linkCounter++;endforeach;?>


    <?php foreach ($url301Matches as $oneMatch):
        $matchedURLs[] = $oneMatch[0];
        ?>
        <tr class="has-pair">
            <td><input type="text" name="source[<?php echo $linkCounter?>]" value="<?php echo str_replace($sourceHost, '', $oneMatch[0])?>" style="width: 100%;"/></td>
            <td><a href="<?php echo $oneMatch[0]?>" target="_blank"><img src="<?php echo $linkicon?>"></a></td>
            <td><input type="text" class="target-url" name="target[<?php echo $linkCounter?>]" value="<?php echo str_replace($targetHost, '', $oneMatch[1])?>" style="width: 100%;"/></td>
            <td><a href="<?php echo $oneMatch[1]?>" target="_blank"><img src="<?php echo $linkicon?>"></a></td>
            <td style="align: center;">
                <input type="button" class="map-url" value="Change Target URL" <?php if ($first):?> style="display:none;" <?php endif;?>>
                <div class="select-container">
                    <?php if ($first):$first=false;?>
                        <select id="target-select" class="select2" name="target-select" >
                            <?php foreach ($targetNoSourceURLs as $oneMatch):
                                $v = str_replace($targetHost, '', $oneMatch[0]);
                                $t = $v . ($oneMatch[3]>''?"| {$oneMatch[3]}":'');
                                ?>
                                <option value="<?php echo $v?>"><?php echo $t?></option>
                            <?php ;endforeach;?>
                        </select>
                    <?php endif;?>
                </div>
            </td>
        </tr>
    <?php $linkCounter++;endforeach;?>

</table>

        <div style="position:fixed;top:400px;right:0px;">
        <input type="submit" value="Save Changes" name="only-save-301" style="background:#5f9fa3;"/>
            <br/>
    <?php if ($redirectionPluginInstalled):?>
        <input type="submit" value="Save & add to 'Redirection'" name="save-301-and-redirect" style="width:200px;background:#5f9fa3;"/>
            <br/>
    <?php endif;?>
        <input type="submit" value="Save & generate .htaccess" name="save-301-and-htaccess" style="width:200px;background:#5f9fa3;"/>
        </div>
</form>

        <style>
            .has-pair{
                background: #77bc69;
            }
            .no-pair{
                background: #ff8874;
            }
        </style>
        <script type="text/javascript">
            var linkicon = '<?php echo $linkicon?>';
            var targetHost = '<?php echo $targetHost?>';
            jQuery(document).ready(function($) {
                $('.select2').select2({
                    width : '100%'
                });

                $('.map-url').click(function(){
                    var _parent = $('.map-url:hidden').closest('td');
                    $('.map-url:hidden').show();
                    $(this).hide();
                    _parent.find('select.select2').select2("destroy");
                    var _select = _parent.find('select.select2').detach();
                    $(this).closest('td').find("div.select-container").append(_select);
                    $('.select2').select2({
                        width : '100%'
                    });
                });

                $('#target-select').change(function(){
                    $(this).closest('tr').find('td:eq(2) input').val($(this).val());
                    $(this).closest('tr').find('td:eq(3)').html('<a href="'+targetHost+$(this).val()+'" target="_blank"><img src="'+linkicon+'"></a>');
                });

                $('input.target-url').change(function(){
                    var _parentTr = $(this).closest('tr');
                    if ($(this).val()>'' && !_parentTr.hasClass('has-pair')){
                        _parentTr.addClass('has-pair');
                        _parentTr.removeClass('no-pair');
                        $(this).closest('tr').find('td:eq(3)').html('<a href="'+targetHost+$(this).val()+'" target="_blank"><img src="'+linkicon+'"></a>');
                    }else if ( $(this).val()=='' && !_parentTr.hasClass('no-pair') ){
                        _parentTr.addClass('no-pair');
                        _parentTr.removeClass('has-pair');
                        $(this).closest('tr').find('td:eq(3)').html('');
                    }
                });

                $('[name="save-301-and-redirect"]').click(function(e){
                    if ( !confirm('This action will remove all previously added redirects with "Redirection" plugin') ){
                        e.preventDefault();
                        return false;
                    }
                })
            });
        </script>

<?php endif;


} // end get_migration301_page_content()

function curPageURL() {
    $pageURL = 'http';
    if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } else {
        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $pageURL;
}