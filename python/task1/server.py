#!/usr/bin/env python3

import socket

IP = socket.gethostbyname(socket.gethostname())
PORT = 8098  # Non-privileged ports  > 1023)
AMT_DATA = 64 

# Function for get previous character for given character
def getPreviousCharacter(input):
    result = ''
    try:
        firstCharacter = str(input)[0]
        characterAscii = ord(firstCharacter)

        if (97 <= characterAscii and characterAscii <= 122) or (65 <= characterAscii and characterAscii <= 90):
            if characterAscii == 97:
                characterAscii = 122
            elif characterAscii == 65:
                characterAscii = 90
            else:
                characterAscii = characterAscii - 1

            result = chr(characterAscii)
        else:
            raise Exception("Invalid character(alphabetic characters only)")
    except:
        result = 'Invalid character(alphabetic characters only)'

    return result

# Socket created socket()
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as mySocket:
    # Reuse address address and avoid bind() exception: Address already in use
    mySocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    # Bind the socket with proper IP and a port bind()
    mySocket.bind((IP, PORT))    #bind done

    # Listening socket listen()
    mySocket.listen()

    # Blocking mode  accept() for sender
    senderConn, addr = mySocket.accept()

    data = ''
    with senderConn:
        while True:
            if data != '':
                break
            else:
                data = senderConn.recv(AMT_DATA)
                data = getPreviousCharacter(data.decode()).encode()

    # Blocking mode  accept() for receiver
    receiverConn, addr = mySocket.accept()

    with receiverConn:
        receiverConn.sendall(data) # Send data to receiver

    # Terminate connections
    senderConn.close()
    receiverConn.close()