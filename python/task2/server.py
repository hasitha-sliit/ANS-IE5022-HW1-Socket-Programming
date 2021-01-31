#!/usr/bin/env python3

import socket

IP = socket.gethostbyname(socket.gethostname())
PORT = 8098  # Non-privileged ports  > 1023)
AMT_DATA = 64 

# Function for decrementing given input value by one
def decrementValue(input):
    result = ''
    try:
        input = int(input)
        result = input - 1
    except:
        result = 'Invalid input value(numbers only)'

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
                data = str(decrementValue(data.decode())).encode()

    # Blocking mode  accept() for receiver
    receiverConn, addr = mySocket.accept()

    with receiverConn:
        receiverConn.sendall(data) # Send data to receiver

    # Terminate connections
    senderConn.close()
    receiverConn.close()