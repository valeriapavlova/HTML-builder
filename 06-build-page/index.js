const fs = require('fs').promises;
const path = require('path');

//Main function
async function buildPage() {
  try {
    //create project-dist folder
    await fs.mkdir(path.join(__dirname, '../project-dist'), { 
      recursive: true,
    });

    // read template.html
    let template = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );
  } catch (error) {
    console.error('Error copying directory:', error);
  }
  
}
