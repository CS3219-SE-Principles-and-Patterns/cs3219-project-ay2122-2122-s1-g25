const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { errorHandler, notFound } = require('./middleware/middleware');
const userRoutes = require('./routes/users')
const userMatchingRoutes = require('./routes/userMatching')
const interviewSessionRoutes = require('./routes/interviewSession')
const rotationRoutes = require('./routes/rotation')
const feedbackRoutes = require('./routes/feedback')

const PORT = process.env.PORT || 4000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    data: 'Welcome! Let\'s Upskill now!',
  });
});
app.use('/api/users', userRoutes)
app.use('/api/matching', userMatchingRoutes);
app.use('/api/interview', interviewSessionRoutes);
app.use('/api/rotation', rotationRoutes);
app.use('/api/feedback', feedbackRoutes);

//socket
const chatNamespace = io.of("/sockets/chat");

chatNamespace.on("connection", socket => {
  socket.emit("welcome", "Welcome to the chat!")
  console.log("New client connected");
  //join room
  socket.on("joinRoom", room => {
    socket.join(room);
    chatNamespace.to(room).emit("newUser", `New Player has joined room ${room}`);
    return socket.emit("success", `You have successfully joined ${room}`);
  })
  //broadcast to all the ppl in the room the chat message
  socket.on('send-chat-message', msg => {
    chatNamespace.in(msg.roomId).emit('chat-message', msg)
  })
})

app.use(notFound);
app.use(errorHandler);

