// Define translation types
export type TranslationKey = 
  | 'dashboard'
  | 'courses'
  | 'lessons'
  | 'quizzes'
  | 'students'
  | 'forums'
  | 'groups'
  | 'settings'
  | 'activeUsers'
  | 'courseCompletionRate'
  | 'totalForumPosts'
  | 'courseEnrollments'
  | 'userEngagement'
  | 'courseEnrollmentByCategory'
  | 'courseCompletionTrend'
  | 'forumActivity'
  | 'topCourses'
  | 'recentActivities'
  | 'export'
  | 'exportAsCSV'
  | 'exportAsPDF'
  | 'profile'
  | 'logout'
  | 'lmsAnalytics'
  | 'myAccount'
  | 'loginSuccessful'
  | 'welcomeBack'
  | 'loginFailed'
  | 'invalidCredentials'
  | 'loggedOut'
  | 'logoutSuccessful'
  | 'logoutFailed'
  | 'errorLoggingOut'
  | 'pleaseSelectDateRange'
  | 'last7Days'
  | 'last30Days'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom'
  | 'apply'
  | 'cancel'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'categoryOverview'
  | 'avgCompletionTime'
  | 'enrolledStudents'
  | 'totalQuizzes'
  | 'totalLessons'
  | 'title'
  | 'instructor'
  | 'enrollments'
  | 'completionRate'
  | 'rating'
  | 'viewCourse'
  | 'dateCreated'
  | 'lastActivity'
  | 'switchRole'
  | 'administrator'
  | 'instructor'
  | 'student'
  | 'viewMode'
  | 'language'
  | 'english'
  | 'hebrew'
  | 'interfaceSettings'
  | 'theme'
  | 'light'
  | 'dark'
  | 'system'
  | 'saveSettings'
  | 'settingsSaved'
  | 'search'
  | 'notFound'
  | 'pageNotFound'
  | 'returnHome'
  | 'totalPosts'
  | 'totalThreads'
  | 'forumParticipation'
  | 'replies'
  | 'topics'
  | 'popularThreads'
  | 'mostActiveForums'
  | 'failedToLoadData'
  // Settings page
  | 'settings.title'
  | 'settings.tabs.general'
  | 'settings.tabs.appearance'
  | 'settings.tabs.advanced'
  | 'settings.generalSettings'
  | 'settings.generalDescription'
  | 'settings.defaultPage'
  | 'settings.selectDefaultPage'
  | 'nav.dashboard'
  | 'nav.courses'
  | 'nav.users'
  | 'settings.defaultDateRange'
  | 'settings.selectDateRange'
  | 'dateRange.week'
  | 'dateRange.month'
  | 'dateRange.quarter'
  | 'dateRange.year'
  | 'settings.enableNotifications'
  | 'settings.appearanceSettings'
  | 'settings.appearanceDescription'
  | 'settings.chartsTheme'
  | 'settings.selectTheme'
  | 'theme.light'
  | 'theme.dark'
  | 'theme.auto'
  | 'settings.enableRtl'
  | 'settings.rtlDescription'
  | 'settings.language'
  | 'settings.selectLanguage'
  | 'settings.advancedSettings'
  | 'settings.advancedDescription'
  | 'settings.refreshInterval'
  | 'settings.minutes'
  | 'settings.refreshIntervalDescription'
  | 'settings.saveChanges'
  | 'settings.savedSuccess'
  | 'settings.settingsSavedDescription'
  | 'settings.saveError'
  | 'settings.settingsSaveErrorDescription';

// Define the structure of our translations object
type Translations = {
  [key in TranslationKey]: {
    en: string;
    he: string;
  }
};

