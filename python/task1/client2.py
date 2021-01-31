
#!/usr/bin/env python3

import socket

IP = socket.gethostbyname(socket.gethostname())
PORT = 8098  # non-privileged ports  > 1023
AMT_DATA = 64 

#socket () function
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as mySocket:
    #connect ()
    mySocket.connect((IP,PORT))
    print('Waiting for server response ....')
    data = mySocket.recv(AMT_DATA)    
    while True:
        if data:
            break
    print('Previous Character :: ', repr(data.decode()))