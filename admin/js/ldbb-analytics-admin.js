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

        // Set up REST API client helper
        window.LDBB_ANALYTICS.apiRequest = apiRequest;

        // Wait for React bundle to load and initialize
        if (typeof window.LDBB_ANALYTICS_REACT !== 'undefined' && 
            typeof window.LDBB_ANALYTICS_REACT.mountReactApp === 'function') {
            
            var pageName = window.LDBB_ANALYTICS.page || 'dashboard';
            var containers = {
                'dashboard': 'ldbb-analytics-root',
                'course-stats': 'ldbb-analytics-course-stats-root',
                'forum-stats': 'ldbb-analytics-forum-stats-root',
                'group-stats': 'ldbb-analytics-group-stats-root',
                'quiz-stats': 'ldbb-analytics-quiz-stats-root',
                'user-stats': 'ldbb-analytics-user-stats-root',
                'settings': 'ldbb-analytics-settings-root',
            };
            
            if (containers[pageName]) {
                window.LDBB_ANALYTICS_REACT.mountReactApp(containers[pageName], pageName);
            }
        } else {
            console.log('LearnDash BuddyBoss Analytics: Waiting for React bundle to load...');
        }
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

})(jQuery);