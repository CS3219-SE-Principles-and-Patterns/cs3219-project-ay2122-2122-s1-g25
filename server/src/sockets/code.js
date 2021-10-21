const codeSocketWrapper = (io) => {
    const codeSocket = io.of('/sockets/code');
    codeSocket.on("connection", socket => {
        console.log(
            `Code Socket: connection established from client ${socket.id}`
        );
        let roomId;
        socket.on("joinRoom", msg => {
            roomId = msg.room;
            codeSocket.to(roomId).emit("new-user", `${msg.user} has joined room ${roomId}`);
            socket.join(roomId);
            return socket.emit("successfully joined room", `You have successfully joined ${roomId}`);
        })
        socket.on('send-code', msg => {
            codeSocket.to(roomId).emit('receive-code', msg)
        })
    })
    return codeSocket;
};

module.exports = codeSocketWrapper;
