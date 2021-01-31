
#!/usr/bin/env python3

import socket

IP = socket.gethostbyname(socket.gethostname())
PORT = 8098  # non-privileged ports  > 1023
AMT_DATA = 64 

#socket () function
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as mySocket:
    #connect ()
    mySocket.connect((IP,PORT))
    inputValue = input('Enter a number :: ')
    mySocket.sendall(inputValue.encode())