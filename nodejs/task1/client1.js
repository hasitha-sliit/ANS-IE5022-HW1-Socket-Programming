/**
 * @file Client 2 :: Client for publishing user inputs to the socket server 
 * @author Hasitha Gamage <ms21908538@my.sliit.lk>
 */

// Libs (Used Node.js core libraries)
const net = require('net');
const readline = require("readline");

// Constants
const HOST = '127.0.0.1';
const PORT = 9898;

// Function for initialize socket client
function initSocketClient(value) {
  // Connect to a server @ port 9898
  const client = net.createConnection({ host: HOST, port: PORT }, () => {
    client.write('CONNECT');
    client.write(value);    
  });

  client.on('data', (data) => {
    console.log(`Modified Response :: ${data.toString()}`);
  });
}

// Initialize command line input capturing logic
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter alphabetic character:: ', (character) => {
  initSocketClient(character);
  rl.close();
});