const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

// Configuration
const PLUGIN_NAME = 'learndash-buddyboss-analytics';
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const BUILD_DIR = path.resolve(__dirname, 'build');
const PLUGIN_DIR = path.resolve(BUILD_DIR, PLUGIN_NAME);

// Ensure the build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Ensure the plugin directory exists
if (!fs.existsSync(PLUGIN_DIR)) {
  fs.mkdirSync(PLUGIN_DIR, { recursive: true });
}

// Step 1: Build the JS/CSS assets using webpack
console.log('Building assets with webpack...');
const compiler = webpack(webpackConfig({ mode: 'production' }, { mode: 'production' }));

compiler.run((err, stats) => {
  if (err) {
    console.error('Webpack compilation error:', err);
    return;
  }

  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }));

  // Step 2: Copy the plugin files to the build directory
  console.log('Copying plugin files to build directory...');
  copyPluginFiles();

  // Step 3: Create a ZIP file of the plugin
  console.log('Creating plugin ZIP file...');
  createPluginZip();
});

function copyPluginFiles() {
  // Copy main plugin file
  fs.copyFileSync(
    path.resolve(__dirname, 'learndash-buddyboss-analytics.php'),
    path.resolve(PLUGIN_DIR, 'learndash-buddyboss-analytics.php')
  );

  // Copy includes directory
  copyDirectory(
    path.resolve(__dirname, 'includes'),
    path.resolve(PLUGIN_DIR, 'includes')
  );

  // Copy admin directory
  copyDirectory(
    path.resolve(__dirname, 'admin'),
    path.resolve(PLUGIN_DIR, 'admin')
  );

  // Copy public directory
  copyDirectory(
    path.resolve(__dirname, 'public'),
    path.resolve(PLUGIN_DIR, 'public')
  );

  // Copy api directory
  copyDirectory(
    path.resolve(__dirname, 'api'),
    path.resolve(PLUGIN_DIR, 'api')
  );

  // Copy dist directory (compiled assets)
  copyDirectory(
    path.resolve(__dirname, 'dist'),
    path.resolve(PLUGIN_DIR, 'dist')
  );

  // Create languages directory
  const languagesDir = path.resolve(PLUGIN_DIR, 'languages');
  if (!fs.existsSync(languagesDir)) {
    fs.mkdirSync(languagesDir, { recursive: true });
  }

  // Create an empty .pot file for translations
  fs.writeFileSync(
    path.resolve(languagesDir, `${PLUGIN_NAME}.pot`),
    '# Copyright (C) ' + new Date().getFullYear() + '\n# This file is distributed under the same license as the plugin.\n'
  );

  console.log('Plugin files copied to build directory successfully!');
}

function copyDirectory(source, destination) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Get all files in the source directory
  const files = fs.readdirSync(source);

  // Copy each file to the destination directory
  for (const file of files) {
    const sourceFile = path.resolve(source, file);
    const destFile = path.resolve(destination, file);

    const stat = fs.statSync(sourceFile);

    if (stat.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectory(sourceFile, destFile);
    } else {
      // Copy the file
      fs.copyFileSync(sourceFile, destFile);
    }
  }
}

function createPluginZip() {
  // Create a file to stream archive data to
  const output = fs.createWriteStream(path.resolve(BUILD_DIR, `${PLUGIN_NAME}.zip`));
  const archive = archiver('zip', {
    zlib: { level: 9 } // Compression level
  });

  // Listen for all archive data to be written
  output.on('close', function() {
    console.log(`Plugin ZIP file created successfully (${archive.pointer()} bytes)`);
    console.log(`ZIP file location: ${path.resolve(BUILD_DIR, `${PLUGIN_NAME}.zip`)}`);
  });

  // Catch any errors
  archive.on('error', function(err) {
    throw err;
  });

  // Pipe archive data to the file
  archive.pipe(output);

  // Add the plugin directory to the archive
  archive.directory(PLUGIN_DIR, PLUGIN_NAME);

  // Finalize the archive (write the remaining data and close the file)
  archive.finalize();
}