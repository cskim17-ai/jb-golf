const fs = require('fs');
const path = require('path');

function findPdfs(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
          findPdfs(fullPath);
        }
      } else if (file.endsWith('.pdf')) {
        console.log(fullPath);
      }
    } catch (e) {}
  }
}

findPdfs('/app/applet');
