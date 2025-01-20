//import required modules
const fs = require('fs').promises;
const path = require('path');

//main function to build the css bundle
async function buildCssBundle() {
  // define directory path
  const stylesFolder = path.join(__dirname, 'styles');
  const outputFolder = path.join(__dirname, 'project-dist');
  const outputFile = path.join(outputFolder, 'bundle.css');

  try {
    //create output folder if it doesn't exist
    await fs.mkdir(outputFolder, { recursive: true });

    //read all files in the styles folder
    const filesInStylesFolder = await fs.readdir(stylesFolder);

    // Filter and process only css files content
    const cssContents = [];

    //Read the content of each css file
    for (const cssFile of filesInStylesFolder) {
      const filePath = path.join(stylesFolder, cssFile);

      // Check if it's a file and has .css extension
      const fileStats = await fs.stat(filePath);
      if (
        fileStats.isFile() &&
        path.extname(cssFile).toLowerCase() === '.css'
      ) {
        //Read the file content and add to array
        const fileContent = await fs.readFile(filePath, 'utf-8');
        cssContents.push(fileContent);
      }
    }

    // combine all css files content
    const bundleContent = cssContents.join('\n');
    //write combined content to bundle.css
    await fs.writeFile(outputFile, bundleContent);

    console.log('CSS bundle created successfully');
  } catch (error) {
    console.error('Error building CSS bundle:', error);
  }
}

buildCssBundle();
