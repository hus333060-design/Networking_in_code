// Socket
// A Socket is a communication endpoint that allows two applications or devices to send and receive data over a network.In the case of UDP (User Datagram Protocol), sockets are used for connectionless communication. bcz here data send more matter than connection.

// How UDP Sockets Work
    // -> Server Side:
    //     Create a socket
    //     Bind it to an IP + port
    //     Wait for data

    //  -> Client Side:
    //     Create a socket
    //     send data to the server’s IP + port

    // UDP Socket = IP + Port