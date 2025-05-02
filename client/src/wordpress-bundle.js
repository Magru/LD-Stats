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

// Import page components
import Dashboard from './pages/Dashboard';
import CourseStats from './pages/CourseStats';
import UserStats from './pages/UserStats';
import ForumStats from './pages/ForumStats';
import GroupStats from './pages/GroupStats';
import QuizStats from './pages/QuizStats';
import Settings from './pages/Settings';

import './index.css';

/**
 * Mount a React app inside a WordPress admin page
 * 
 * @param {string} containerId DOM element ID to mount the React app
 * @param {string} pageName Name of the page to mount
 */
function mountReactApp(containerId, pageName) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found in the DOM`);
    return;
  }

  // Get WordPress settings
  const wpSettings = window.LDBB_ANALYTICS || {};
  const isRtl = wpSettings.isRtl === true;
  const defaultLang = wpSettings.locale === 'he_IL' ? 'he' : 'en';
  
  // Create page component map
  const pageComponents = {
    'dashboard': Dashboard,
    'courses': CourseStats,
    'users': UserStats,
    'forums': ForumStats,
    'groups': GroupStats,
    'quizzes': QuizStats,
    'settings': Settings
  };
  
  // Get the component to render
  const PageComponent = pageComponents[pageName];
  if (!PageComponent) {
    console.error(`No component found for page: ${pageName}`);
    return;
  }
  
  // Create root and render
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={wpSettings.settings?.charts_theme || "light"} storageKey="ldbb-theme-preference">
          <LanguageProvider defaultLanguage={defaultLang} defaultDirection={isRtl ? 'rtl' : 'ltr'}>
            <PageComponent />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
  
  console.log(`React app mounted in #${containerId} for page: ${pageName}`);
}

// Export the mounting function for WordPress use
window.LDBB_ANALYTICS_REACT = {
  mountReactApp
};