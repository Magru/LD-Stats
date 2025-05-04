<?php
/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 */
class LDBB_Analytics {

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @var LDBB_Analytics_Loader
     */
    protected $loader;

    /**
     * Define the core functionality of the plugin.
     */
    public function __construct() {
        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
        $this->define_api_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     */
    private function load_dependencies() {
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'includes/class-ldbb-analytics-loader.php';
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'includes/class-ldbb-analytics-i18n.php';
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'admin/class-ldbb-analytics-admin.php';
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'public/class-ldbb-analytics-public.php';
        require_once LDBB_ANALYTICS_PLUGIN_DIR . 'api/class-ldbb-analytics-api.php';

        $this->loader = new LDBB_Analytics_Loader();
    }

    /**
     * Define the locale for this plugin for internationalization.
     */
    private function set_locale() {
        $plugin_i18n = new LDBB_Analytics_i18n();
        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     */
    private function define_admin_hooks() {
        $plugin_admin = new LDBB_Analytics_Admin();
        
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
        $this->loader->add_action('admin_menu', $plugin_admin, 'add_plugin_admin_menu');
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     */
    private function define_public_hooks() {
        $plugin_public = new LDBB_Analytics_Public();
        
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
    }

    /**
     * Register all of the hooks related to the API functionality
     * of the plugin.
     */
    private function define_api_hooks() {
        $plugin_api = new LDBB_Analytics_API();
        
        $this->loader->add_action('rest_api_init', $plugin_api, 'register_api_routes');
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     */
    public function run() {
        $this->loader->run();
    }
}