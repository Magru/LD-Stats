/**
 * WordPress bundle script
 * 
 * This script bundles React components for WordPress integration
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './providers/theme-provider';
import { LanguageProvider } from './providers/language-provider';
import { Toaster } from './components/ui/toaster';

// Import all pages
import Dashboard from './pages/Dashboard';
import CourseStats from './pages/CourseStats';
import ForumStats from './pages/ForumStats';
import GroupStats from './pages/GroupStats';
import QuizStats from './pages/QuizStats';
import UserStats from './pages/UserStats';
import Settings from './pages/Settings';

// Import stylesheets
import './index.css';

// WordPress integration
let LDBB_ANALYTICS = window.LDBB_ANALYTICS || {};

// Map page names to components
const components = {
  'dashboard': Dashboard,
  'course-stats': CourseStats,
  'forum-stats': ForumStats,
  'group-stats': GroupStats,
  'quiz-stats': QuizStats,
  'user-stats': UserStats,
  'settings': Settings
};

// Mount function for WordPress
function mountReactApp(containerId, pageName) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  const Component = components[pageName] || Dashboard;
  
  const root = createRoot(container);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ldbb-theme-preference">
        <LanguageProvider 
          defaultLanguage={LDBB_ANALYTICS.locale === 'he_IL' ? 'he' : 'en'} 
          defaultDirection={LDBB_ANALYTICS.isRtl ? 'rtl' : 'ltr'}
        >
          <Component />
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Initialize on page load if LDBB_ANALYTICS is defined
document.addEventListener('DOMContentLoaded', () => {
  if (!window.LDBB_ANALYTICS) {
    console.error('LDBB_ANALYTICS global object not found');
    return;
  }

  const containers = {
    'dashboard': 'ldbb-analytics-root',
    'course-stats': 'ldbb-analytics-course-stats-root',
    'forum-stats': 'ldbb-analytics-forum-stats-root',
    'group-stats': 'ldbb-analytics-group-stats-root',
    'quiz-stats': 'ldbb-analytics-quiz-stats-root',
    'user-stats': 'ldbb-analytics-user-stats-root',
    'settings': 'ldbb-analytics-settings-root',
  };

  const pageName = window.LDBB_ANALYTICS.page || 'dashboard';
  const containerId = containers[pageName];
  
  if (containerId) {
    mountReactApp(containerId, pageName);
  }
});

// Export to global scope for usage in WordPress
window.LDBB_ANALYTICS_REACT = {
  mountReactApp
};