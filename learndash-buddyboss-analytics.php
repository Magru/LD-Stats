<?php
/**
 * Plugin Name: LearnDash BuddyBoss Analytics
 * Plugin URI: https://example.com/plugins/learndash-buddyboss-analytics
 * Description: Comprehensive statistics dashboard for LearnDash LMS and BuddyBoss platform
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * Text Domain: learndash-buddyboss-analytics
 * Domain Path: /languages
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('LDBB_ANALYTICS_VERSION', '1.0.0');
define('LDBB_ANALYTICS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('LDBB_ANALYTICS_PLUGIN_URL', plugin_dir_url(__FILE__));
define('LDBB_ANALYTICS_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Include the core plugin class
require_once LDBB_ANALYTICS_PLUGIN_DIR . 'includes/class-ldbb-analytics.php';

/**
 * Begins execution of the plugin.
 */
function run_ldbb_analytics() {
    $plugin = new LDBB_Analytics();
    $plugin->run();
}

// Run the plugin
run_ldbb_analytics();