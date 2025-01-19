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