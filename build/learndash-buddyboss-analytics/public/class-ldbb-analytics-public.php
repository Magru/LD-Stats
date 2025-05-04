<?php
/**
 * The public-facing functionality of the plugin.
 */
class LDBB_Analytics_Public {

    /**
     * Register the stylesheets for the public-facing side of the site.
     */
    public function enqueue_styles() {
        wp_enqueue_style(
            'ldbb-analytics-public',
            LDBB_ANALYTICS_PLUGIN_URL . 'public/css/ldbb-analytics-public.css',
            array(),
            LDBB_ANALYTICS_VERSION,
            'all'
        );
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            'ldbb-analytics-public',
            LDBB_ANALYTICS_PLUGIN_URL . 'public/js/ldbb-analytics-public.js',
            array('jquery'),
            LDBB_ANALYTICS_VERSION,
            false
        );
    }
}