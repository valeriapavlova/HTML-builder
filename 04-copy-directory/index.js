const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    //create target directory
    await fs.mkdir(targetDir, { recursive: true });
  }
}

copyDir();