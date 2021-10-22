const videoSocketWrapper = (io) => {
  const videoSocket = io.of('/sockets/video');

  const users = {};
  const socketToRoom = {};

  videoSocket.on('connection', (socket) => {
    console.log(
      `Video Socket: connection established from client ${socket.id}`
    );

    socket.on('join room', (roomID) => {
      if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 2) {
          socket.emit('room full');
          return;
        }
        users[roomID].push(socket.id);
      } else {
        users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      //   const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

      const usersInThisRoom = users[roomID];

      //   socket.emit('all users', usersInThisRoom);

      if (usersInThisRoom.length == 2) {
        socket.emit(roomID, usersInThisRoom);
      }
    });

    socket.on('sending signal', (payload) => {
      console.log('User just joined: ');
      console.log(payload);
      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on('returning signal', (payload) => {
      console.log('Receiving returned signa: ' + socket.id);

      io.to(payload.callerID).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on('disconnect', () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomID] = room;
      }
    });
  });
  return videoSocket;
};

module.exports = videoSocketWrapper;
