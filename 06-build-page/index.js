const fs = require('fs').promises;
const path = require('path');

//Main function
async function buildPage() {
  try {
    //create project-dist folder
    await fs.mkdir(path.join(__dirname, '../project-dist'), { 
      recursive: true,
    });
  } catch (error) {
    console.error('Error copying directory:', error);
  }
  
}
