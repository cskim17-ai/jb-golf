const fs = require('fs');
const path = require('path');

function findFile(dir, filename) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        if (fs.statSync(fullPath).isDirectory()) {
          if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('/proc') && !fullPath.includes('/sys')) {
            findFile(fullPath, filename);
          }
        } else if (file.toLowerCase() === filename.toLowerCase()) {
          console.log('FOUND:', fullPath);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Searching for good.pdf...');
findFile('/tmp', 'good.pdf');
findFile('/home', 'good.pdf');
findFile('/app', 'good.pdf');
findFile('/', 'good.pdf');
console.log('Search complete.');
