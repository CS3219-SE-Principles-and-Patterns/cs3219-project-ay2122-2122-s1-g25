const rotationSocketWrapper = (io) => {
    const rotationSocket = io.of('/sockets/rotation');
    rotationSocket.on('connection', (socket) => {
        let roomId;
        console.log(
            `Rotation Socket: connection established from client ${socket.id}`
        );
        socket.on("joinRoom", msg => {
            roomId = msg.room;
            rotationSocket.to(roomId).emit("new-user", `${msg.user} has joined room ${roomId}`);
            socket.join(roomId);
            return socket.emit("successfully joined room", `You have successfully joined ${roomId}`);
        })
        socket.on('send-rotation-message', msg => {
            rotationSocket.to(roomId).emit('receive-rotation-message', msg);
        });

        return rotationSocket;
    });
};

module.exports = rotationSocketWrapper;