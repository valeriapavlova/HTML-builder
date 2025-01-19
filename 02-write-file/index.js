//Module Imports
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// File and stream setup
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

// Readline setup
const readLine = readline.createInterface ({
  input: process.stdin,
  output: process.stdout
});

//Initial message
console.log('Welcome! Enter your text (type "exit" to quit):');

// Readline input event handler
readLine.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye! Thanks for using this program.');
    readLine.close();
    return;
  }
  writeStream.write(input + '\n');
  console.log('Text added to file. Continue typing:');
});

// Readline close event handler
readLine.on('close', () => {
  writeStream.end();
  process.exit();
});

// Process exit event handler
process.on('SIGINT', () => {
  console.log('\nGoodbye! Thanks for using this program.');
  writeStream.end();
  process.exit(0);
});