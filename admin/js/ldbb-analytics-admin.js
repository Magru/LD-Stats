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
                'courses': 'ldbb-analytics-course-stats-root',
                'forums': 'ldbb-analytics-forum-stats-root',
                'groups': 'ldbb-analytics-group-stats-root',
                'quizzes': 'ldbb-analytics-quiz-stats-root',
                'users': 'ldbb-analytics-user-stats-root',
                'settings': 'ldbb-analytics-settings-root',
            };
            
            if (containers[pageName]) {
                window.LDBB_ANALYTICS_REACT.mountReactApp(containers[pageName], pageName);
                
                // If we're on the settings page, hide the fallback form
                if (pageName === 'settings') {
                    $('.ldbb-analytics-settings-fallback').hide();
                }
                
                // Signal that React is loaded
                window.LDBB_ANALYTICS.reactLoaded = true;
            }
        } else {
            // Try to load React components
            var scriptSrc = window.LDBB_ANALYTICS.pluginUrl + 'dist/wordpress-bundle.js';
            
            // Load the main bundle
            var script = document.createElement('script');
            script.src = scriptSrc;
            script.onload = function() {
                console.log('LearnDash BuddyBoss Analytics: React bundle loaded.');
                
                // Wait a moment for the script to initialize
                setTimeout(function() {
                    initializeReactMounts();
                }, 100);
            };
            script.onerror = function(err) {
                console.error('LearnDash BuddyBoss Analytics: Failed to load React bundle.', err);
                $('.ldbb-analytics-loading').hide();
                
                // Display error message 
                $('.ldbb-analytics-app-container > div[id^="ldbb-analytics"]').each(function() {
                    var $this = $(this);
                    $this.html(
                        '<div class="ldbb-analytics-error">' +
                        '<p>Failed to load analytics dashboard. Please check console for errors.</p>' +
                        '<p>Error loading: ' + scriptSrc + '</p>' +
                        '</div>'
                    );
                });
            };
            document.head.appendChild(script);
            
            console.log('LearnDash BuddyBoss Analytics: Attempting to load React bundle...');
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