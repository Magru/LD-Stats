<?php
/**
 * The API functionality of the plugin.
 */
class LDBB_Analytics_API {

    /**
     * Register the REST API routes.
     */
    public function register_api_routes() {
        // Register the REST API namespace
        $namespace = 'ldbb-analytics/v1';

        // Register routes for dashboard stats
        register_rest_route($namespace, '/dashboard/stats', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_dashboard_stats'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for user stats
        register_rest_route($namespace, '/users/stats', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_user_stats'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for course stats
        register_rest_route($namespace, '/courses/stats', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_course_stats'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for quiz stats
        register_rest_route($namespace, '/quizzes/stats', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_quiz_stats'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for forum stats
        register_rest_route($namespace, '/forums/stats', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_forum_stats'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for group stats
        register_rest_route($namespace, '/groups/stats', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_group_stats'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for user activities
        register_rest_route($namespace, '/activities/recent', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_recent_activities'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for user engagement
        register_rest_route($namespace, '/users/engagement', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_user_engagement'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for course enrollment by category
        register_rest_route($namespace, '/courses/enrollment-by-category', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_course_enrollment_by_category'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for course completion trend
        register_rest_route($namespace, '/courses/completion-trend', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_course_completion_trend'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for forum activity
        register_rest_route($namespace, '/forums/activity', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_forum_activity'),
            'permission_callback' => array($this, 'check_permissions')
        ));

        // Register routes for top courses
        register_rest_route($namespace, '/courses/top', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_top_courses'),
            'permission_callback' => array($this, 'check_permissions')
        ));
    }

    /**
     * Check permissions for the API endpoints.
     *
     * @return bool|WP_Error
     */
    public function check_permissions() {
        // Check if user is logged in
        if (!current_user_can('read')) {
            return new WP_Error('rest_forbidden', esc_html__('You must be logged in to access this data.', 'learndash-buddyboss-analytics'), array('status' => 401));
        }

        // Different capabilities may be required for different endpoints
        // For now, we'll keep it simple and require read access for all endpoints
        return true;
    }

    /**
     * Get dashboard statistics.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_dashboard_stats($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        
        // Get dashboard statistics from our API adapter
        $stats = $this->get_dashboard_statistics($date_range);
        
        return rest_ensure_response($stats);
    }

    /**
     * Get user statistics.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_user_stats($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        
        // Get user statistics from our API adapter
        $stats = $this->get_user_statistics($date_range);
        
        return rest_ensure_response($stats);
    }

    /**
     * Get course statistics.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_course_stats($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        $course_id = $request->get_param('course_id');
        
        // Get course statistics from our API adapter
        $stats = $this->get_course_statistics($course_id, $date_range);
        
        return rest_ensure_response($stats);
    }

    /**
     * Get quiz statistics.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_quiz_stats($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        $quiz_id = $request->get_param('quiz_id');
        $course_id = $request->get_param('course_id');
        
        // Get quiz statistics from our API adapter
        $stats = $this->get_quiz_statistics($quiz_id, $course_id, $date_range);
        
        return rest_ensure_response($stats);
    }

    /**
     * Get forum statistics.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_forum_stats($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        $forum_id = $request->get_param('forum_id');
        
        // Get forum statistics from our API adapter
        $stats = $this->get_forum_statistics($forum_id, $date_range);
        
        return rest_ensure_response($stats);
    }

    /**
     * Get group statistics.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_group_stats($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        $group_id = $request->get_param('group_id');
        
        // Get group statistics from our API adapter
        $stats = $this->get_group_statistics($group_id, $date_range);
        
        return rest_ensure_response($stats);
    }

    /**
     * Get recent activities.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_recent_activities($request) {
        // Get parameters
        $limit = $request->get_param('limit') ? intval($request->get_param('limit')) : 5;
        
        // Get recent activities from our API adapter
        $activities = $this->get_recent_user_activities($limit);
        
        return rest_ensure_response($activities);
    }

    /**
     * Get user engagement.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_user_engagement($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        
        // Get user engagement from our API adapter
        $engagement = $this->get_user_engagement_data($date_range);
        
        return rest_ensure_response($engagement);
    }

    /**
     * Get course enrollment by category.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_course_enrollment_by_category($request) {
        // Get course enrollment by category from our API adapter
        $enrollment = $this->get_course_enrollment_by_category_data();
        
        return rest_ensure_response($enrollment);
    }

    /**
     * Get course completion trend.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_course_completion_trend($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        
        // Get course completion trend from our API adapter
        $trend = $this->get_course_completion_trend_data($date_range);
        
        return rest_ensure_response($trend);
    }

    /**
     * Get forum activity.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_forum_activity($request) {
        // Get parameters
        $date_range = $request->get_param('date_range');
        
        // Get forum activity from our API adapter
        $activity = $this->get_forum_activity_data($date_range);
        
        return rest_ensure_response($activity);
    }

    /**
     * Get top courses.
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_REST_Response
     */
    public function get_top_courses($request) {
        // Get parameters
        $limit = $request->get_param('limit') ? intval($request->get_param('limit')) : 4;
        
        // Get top courses from our API adapter
        $courses = $this->get_top_courses_data($limit);
        
        return rest_ensure_response($courses);
    }

    /**
     * Helper methods to fetch data from LearnDash and BuddyBoss
     * These methods will be implemented with actual API calls or database queries
     * For now, they return placeholder data
     */
    
    private function get_dashboard_statistics($date_range) {
        // This is where we would fetch the actual data from LearnDash and BuddyBoss
        // For now, just return a placeholder structure
        return array(
            'activeUsers' => 1254,
            'courseCompletionRate' => 78.5,
            'totalEnrollments' => 2460,
            'forumPosts' => 852
        );
    }

    private function get_user_statistics($date_range) {
        // Placeholder for user statistics
        return array(
            'totalUsers' => 2500,
            'activeUsers' => 1254,
            'newUsers' => 120,
            'userActivity' => array(
                array('date' => 'Jan', 'count' => 250),
                array('date' => 'Feb', 'count' => 320),
                // More data points...
            )
        );
    }

    private function get_course_statistics($course_id, $date_range) {
        // Placeholder for course statistics
        return array(
            'id' => $course_id ? $course_id : 1,
            'title' => 'Course Title',
            'enrollments' => 560,
            'completionRate' => 78.5,
            'averageRating' => 4.7,
            // More course details...
        );
    }

    private function get_quiz_statistics($quiz_id, $course_id, $date_range) {
        // Placeholder for quiz statistics
        return array(
            'id' => $quiz_id ? $quiz_id : 1,
            'title' => 'Quiz Title',
            'courseId' => $course_id ? $course_id : 1,
            'averageScore' => 82.5,
            'passRate' => 85.0,
            'totalAttempts' => 420,
            // More quiz details...
        );
    }

    private function get_forum_statistics($forum_id, $date_range) {
        // Placeholder for forum statistics
        return array(
            'totalForums' => 15,
            'totalTopics' => 250,
            'totalPosts' => 850,
            'totalReplies' => 600,
            'activityByDate' => array(
                array('date' => 'Jan', 'posts' => 120),
                array('date' => 'Feb', 'posts' => 140),
                // More data points...
            )
        );
    }

    private function get_group_statistics($group_id, $date_range) {
        // Placeholder for group statistics
        return array(
            'totalGroups' => 25,
            'activeGroups' => 18,
            'groupsByActivity' => array(
                array('id' => 1, 'name' => 'Group 1', 'membersCount' => 45, 'activityLevel' => 85),
                array('id' => 2, 'name' => 'Group 2', 'membersCount' => 32, 'activityLevel' => 75),
                // More groups...
            )
        );
    }

    private function get_recent_user_activities($limit) {
        // Placeholder for recent user activities
        $activities = array(
            array(
                'userId' => 1,
                'userName' => 'User 1',
                'action' => 'Completed Course',
                'description' => 'Completed Web Development Masterclass',
                'date' => '2023-04-15T14:30:00Z'
            ),
            array(
                'userId' => 2,
                'userName' => 'User 2',
                'action' => 'Started Quiz',
                'description' => 'Started JavaScript Fundamentals Quiz',
                'date' => '2023-04-15T13:45:00Z'
            ),
            // More activities...
        );
        
        // Return limited number of activities
        return array_slice($activities, 0, $limit);
    }

    private function get_user_engagement_data($date_range) {
        // Placeholder for user engagement data
        return array(
            array('date' => 'Jan', 'courseViews' => 650, 'forumActivity' => 120),
            array('date' => 'Feb', 'courseViews' => 720, 'forumActivity' => 145),
            array('date' => 'Mar', 'courseViews' => 680, 'forumActivity' => 130),
            // More data points...
        );
    }

    private function get_course_enrollment_by_category_data() {
        // Placeholder for course enrollment by category data
        return array(
            array('category' => 'Web Development', 'count' => 450),
            array('category' => 'Data Science', 'count' => 320),
            array('category' => 'Design', 'count' => 280),
            array('category' => 'Marketing', 'count' => 210),
            // More categories...
        );
    }

    private function get_course_completion_trend_data($date_range) {
        // Placeholder for course completion trend data
        return array(
            array('date' => 'Jan', 'rate' => 65),
            array('date' => 'Feb', 'rate' => 70),
            array('date' => 'Mar', 'rate' => 75),
            array('date' => 'Apr', 'rate' => 78),
            // More data points...
        );
    }

    private function get_forum_activity_data($date_range) {
        // Placeholder for forum activity data
        return array(
            array('date' => 'Week 1', 'posts' => 120),
            array('date' => 'Week 2', 'posts' => 140),
            array('date' => 'Week 3', 'posts' => 130),
            array('date' => 'Week 4', 'posts' => 150),
            // More data points...
        );
    }

    private function get_top_courses_data($limit) {
        // Placeholder for top courses data
        $courses = array(
            array(
                'id' => 1,
                'title' => 'Web Development Masterclass',
                'enrollments' => 560,
                'completionRate' => 78.5,
                'averageRating' => 4.7
            ),
            array(
                'id' => 2,
                'title' => 'Data Science Fundamentals',
                'enrollments' => 480,
                'completionRate' => 72.0,
                'averageRating' => 4.5
            ),
            // More courses...
        );
        
        // Return limited number of courses
        return array_slice($courses, 0, $limit);
    }
}