/**
 * @file Socket Server
 * @author Hasitha Gamage <ms21908538@my.sliit.lk>
 */

// Libs (Used Node.js core libraries)
const net = require('net');

// Constants
const HOST = '127.0.0.1';
const PORT = 9898;

/**
 * Function for decrementing given input value by one
 * @param {*} input 
 * @returns
 */
function decrementValue(input) {
  let result = parseInt(input);
  
  if (isNaN(result)) {
    result = 'Invalid character(numeric[0-9] characters only)';
  } else {
    result -= 1;
  }
            
  return result.toString();
}

// Create a server object
const socketList = [];
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const result = data.toString();
    
    if (result === 'CONNECT') {
        socketList.push(socket);        
    } else if (result === 'EXIT') {
        socketList.forEach(sock => sock.end())
        server.close()
    } else {
        const response = decrementValue(result);
        socketList.forEach(sock => sock.write(response))
    }    
  });
  
}).on('error', (err) => {
  console.error(err);
});

// Open server on port 9898
server.listen({ host: HOST, port: PORT }, () => {
  console.log('opened server on', server.address().port);
});