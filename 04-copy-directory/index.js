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

    //copy files to target directory
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      //check if file is a file
      const stats = await fs.stat(sourcePath);
      if (stats.isFile()) {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
      

    

  } catch (error) {
    console.error('Error copying directory:', error);
  }
}

copyDir();