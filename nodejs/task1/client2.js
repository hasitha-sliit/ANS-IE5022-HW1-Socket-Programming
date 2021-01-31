/**
 * @file Client 1 :: Listener to the socket server for printing modified response
 * @author Hasitha Gamage <ms21908538@my.sliit.lk>
 */

// Libs (Used Node.js core libraries)
const net = require('net');

// Constants
const HOST = '127.0.0.1';
const PORT = 9898;

// Connect to a server @ port 9898
const client = net.createConnection({ host: HOST, port: PORT }, () => {
  client.write('CONNECT');
  console.log('Waiting for server response ....');
});

client.on('data', (data) => {
  console.log(`Modified Response :: ${data.toString()}`);
  client.write('EXIT');
});