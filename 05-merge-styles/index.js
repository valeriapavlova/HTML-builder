//import required modules
const fs = require('fs').promises;
const path = require('path');

//main function to build the css bundle
async function buildCssBundle() {
  // define directory path
  const stylesFolder = path.join(__dirname, 'styles');
  const outputFolder = path.join(__dirname, 'project-dist');
  const outputFile = path.join(outputFolder, 'bundle.css');

  

}