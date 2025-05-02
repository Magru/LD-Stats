<?php
/**
 * The admin-specific functionality of the plugin.
 */
class LDBB_Analytics_Admin {

    /**
     * Initialize the class and set its properties.
     */
    public function __construct() {
        // Register settings
        add_action('admin_init', array($this, 'register_settings'));
    }

    /**
     * Register the stylesheets for the admin area.
     */
    public function enqueue_styles() {
        wp_enqueue_style(
            'ldbb-analytics-admin',
            LDBB_ANALYTICS_PLUGIN_URL . 'admin/css/ldbb-analytics-admin.css',
            array(),
            LDBB_ANALYTICS_VERSION,
            'all'
        );
    }

    /**
     * Register the JavaScript for the admin area.
     */
    public function enqueue_scripts() {
        // Enqueue the main admin script
        wp_enqueue_script(
            'ldbb-analytics-admin',
            LDBB_ANALYTICS_PLUGIN_URL . 'admin/js/ldbb-analytics-admin.js',
            array('jquery'),
            LDBB_ANALYTICS_VERSION,
            false
        );
        
        // Enqueue React bundle for dashboard
        wp_enqueue_script(
            'ldbb-analytics-react-bundle',
            LDBB_ANALYTICS_PLUGIN_URL . 'dist/main.bundle.js',
            array('jquery', 'ldbb-analytics-admin'),
            LDBB_ANALYTICS_VERSION,
            true
        );
        
        // Enqueue React vendors
        wp_enqueue_script(
            'ldbb-analytics-react-vendors',
            LDBB_ANALYTICS_PLUGIN_URL . 'dist/vendors.bundle.js',
            array('jquery', 'ldbb-analytics-admin'),
            LDBB_ANALYTICS_VERSION,
            true
        );
        
        // Enqueue React styles
        wp_enqueue_style(
            'ldbb-analytics-react-styles',
            LDBB_ANALYTICS_PLUGIN_URL . 'dist/main.css',
            array(),
            LDBB_ANALYTICS_VERSION,
            'all'
        );
    }

    /**
     * Add menu items to the admin dashboard.
     */
    public function add_plugin_admin_menu() {
        // Main menu item
        add_menu_page(
            __('LearnDash BuddyBoss Analytics', 'learndash-buddyboss-analytics'),
            __('LMS Analytics', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics',
            array($this, 'display_plugin_admin_dashboard'),
            'dashicons-chart-area',
            30
        );

        // Submenu items
        add_submenu_page(
            'ldbb-analytics',
            __('Dashboard', 'learndash-buddyboss-analytics'),
            __('Dashboard', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics',
            array($this, 'display_plugin_admin_dashboard')
        );

        add_submenu_page(
            'ldbb-analytics',
            __('Course Statistics', 'learndash-buddyboss-analytics'),
            __('Course Statistics', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics-courses',
            array($this, 'display_plugin_admin_courses')
        );

        add_submenu_page(
            'ldbb-analytics',
            __('User Statistics', 'learndash-buddyboss-analytics'),
            __('User Statistics', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics-users',
            array($this, 'display_plugin_admin_users')
        );

        add_submenu_page(
            'ldbb-analytics',
            __('Forum Statistics', 'learndash-buddyboss-analytics'),
            __('Forum Statistics', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics-forums',
            array($this, 'display_plugin_admin_forums')
        );

        add_submenu_page(
            'ldbb-analytics',
            __('Group Statistics', 'learndash-buddyboss-analytics'),
            __('Group Statistics', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics-groups',
            array($this, 'display_plugin_admin_groups')
        );

        add_submenu_page(
            'ldbb-analytics',
            __('Quiz Statistics', 'learndash-buddyboss-analytics'),
            __('Quiz Statistics', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics-quizzes',
            array($this, 'display_plugin_admin_quizzes')
        );

        add_submenu_page(
            'ldbb-analytics',
            __('Settings', 'learndash-buddyboss-analytics'),
            __('Settings', 'learndash-buddyboss-analytics'),
            'manage_options',
            'ldbb-analytics-settings',
            array($this, 'display_plugin_admin_settings')
        );
    }

    /**
     * Render the dashboard page.
     */
    public function display_plugin_admin_dashboard() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-dashboard.php';
    }

    /**
     * Render the courses statistics page.
     */
    public function display_plugin_admin_courses() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-courses.php';
    }

    /**
     * Render the user statistics page.
     */
    public function display_plugin_admin_users() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-users.php';
    }

    /**
     * Render the forum statistics page.
     */
    public function display_plugin_admin_forums() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-forums.php';
    }

    /**
     * Render the group statistics page.
     */
    public function display_plugin_admin_groups() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-groups.php';
    }

    /**
     * Render the quiz statistics page.
     */
    public function display_plugin_admin_quizzes() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-quizzes.php';
    }

    /**
     * Render the settings page.
     */
    public function display_plugin_admin_settings() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/partials/ldbb-analytics-admin-settings.php';
    }
    
    /**
     * Register plugin settings
     */
    public function register_settings() {
        register_setting(
            'ldbb_analytics_settings_group', // Option group
            'ldbb_analytics_settings', // Option name
            array($this, 'sanitize_settings') // Sanitize callback
        );
    }
    
    /**
     * Sanitize settings before saving to database
     */
    public function sanitize_settings($input) {
        $sanitized_input = array();
        
        // Date Range Default
        if (isset($input['date_range_default'])) {
            $sanitized_input['date_range_default'] = sanitize_text_field($input['date_range_default']);
        }
        
        // RTL Support
        $sanitized_input['enable_rtl_support'] = isset($input['enable_rtl_support']) ? true : false;
        
        // Notifications
        $sanitized_input['enable_notifications'] = isset($input['enable_notifications']) ? true : false;
        
        // Refresh Interval (numeric)
        if (isset($input['refresh_interval'])) {
            $sanitized_input['refresh_interval'] = absint($input['refresh_interval']);
            if ($sanitized_input['refresh_interval'] < 1) {
                $sanitized_input['refresh_interval'] = 1;
            }
            if ($sanitized_input['refresh_interval'] > 60) {
                $sanitized_input['refresh_interval'] = 60;
            }
        }
        
        // Charts Theme
        if (isset($input['charts_theme'])) {
            $sanitized_input['charts_theme'] = sanitize_text_field($input['charts_theme']);
        }
        
        // Default Page
        if (isset($input['default_page'])) {
            $sanitized_input['default_page'] = sanitize_text_field($input['default_page']);
        }
        
        return $sanitized_input;
    }
}