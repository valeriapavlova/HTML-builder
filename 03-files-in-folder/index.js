//Module imports
const fs = require('fs/promises');
const path = require('path');

async function displayFileInfo() {
  try {
    const folderPath = path.join(__dirname, 'secret-folder');

    //Read directory contents with file information
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        //Get file stats
        const stats = await fs.stat(filePath);
        //Extract file name and extension
        const fileName = path.parse(filePath.name).name;
        const fileExt = path.extname(filePath.name).slice(1);
        //Get file size in KB
        const fileSizeKB = (stats.size / 1024).toFixed(2);

        //Display file information
        console.log(`${fileName} - ${fileExt} - ${fileSizeKB}KB`);
      }
    }
    //Error Handling
  } catch (error) {
    console.error('Error reading the file:', error);
  }
}

displayFileInfo();
