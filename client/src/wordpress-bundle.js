/**
 * WordPress bundle script
 * 
 * This script bundles React components for WordPress integration
 */

import React from 'react';
import { createRoot } from 'react-dom/client';

// Простой режим совместимости без React компонентов - 
// необходимо для совместимости с WordPress

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
  
  // Временная заглушка - вместо React компонентов
  container.innerHTML = `
    <div class="ldbb-analytics-notice">
      <h3>LearnDash BuddyBoss Analytics</h3>
      <p>В настоящее время используется временная версия для разработки.</p>
      <p>Некоторые функции могут быть недоступны.</p>
      <div class="ldbb-analytics-details">
        <p><strong>Текущая страница:</strong> ${pageName}</p>
        <p><strong>Язык:</strong> ${defaultLang}</p>
        <p><strong>Направление текста:</strong> ${isRtl ? 'справа налево' : 'слева направо'}</p>
      </div>
      <div class="ldbb-analytics-placeholder" style="margin-top: 20px; padding: 40px; background: #f5f5f5; border-radius: 5px; text-align: center;">
        <p style="margin: 0; font-size: 18px; color: #666;">Здесь будет отображаться контент страницы "${pageName}"</p>
      </div>
    </div>
  `;
  
  console.log(`Placeholder UI mounted in #${containerId} for page: ${pageName}`);
}

// Export the mounting function for WordPress use
window.LDBB_ANALYTICS_REACT = {
  mountReactApp
};