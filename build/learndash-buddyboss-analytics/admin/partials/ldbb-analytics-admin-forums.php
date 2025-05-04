<?php
/**
 * Admin forum statistics view for LearnDash BuddyBoss Analytics
 *
 * This file provides the markup for the forum statistics page of the plugin
 */
?>

<div class="wrap">
    <h1><?php echo esc_html__('Forum Statistics', 'learndash-buddyboss-analytics'); ?></h1>
    
    <div class="ldbb-analytics-app-container">
        <!-- React App will be mounted here -->
        <div id="ldbb-analytics-forum-stats-root"></div>
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
                page: 'forum-stats'
            };
        });
    </script>
</div>