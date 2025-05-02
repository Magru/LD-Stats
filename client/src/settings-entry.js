/**
 * Settings page entry point for WordPress admin
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './providers/theme-provider';
import { LanguageProvider } from './providers/language-provider';
import { Toaster } from './components/ui/toaster';
import Settings from './pages/Settings';
import './index.css';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ldbb-analytics-settings-root');
  if (container) {
    const root = createRoot(container);
    
    // Get WordPress localization settings
    const wpSettings = window.LDBB_ANALYTICS || {};
    
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="ldbb-theme-preference">
            <LanguageProvider 
              defaultLanguage={wpSettings.locale === 'he_IL' ? 'he' : 'en'} 
              defaultDirection={wpSettings.isRtl ? 'rtl' : 'ltr'}
            >
              <Settings />
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }
});