const videoSocketWrapper = (io) => {
  const videoSocket = io.of('/sockets/video');
  videoSocket.on('connection', (socket) => {
    console.log(
      `Video Socket: connection established from client ${socket.id}`
    );
    let roomId;

    socket.on('joinRoom', (msg) => {
      const { roomId, userId } = msg;
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId);
    });

    socket.on('disconnect', () => {
      videoSocket
        .to(roomId)
        .emit('user-disconnected', `Your partner has disconnected`);
    });
  });
  return videoSocket;
};

module.exports = videoSocketWrapper;
