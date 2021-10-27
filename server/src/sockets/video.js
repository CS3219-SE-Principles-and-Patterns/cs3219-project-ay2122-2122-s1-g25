const videoSocketWrapper = (io) => {
  const videoSocket = io.of('/sockets/video');

  videoSocket.on('connection', (socket) => {
    console.log(
      `Video Socket: connection established from client ${socket.id}`
    );

    let roomId;
    let users = [];

    socket.on('joinRoom', (msg) => {
      roomId = msg.room;
      videoSocket
        .to(roomId)
        .emit('new-user', `${msg.user} has joined room ${roomId}`);
      console.log(users);
      if (!users.includes(msg.userId)) {
        users.push(msg.userId);

        socket.join(roomId);
        return socket.emit('successfully joined room', {
          successMsg: `You have successfully joined ${roomId} with id ${msg.userId}`,
          joinedId: msg.userId,
        });
      } else {
        console.log(users);
        console.log(msg.userId);
        return socket.emit('the room is full', {
          msg: 'The Room is Full',
        });
      }
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
      users = [];
    });

    socket.on('acceptCall', (data) => {
      videoSocket.to(roomId).emit('callAccepted', {
        signal: data.signal,
        partnerName: data.userName,
      });
      users = [];
    });

    socket.on('disconnect', () => {
      users = [];
      videoSocket
        .to(roomId)
        .emit('user-disconnected', `Your partner has disconnected`);
    });
  });
  return videoSocket;
};

module.exports = videoSocketWrapper;

// const videoSocketWrapper = (io) => {
//   const videoSocket = io.of('/sockets/video');

//   const users = {};
//   const socketToRoom = {};

//   videoSocket.on('connection', (socket) => {
//     console.log(
//       `Video Socket: connection established from client ${socket.id}`
//     );

//     socket.on('join room', (roomID) => {
//       if (users[roomID]) {
//         const length = users[roomID].length;
//         if (length === 2) {
//           socket.emit('room full');
//           return;
//         }
//         users[roomID].push(socket.id);
//       } else {
//         users[roomID] = [socket.id];
//       }
//       socketToRoom[socket.id] = roomID;
//       //   const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

//       const usersInThisRoom = users[roomID];

//       //   socket.emit('all users', usersInThisRoom);

//       if (usersInThisRoom.length == 2) {
//         socket.emit(roomID, usersInThisRoom);
//       }
//     });

// socket.on('sending signal', (payload) => {
//   console.log('User just joined: ');
//   console.log(payload);
//   io.to(payload.userToSignal).emit('user joined', {
//     signal: payload.signal,
//     callerID: payload.callerID,
//   });
// });

// socket.on('returning signal', (payload) => {
//   console.log('Receiving returned signa: ' + socket.id);

//   io.to(payload.callerID).emit('receiving returned signal', {
//     signal: payload.signal,
//     id: socket.id,
//   });
// });

//     socket.on('disconnect', () => {
//       const roomID = socketToRoom[socket.id];
//       let room = users[roomID];
//       if (room) {
//         room = room.filter((id) => id !== socket.id);
//         users[roomID] = room;
//       }
//     });
//   });
//   return videoSocket;
// };

// module.exports = videoSocketWrapper;
