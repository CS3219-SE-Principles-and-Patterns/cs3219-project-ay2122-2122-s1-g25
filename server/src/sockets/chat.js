const chatSocketWrapper = (io) => {
    const chatSocket = io.of('/sockets/chat');
    chatSocket.on("connection", socket => {
        console.log("New client connected");
        var roomId;
        //join room
        socket.on("joinRoom", msg => {
            roomId = msg.room;
            chatSocket.to(roomId).emit("new-user", `${msg.user} has joined room ${roomId}`);
            socket.join(roomId);
            return socket.emit("successfully joined room", `You have successfully joined ${roomId}`);
        })
        //broadcast the chat message to all the ppl in the room
        socket.on('send-chat-message', msg => {
            chatSocket.to(roomId).emit('receive-chat-message', msg)
        })
        //exiting the room
        socket.on("disconnect", () => {
            chatSocket.to(roomId).emit("user-disconnected", `Your partner has disconnected`)
        });
    })
    return chatSocket;
};

module.exports = chatSocketWrapper;
