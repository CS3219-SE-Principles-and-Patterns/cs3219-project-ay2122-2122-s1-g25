const rotationSocketWrapper = (io) => {
    const rotationSocket = io.of('/sockets/rotation');
    rotationSocket.on('connection', (socket) => {
        var roomId;
        console.log(
            `Rotation Socket: connection established from client ${socket.id}`
        );
        //join room
        socket.join("joinRoom", msg => {
            roomId = msg.room;
            rotationSocket.to(roomId).emit("new-user", `${msg.user} has joined room ${roomId}`);
            socket.join(roomId);
            return socket.emit("successfully joined room", `You have successfully joined ${roomId}`);
        })
        //boradcast the rotation message to all the ppl in the room 
        socket.on('send-rotation-message', msg => { //data will be either 1 or 0
            rotationSocket.to(roomId).emit('receive-rotation-message', msg);
        });

        return rotationSocket;
    });
};

module.exports = rotationSocketWrapper;