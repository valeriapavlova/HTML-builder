const fs = require('fs');
const path = require('path');

// File path
const filePath = path.join(__dirname, 'text.txt');

// Read file
const readStream = fs.createReadStream(filePath, 'utf8');

// Read file data
readStream.on('data', (chunk) => {
  process.stdout.write(chunk);
});