// Create translations
export const translations: Translations = {
  dashboard: {
    en: 'Dashboard',
    he: 'לוח בקרה'
  },
  courses: {
    en: 'Courses',
    he: 'קורסים'
  },
  lessons: {
    en: 'Lessons',
    he: 'שיעורים'
  },
  quizzes: {
    en: 'Quizzes',
    he: 'בחנים'
  },
  students: {
    en: 'Students',
    he: 'תלמידים'
  },
  forums: {
    en: 'Forums',
    he: 'פורומים'
  },
  groups: {
    en: 'Groups',
    he: 'קבוצות'
  },
  settings: {
    en: 'Settings',
    he: 'הגדרות'
  },
  activeUsers: {
    en: 'Active Users',
    he: 'משתמשים פעילים'
  },
  courseCompletionRate: {
    en: 'Course Completion Rate',
    he: 'שיעור השלמת קורסים'
  },
  totalForumPosts: {
    en: 'Total Forum Posts',
    he: 'סה"כ פרסומים בפורום'
  },
  courseEnrollments: {
    en: 'Course Enrollments',
    he: 'הרשמות לקורסים'
  },
  userEngagement: {
    en: 'User Engagement',
    he: 'מעורבות משתמשים'
  },
  courseEnrollmentByCategory: {
    en: 'Course Enrollment by Category',
    he: 'הרשמה לקורסים לפי קטגוריה'
  },
  courseCompletionTrend: {
    en: 'Course Completion Trend',
    he: 'מגמת השלמת קורסים'
  },
  forumActivity: {
    en: 'Forum Activity',
    he: 'פעילות בפורום'
  },
  topCourses: {
    en: 'Top Courses',
    he: 'קורסים מובילים'
  },
  recentActivities: {
    en: 'Recent Activities',
    he: 'פעילויות אחרונות'
  },
  export: {
    en: 'Export',
    he: 'ייצוא'
  },
  exportAsCSV: {
    en: 'Export as CSV',
    he: 'ייצוא כ-CSV'
  },
  exportAsPDF: {
    en: 'Export as PDF',
    he: 'ייצוא כ-PDF'
  },
  profile: {
    en: 'Profile',
    he: 'פרופיל'
  },
  logout: {
    en: 'Log out',
    he: 'התנתק'
  },
  lmsAnalytics: {
    en: 'LMS Analytics',
    he: 'אנליטיקה LMS'
  },
  myAccount: {
    en: 'My Account',
    he: 'החשבון שלי'
  },
  loginSuccessful: {
    en: 'Login Successful',
    he: 'התחברות הצליחה'
  },
  welcomeBack: {
    en: 'Welcome back',
    he: 'ברוך שובך'
  },
  loginFailed: {
    en: 'Login Failed',
    he: 'התחברות נכשלה'
  },
  invalidCredentials: {
    en: 'Invalid username or password. Please try again.',
    he: 'שם משתמש או סיסמה שגויים. אנא נסה שוב.'
  },
  loggedOut: {
    en: 'Logged Out',
    he: 'התנתקת'
  },
  logoutSuccessful: {
    en: 'You have been successfully logged out.',
    he: 'התנתקת בהצלחה.'
  },
  logoutFailed: {
    en: 'Logout Failed',
    he: 'התנתקות נכשלה'
  },
  errorLoggingOut: {
    en: 'There was an error logging out. Please try again.',
    he: 'אירעה שגיאה בהתנתקות. אנא נסה שוב.'
  },
  pleaseSelectDateRange: {
    en: 'Please select date range',
    he: 'אנא בחר טווח תאריכים'
  },
  last7Days: {
    en: 'Last 7 Days',
    he: '7 ימים אחרונים'
  },
  last30Days: {
    en: 'Last 30 Days',
    he: '30 ימים אחרונים'
  },
  thisMonth: {
    en: 'This Month',
    he: 'החודש הזה'
  },
  lastMonth: {
    en: 'Last Month',
    he: 'חודש שעבר'
  },
  thisYear: {
    en: 'This Year',
    he: 'השנה הזו'
  },
  custom: {
    en: 'Custom',
    he: 'מותאם אישית'
  },
  apply: {
    en: 'Apply',
    he: 'החל'
  },
  cancel: {
    en: 'Cancel',
    he: 'ביטול'
  },
  daily: {
    en: 'Daily',
    he: 'יומי'
  },
  weekly: {
    en: 'Weekly',
    he: 'שבועי'
  },
  monthly: {
    en: 'Monthly',
    he: 'חודשי'
  },
  yearly: {
    en: 'Yearly',
    he: 'שנתי'
  },
  categoryOverview: {
    en: 'Category Overview',
    he: 'סקירת קטגוריה'
  },
  avgCompletionTime: {
    en: 'Avg. Completion Time',
    he: 'זמן השלמה ממוצע'
  },
  enrolledStudents: {
    en: 'Enrolled Students',
    he: 'סטודנטים רשומים'
  },
  totalQuizzes: {
    en: 'Total Quizzes',
    he: 'סה"כ בחנים'
  },
  totalLessons: {
    en: 'Total Lessons',
    he: 'סה"כ שיעורים'
  },
  title: {
    en: 'Title',
    he: 'כותרת'
  },
  instructor: {
    en: 'Instructor',
    he: 'מדריך'
  },
  enrollments: {
    en: 'Enrollments',
    he: 'הרשמות'
  },
  completionRate: {
    en: 'Completion Rate',
    he: 'שיעור השלמה'
  },
  rating: {
    en: 'Rating',
    he: 'דירוג'
  },
  viewCourse: {
    en: 'View Course',
    he: 'צפה בקורס'
  },
  dateCreated: {
    en: 'Date Created',
    he: 'תאריך יצירה'
  },
  lastActivity: {
    en: 'Last Activity',
    he: 'פעילות אחרונה'
  },
  switchRole: {
    en: 'Switch Role',
    he: 'החלף תפקיד'
  },
  administrator: {
    en: 'Administrator',
    he: 'מנהל'
  },
  student: {
    en: 'Student',
    he: 'תלמיד'
  },
  viewMode: {
    en: 'View Mode',
    he: 'מצב תצוגה'
  },
  language: {
    en: 'Language',
    he: 'שפה'
  },
  english: {
    en: 'English',
    he: 'אנגלית'
  },
  hebrew: {
    en: 'Hebrew',
    he: 'עברית'
  },
  interfaceSettings: {
    en: 'Interface Settings',
    he: 'הגדרות ממשק'
  },
  theme: {
    en: 'Theme',
    he: 'ערכת נושא'
  },
  light: {
    en: 'Light',
    he: 'בהיר'
  },
  dark: {
    en: 'Dark',
    he: 'כהה'
  },
  system: {
    en: 'System',
    he: 'מערכת'
  },
  saveSettings: {
    en: 'Save Settings',
    he: 'שמור הגדרות'
  },
  settingsSaved: {
    en: 'Settings Saved',
    he: 'ההגדרות נשמרו'
  },
  search: {
    en: 'Search',
    he: 'חיפוש'
  },
  notFound: {
    en: 'Not Found',
    he: 'לא נמצא'
  },
  pageNotFound: {
    en: 'Page Not Found',
    he: 'הדף לא נמצא'
  },
  returnHome: {
    en: 'Return Home',
    he: 'חזור לדף הבית'
  },
  totalPosts: {
    en: 'Total Posts',
    he: 'סה"כ פרסומים'
  },
  totalThreads: {
    en: 'Total Threads',
    he: 'סה"כ שרשורים'
  },
  forumParticipation: {
    en: 'Forum Participation',
    he: 'השתתפות בפורום'
  },
  replies: {
    en: 'Replies',
    he: 'תגובות'
  },
  topics: {
    en: 'Topics',
    he: 'נושאים'
  },
  popularThreads: {
    en: 'Popular Threads',
    he: 'שרשורים פופולריים'
  },
  mostActiveForums: {
    en: 'Most Active Forums',
    he: 'פורומים פעילים ביותר'
  },
  failedToLoadData: {
    en: 'Failed to load data',
    he: 'טעינת הנתונים נכשלה'
  },
  // Settings page translations
  'settings.title': {
    en: 'Analytics Settings',
    he: 'הגדרות אנליטיקה'
  },
  'settings.tabs.general': {
    en: 'General',
    he: 'כללי'
  },
  'settings.tabs.appearance': {
    en: 'Appearance',
    he: 'מראה'
  },
  'settings.tabs.advanced': {
    en: 'Advanced',
    he: 'מתקדם'
  },
  'settings.generalSettings': {
    en: 'General Settings',
    he: 'הגדרות כלליות'
  },
  'settings.generalDescription': {
    en: 'Configure basic settings for the analytics dashboard',
    he: 'הגדר הגדרות בסיסיות ללוח האנליטיקה'
  },
  'settings.defaultPage': {
    en: 'Default Landing Page',
    he: 'דף נחיתה ברירת מחדל'
  },
  'settings.selectDefaultPage': {
    en: 'Select default page',
    he: 'בחר דף ברירת מחדל'
  },
  'nav.dashboard': {
    en: 'Dashboard',
    he: 'לוח בקרה'
  },
  'nav.courses': {
    en: 'Course Statistics',
    he: 'סטטיסטיקת קורסים'
  },
  'nav.users': {
    en: 'User Statistics',
    he: 'סטטיסטיקת משתמשים'
  },
  'settings.defaultDateRange': {
    en: 'Default Date Range',
    he: 'טווח תאריכים ברירת מחדל'
  },
  'settings.selectDateRange': {
    en: 'Select default date range',
    he: 'בחר טווח תאריכים ברירת מחדל'
  },
  'dateRange.week': {
    en: 'Last Week',
    he: 'שבוע אחרון'
  },
  'dateRange.month': {
    en: 'Last Month',
    he: 'חודש אחרון'
  },
  'dateRange.quarter': {
    en: 'Last Quarter',
    he: 'רבעון אחרון'
  },
  'dateRange.year': {
    en: 'Last Year',
    he: 'שנה אחרונה'
  },
  'settings.enableNotifications': {
    en: 'Enable Notifications',
    he: 'אפשר התראות'
  },
  'settings.appearanceSettings': {
    en: 'Appearance Settings',
    he: 'הגדרות מראה'
  },
  'settings.appearanceDescription': {
    en: 'Customize the look and feel of your analytics dashboard',
    he: 'התאם אישית את המראה והתחושה של לוח האנליטיקה שלך'
  },
  'settings.chartsTheme': {
    en: 'Charts Theme',
    he: 'ערכת נושא לגרפים'
  },
  'settings.selectTheme': {
    en: 'Select theme',
    he: 'בחר ערכת נושא'
  },
  'theme.light': {
    en: 'Light',
    he: 'בהיר'
  },
  'theme.dark': {
    en: 'Dark',
    he: 'כהה'
  },
  'theme.auto': {
    en: 'Auto (system)',
    he: 'אוטומטי (מערכת)'
  },
  'settings.enableRtl': {
    en: 'Enable RTL Support',
    he: 'אפשר תמיכה ב-RTL'
  },
  'settings.rtlDescription': {
    en: 'Right-to-left text direction for Hebrew and Arabic',
    he: 'כיוון טקסט מימין לשמאל לעברית וערבית'
  },
  'settings.language': {
    en: 'Interface Language',
    he: 'שפת ממשק'
  },
  'settings.selectLanguage': {
    en: 'Select language',
    he: 'בחר שפה'
  },
  'settings.advancedSettings': {
    en: 'Advanced Settings',
    he: 'הגדרות מתקדמות'
  },
  'settings.advancedDescription': {
    en: 'Configure technical settings for advanced users',
    he: 'הגדר הגדרות טכניות למשתמשים מתקדמים'
  },
  'settings.refreshInterval': {
    en: 'Data Refresh Interval',
    he: 'מרווח רענון נתונים'
  },
  'settings.minutes': {
    en: 'minutes',
    he: 'דקות'
  },
  'settings.refreshIntervalDescription': {
    en: 'How often the analytics data should automatically refresh',
    he: 'באיזו תדירות נתוני האנליטיקה יתרעננו אוטומטית'
  },
  'settings.saveChanges': {
    en: 'Save Changes',
    he: 'שמור שינויים'
  },
  'settings.savedSuccess': {
    en: 'Settings Saved',
    he: 'ההגדרות נשמרו'
  },
  'settings.settingsSavedDescription': {
    en: 'Your analytics settings have been saved successfully',
    he: 'הגדרות האנליטיקה שלך נשמרו בהצלחה'
  },
  'settings.saveError': {
    en: 'Error Saving Settings',
    he: 'שגיאה בשמירת ההגדרות'
  },
  'settings.settingsSaveErrorDescription': {
    en: 'There was a problem saving your settings. Please try again.',
    he: 'הייתה בעיה בשמירת ההגדרות שלך. אנא נסה שוב.'
  }
};

// Helper function to get the translation
export function t(key: TranslationKey, language: 'en' | 'he' = 'en'): string {
  if (translations[key]) {
    return translations[key][language];
  }
  // Return the key if translation not found
  return key;
}