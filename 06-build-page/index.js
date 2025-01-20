const fs = require('fs').promises;
const path = require('path');

// Function to copy directory
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

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

    // replace component tags
    let components = await fs.readdir(path.join(__dirname, 'components'));
    for (let component of components) {
      if (component.endsWith('.html')) {
        let componentName = component.replace('.html', '');
        let componentContent = await fs.readFile(
          path.join(__dirname, 'components', component),
          'utf-8',
        );
        template = template.replace(
          new RegExp(`{{${componentName}}}`, 'g'),
          componentContent,
        );
      }
    }

    //save new index.html
    await fs.writeFile(
      path.join(__dirname, '../project-dist/index.html'),
      template,
    );

    // create style.css with script from 05-merge-style
    await buildCssBundle();

    // copy assets folder from 04-copy-assets
    await copyDir(
      path.join(__dirname, 'assets'),
      path.join(__dirname, '../project-dist/assets'),
    );

    console.log('Page build successfully!');
  } catch (error) {
    console.error('Error building page:', error);
  }
}

// function from 05-merge-style
async function buildCssBundle() {
  const stylesFolder = path.join(__dirname, 'styles');
  const outputFolder = path.join(__dirname, '../project-dist');
  const outputFile = path.join(outputFolder, 'style.css');

  try {
    const filesInStylesFolder = await fs.readdir(stylesFolder);
    const cssContents = [];

    for (const cssFile of filesInStylesFolder) {
      const filePath = path.join(stylesFolder, cssFile);
      const fileStats = await fs.stat(filePath);
      if (fileStats.isFile() && cssFile.endsWith('.css')) {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        cssContents.push(fileContent);
      }
    }

    const bundleContent = cssContents.join('\n');
    await fs.writeFile(outputFile, bundleContent);

    console.log('CSS bundle created successfully');
  } catch (error) {
    console.error('Error building CSS bundle:', error);
  }
}
// run the main function
buildPage();
