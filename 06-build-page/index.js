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
    await copyDir(path.join(__dirname, 'assets'), path.join(__dirname,
        '../project-dist/assets'));
    ))
  } catch (error) {
    console.error('Error copying directory:', error);
  }
}
