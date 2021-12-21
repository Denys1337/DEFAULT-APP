<?php

define('PATH', (is_ssl() ? 'https://' : 'http://') . $_SERVER['SERVER_NAME']);
define('THEME_PATH', PATH . '/wp-content/themes/'.get_template());
define('THEME_PATH_IMAGES', THEME_PATH . '/images');
define('THEME_PATH_JS', THEME_PATH . '/js');
define('THEME_PATH_CSS', THEME_PATH . '/css');
define('DEV_SITE', (strpos(PATH, 'devbucket.me') !== false || strpos(PATH, '.loc') !== false));

define('TEAM_POSTTYPE', 'wld_team');
define('TEAM_PAGE', 55);
define('SEARCH_PROPERTY_PAGE', 36);
define('CAREERS_POSTTYPE', 'wld_careers');
define('PROPERTY_POSTTYPE', 'wld_property');
define('LIST_SUBSCRIBER', 'wld_list_subscriber');
define('PROPERTY_FORM_COOKIE', 'property_form_sent');


if (DEV_SITE){
    error_reporting(E_ALL);
    ini_set('display_errors', true);
}

class Nemanagement {

    public function __construct(){
        $this->addFilters();
    }

    private function addFilters(){
        add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );
        if(!current_user_can('editor') && !current_user_can('administrator')){
            add_filter('show_admin_bar', '__return_false');
        }
    }

}


$nemanagement = new Nemanagement();


if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'id'          => 'blog_sidebar',
        'name'        => 'Blog Sidebar',
        'description' => __('This is a sidebar for blog widgets'),
        'before_widget' => '<div class="sidebar-block">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2>',
        'after_title'   => '</h2>'
    ));
}
