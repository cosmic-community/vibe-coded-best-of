const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Path to the console capture script
const scriptPath = path.join(__dirname, '../public/dashboard-console-capture.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Find all HTML files in the build output
const buildDir = path.join(__dirname, '../.next');
const htmlFiles = glob.sync('**/*.html', { cwd: buildDir, absolute: true });

console.log(`Found ${htmlFiles.length} HTML files to process`);

// Inject script into each HTML file
htmlFiles.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  
  // Check if script is already injected
  if (html.includes('dashboard-console-capture')) {
    console.log(`Skipping ${file} - script already present`);
    return;
  }
  
  // Inject before closing head tag
  if (html.includes('</head>')) {
    html = html.replace(
      '</head>',
      `<script src="/dashboard-console-capture.js"></script></head>`
    );
    fs.writeFileSync(file, html);
    console.log(`Injected script into ${file}`);
  }
});

console.log('Console capture script injection complete');