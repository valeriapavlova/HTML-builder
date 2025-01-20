const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    //create target directory
    await fs.mkdir(targetDir, { recursive: true });

    //read source directory contents
    const files = await fs.readdir(sourceDir);

    

  } catch (error) {
    console.error('Error copying directory:', error);
  }
}

copyDir();