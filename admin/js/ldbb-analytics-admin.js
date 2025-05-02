/**
 * Admin scripts for LearnDash BuddyBoss Analytics
 */
(function($) {
    'use strict';

    // Wait for DOM to be ready
    $(function() {
        // Initialize the React application mount points
        initializeReactMounts();
    });

    /**
     * Initialize all React mount points in the admin area
     */
    function initializeReactMounts() {
        // Check if we have the LDBB_ANALYTICS global object
        if (typeof window.LDBB_ANALYTICS === 'undefined') {
            console.error('LDBB_ANALYTICS global object not found');
            return;
        }

        // Add a loading indicator to all React mount points
        $('.ldbb-analytics-app-container > div[id^="ldbb-analytics"]').each(function() {
            var $this = $(this);
            $this.html(
                '<div class="ldbb-analytics-loading">' +
                '<span></span><span></span><span></span>' +
                '<p>Loading analytics dashboard...</p>' +
                '</div>'
            );
        });

        // In a real implementation, we would load the bundled React app here
        // For WordPress integration, we need to use the WordPress admin hooks
        console.log('LearnDash BuddyBoss Analytics: Ready to initialize React app with config:', window.LDBB_ANALYTICS);
    }

    /**
     * Helper function to make REST API requests
     */
    function apiRequest(endpoint, method, data) {
        return $.ajax({
            url: window.LDBB_ANALYTICS.restRoot + 'ldbb-analytics/v1/' + endpoint,
            method: method || 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-WP-Nonce', window.LDBB_ANALYTICS.restNonce);
            },
            data: data || {}
        });
    }

    // Expose the API helper to the global scope for React to use
    window.LDBB_ANALYTICS.apiRequest = apiRequest;

})(jQuery);