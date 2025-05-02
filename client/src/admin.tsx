import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient';
import { ThemeProvider } from './providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from './providers/language-provider';
import Dashboard from '@/pages/Dashboard';
import CourseStats from '@/pages/CourseStats';
import ForumStats from '@/pages/ForumStats';
import GroupStats from '@/pages/GroupStats';
import QuizStats from '@/pages/QuizStats';
import UserStats from '@/pages/UserStats';
import Settings from '@/pages/Settings';
import './index.css';

// WordPress admin panel integration
declare global {
  interface Window {
    LDBB_ANALYTICS: {
      restNonce: string;
      restRoot: string;
      currentUser: any;
      pluginUrl: string;
      locale: string;
      isRtl: boolean;
      page?: string;
      apiRequest?: (endpoint: string, method?: string, data?: any) => Promise<any>;
    };
  }
}

// Mount the appropriate component based on the page
document.addEventListener('DOMContentLoaded', () => {
  if (!window.LDBB_ANALYTICS) {
    console.error('LDBB_ANALYTICS global object not found');
    return;
  }

  // Function to mount a component to a specific root element
  const mountComponent = (rootId: string, Component: React.ComponentType) => {
    const rootElement = document.getElementById(rootId);
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="ldbb-theme-preference">
              <LanguageProvider 
                defaultLanguage={window.LDBB_ANALYTICS.locale === 'he_IL' ? 'he' : 'en'} 
                defaultDirection={window.LDBB_ANALYTICS.isRtl ? 'rtl' : 'ltr'}
              >
                <Component />
                <Toaster />
              </LanguageProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </React.StrictMode>
      );
    }
  };

  // Mount the appropriate component based on the page
  const { page } = window.LDBB_ANALYTICS;
  
  // Default to dashboard if no page is specified
  if (!page || page === 'dashboard') {
    mountComponent('ldbb-analytics-root', Dashboard);
  } else if (page === 'course-stats') {
    mountComponent('ldbb-analytics-course-stats-root', CourseStats);
  } else if (page === 'forum-stats') {
    mountComponent('ldbb-analytics-forum-stats-root', ForumStats);
  } else if (page === 'group-stats') {
    mountComponent('ldbb-analytics-group-stats-root', GroupStats);
  } else if (page === 'quiz-stats') {
    mountComponent('ldbb-analytics-quiz-stats-root', QuizStats);
  } else if (page === 'user-stats') {
    mountComponent('ldbb-analytics-user-stats-root', UserStats);
  } else if (page === 'settings') {
    mountComponent('ldbb-analytics-settings-root', Settings);
  }
});