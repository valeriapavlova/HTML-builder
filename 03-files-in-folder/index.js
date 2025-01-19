//Module imports
const fs = require('fs/promises');
const path = require('path');

async function displayFileInfo() {
  try {
    const folderPath = path.join(__dirname, 'secret-folder');

    //Readd directory contents
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    
    //Error Handling
  } catch (error) {
    console.error('Error reading the file:', error);
  }
}