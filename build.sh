#!/bin/bash

# Создаем необходимые директории
mkdir -p dist
mkdir -p build
mkdir -p build/learndash-buddyboss-analytics
mkdir -p build/learndash-buddyboss-analytics/includes
mkdir -p build/learndash-buddyboss-analytics/admin
mkdir -p build/learndash-buddyboss-analytics/admin/css
mkdir -p build/learndash-buddyboss-analytics/admin/js
mkdir -p build/learndash-buddyboss-analytics/public
mkdir -p build/learndash-buddyboss-analytics/public/css
mkdir -p build/learndash-buddyboss-analytics/public/js
mkdir -p build/learndash-buddyboss-analytics/api
mkdir -p build/learndash-buddyboss-analytics/languages
mkdir -p build/learndash-buddyboss-analytics/dist

# Компилируем React приложение для WordPress с помощью webpack
echo "Компиляция React приложения для WordPress..."
node node_modules/.bin/webpack --config wp-webpack.config.js

# Собираем также стандартный Vite проект для разработки
echo "Компиляция стандартного Vite проекта..."
npm run build

# Копируем PHP файлы
echo "Копирование PHP файлов..."
cp learndash-buddyboss-analytics.php build/learndash-buddyboss-analytics/
cp -r includes/* build/learndash-buddyboss-analytics/includes/
cp -r admin/* build/learndash-buddyboss-analytics/admin/
cp -r public/* build/learndash-buddyboss-analytics/public/
cp -r api/* build/learndash-buddyboss-analytics/api/

# Копируем скомпилированные React файлы
echo "Копирование скомпилированных React файлов..."
cp -r dist/* build/learndash-buddyboss-analytics/dist/

# Создаем пустой POT файл для переводов
echo "# Copyright (C) $(date +%Y)" > build/learndash-buddyboss-analytics/languages/learndash-buddyboss-analytics.pot
echo "# This file is distributed under the same license as the plugin." >> build/learndash-buddyboss-analytics/languages/learndash-buddyboss-analytics.pot

# Создаем ZIP архив
echo "Создание ZIP архива..."
cd build
zip -r learndash-buddyboss-analytics.zip learndash-buddyboss-analytics

echo "Готово! Плагин упакован в build/learndash-buddyboss-analytics.zip"