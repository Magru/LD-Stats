<?php
/**
 * Admin settings view for LearnDash BuddyBoss Analytics
 *
 * This file provides the markup for the settings page of the plugin
 */

// Get existing settings
$dashboard_settings = get_option('ldbb_analytics_settings', array(
    'date_range_default' => 'month',
    'enable_rtl_support' => is_rtl(),
    'enable_notifications' => true,
    'refresh_interval' => 5,
    'charts_theme' => 'light',
    'default_page' => 'dashboard'
));
?>

<div class="wrap">
    <h1><?php echo esc_html__('Analytics Settings', 'learndash-buddyboss-analytics'); ?></h1>
    
    <!-- Static fallback settings form -->
    <div class="ldbb-analytics-settings-form">
        <div class="ldbb-analytics-app-container">
            <!-- React App will be mounted here -->
            <div id="ldbb-analytics-settings-root">
                <!-- Fallback content in case React fails to load -->
                <div class="ldbb-analytics-settings-fallback">
                    <form method="post" action="options.php" class="ldbb-analytics-native-form">
                        <?php settings_fields('ldbb_analytics_settings_group'); ?>
                        
                        <table class="form-table" role="presentation">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <label for="ldbb_date_range_default"><?php echo esc_html__('Default Date Range', 'learndash-buddyboss-analytics'); ?></label>
                                    </th>
                                    <td>
                                        <select name="ldbb_analytics_settings[date_range_default]" id="ldbb_date_range_default">
                                            <option value="week" <?php selected($dashboard_settings['date_range_default'], 'week'); ?>><?php echo esc_html__('Last Week', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="month" <?php selected($dashboard_settings['date_range_default'], 'month'); ?>><?php echo esc_html__('Last Month', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="quarter" <?php selected($dashboard_settings['date_range_default'], 'quarter'); ?>><?php echo esc_html__('Last Quarter', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="year" <?php selected($dashboard_settings['date_range_default'], 'year'); ?>><?php echo esc_html__('Last Year', 'learndash-buddyboss-analytics'); ?></option>
                                        </select>
                                        <p class="description"><?php echo esc_html__('Select the default time period for analytics data', 'learndash-buddyboss-analytics'); ?></p>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">
                                        <?php echo esc_html__('RTL Support', 'learndash-buddyboss-analytics'); ?>
                                    </th>
                                    <td>
                                        <fieldset>
                                            <legend class="screen-reader-text">
                                                <span><?php echo esc_html__('RTL Support', 'learndash-buddyboss-analytics'); ?></span>
                                            </legend>
                                            <label for="ldbb_enable_rtl_support">
                                                <input name="ldbb_analytics_settings[enable_rtl_support]" type="checkbox" id="ldbb_enable_rtl_support" value="1" <?php checked($dashboard_settings['enable_rtl_support'], true); ?>>
                                                <?php echo esc_html__('Enable right-to-left layout support for Hebrew and other RTL languages', 'learndash-buddyboss-analytics'); ?>
                                            </label>
                                        </fieldset>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">
                                        <?php echo esc_html__('Enable Notifications', 'learndash-buddyboss-analytics'); ?>
                                    </th>
                                    <td>
                                        <fieldset>
                                            <legend class="screen-reader-text">
                                                <span><?php echo esc_html__('Enable Notifications', 'learndash-buddyboss-analytics'); ?></span>
                                            </legend>
                                            <label for="ldbb_enable_notifications">
                                                <input name="ldbb_analytics_settings[enable_notifications]" type="checkbox" id="ldbb_enable_notifications" value="1" <?php checked($dashboard_settings['enable_notifications'], true); ?>>
                                                <?php echo esc_html__('Show notifications for important analytics events', 'learndash-buddyboss-analytics'); ?>
                                            </label>
                                        </fieldset>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">
                                        <label for="ldbb_refresh_interval"><?php echo esc_html__('Data Refresh Interval (minutes)', 'learndash-buddyboss-analytics'); ?></label>
                                    </th>
                                    <td>
                                        <input name="ldbb_analytics_settings[refresh_interval]" type="number" id="ldbb_refresh_interval" value="<?php echo esc_attr($dashboard_settings['refresh_interval']); ?>" class="small-text" min="1" max="60">
                                        <p class="description"><?php echo esc_html__('How often the analytics data should refresh (in minutes)', 'learndash-buddyboss-analytics'); ?></p>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">
                                        <label for="ldbb_charts_theme"><?php echo esc_html__('Charts Theme', 'learndash-buddyboss-analytics'); ?></label>
                                    </th>
                                    <td>
                                        <select name="ldbb_analytics_settings[charts_theme]" id="ldbb_charts_theme">
                                            <option value="light" <?php selected($dashboard_settings['charts_theme'], 'light'); ?>><?php echo esc_html__('Light', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="dark" <?php selected($dashboard_settings['charts_theme'], 'dark'); ?>><?php echo esc_html__('Dark', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="auto" <?php selected($dashboard_settings['charts_theme'], 'auto'); ?>><?php echo esc_html__('Auto (follow system)', 'learndash-buddyboss-analytics'); ?></option>
                                        </select>
                                        <p class="description"><?php echo esc_html__('Select the theme for charts and graphs', 'learndash-buddyboss-analytics'); ?></p>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">
                                        <label for="ldbb_default_page"><?php echo esc_html__('Default Landing Page', 'learndash-buddyboss-analytics'); ?></label>
                                    </th>
                                    <td>
                                        <select name="ldbb_analytics_settings[default_page]" id="ldbb_default_page">
                                            <option value="dashboard" <?php selected($dashboard_settings['default_page'], 'dashboard'); ?>><?php echo esc_html__('Dashboard', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="courses" <?php selected($dashboard_settings['default_page'], 'courses'); ?>><?php echo esc_html__('Course Statistics', 'learndash-buddyboss-analytics'); ?></option>
                                            <option value="users" <?php selected($dashboard_settings['default_page'], 'users'); ?>><?php echo esc_html__('User Statistics', 'learndash-buddyboss-analytics'); ?></option>
                                        </select>
                                        <p class="description"><?php echo esc_html__('Which page to show when opening LMS Analytics', 'learndash-buddyboss-analytics'); ?></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <p class="submit">
                            <input type="submit" name="submit" id="submit" class="button button-primary" value="<?php echo esc_attr__('Save Changes', 'learndash-buddyboss-analytics'); ?>">
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Initialize the analytics app with WP data
        document.addEventListener('DOMContentLoaded', function() {
            window.LDBB_ANALYTICS = {
                restNonce: '<?php echo wp_create_nonce('wp_rest'); ?>',
                restRoot: '<?php echo esc_url_raw(rest_url()); ?>',
                currentUser: <?php echo json_encode(wp_get_current_user()); ?>,
                pluginUrl: '<?php echo LDBB_ANALYTICS_PLUGIN_URL; ?>',
                locale: '<?php echo get_locale(); ?>',
                isRtl: <?php echo is_rtl() ? 'true' : 'false'; ?>,
                page: 'settings',
                settings: <?php echo json_encode($dashboard_settings); ?>
            };
            
            // Hide the fallback form when React loads successfully
            if (typeof window.LDBB_ANALYTICS_REACT !== 'undefined') {
                document.querySelector('.ldbb-analytics-settings-fallback').style.display = 'none';
            }
        });
    </script>
</div>