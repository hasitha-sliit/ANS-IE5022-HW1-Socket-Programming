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
 * Function for generating previous character for the given input character
 * @param {*} input 
 * @returns
 */
function getPreviousCharacter(input) {
  let result = '';
  let characterAscii = input.charCodeAt(0);

  if ((97 <= characterAscii && characterAscii <= 122) || (65 <= characterAscii && characterAscii <= 90)){
    if (characterAscii === 97) {
      characterAscii = 122;
    } else if (characterAscii === 65) {
      characterAscii = 90;
    } else {
      characterAscii -= 1;
    }
    result = String.fromCharCode(characterAscii);
  } else {
    result = 'Invalid character(alphabetic characters only)';
  }
            
  return result;
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
        const response = getPreviousCharacter(result);
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