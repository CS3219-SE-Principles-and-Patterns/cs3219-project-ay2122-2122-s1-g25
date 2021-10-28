const videoSocketWrapper = (io) => {
    const videoSocket = io.of('/sockets/video');
    videoSocket.on('connection', (socket) => {
      console.log(
        `Video Socket: connection established from client ${socket.id}`
      );
      let roomId;
      
      socket.on('joinRoom', (msg) => {
        roomId = msg.room;
        videoSocket
          .to(roomId)
          .emit('new-user', `${msg.user} has joined room ${roomId}`);

          socket.join(roomId);
          return socket.emit('successfully joined room', {
            successMsg: `You have successfully joined ${roomId} with id ${msg.userId}`,
            joinedId: msg.userId,
          });
      });
  
      socket.on('send-video-message', (msg) => {
        videoSocket.to(roomId).emit('receive-video-message', msg);
      });
  
      socket.on('callUser', (data) => {
        videoSocket.to(roomId).emit('hey', {
          signal: data.signalData,
          from: data.from,
          partnerName: data.userName,
        });
      });
  
      socket.on('acceptCall', (data) => {
        videoSocket.to(roomId).emit('callAccepted', {
          signal: data.signal,
          partnerName: data.userName,
        });
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