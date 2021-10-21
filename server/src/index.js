const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { errorHandler, notFound } = require('./middleware/middleware');

//Server imports
const PORT = process.env.PORT || 4000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// Route imports
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
const userMatchingRoutes = require('./routes/userMatching');
const interviewSessionRoutes = require('./routes/interviewSession');
const rotationRoutes = require('./routes/rotation');
const feedbackRoutes = require('./routes/feedback');

//Websocket imports
const socketDriver = require('./sockets');
socketDriver(server);

// Socket.io imports
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

app.use(cors());

// CORS settings
const corsWhitelist = ['http://localhost:3000', 'https://upskilltoday.org'];
const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    data: "Welcome! Let's Upskill now!",
  });
});
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/matching', userMatchingRoutes);
app.use('/api/interview', interviewSessionRoutes);
app.use('/api/rotation', rotationRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(notFound);
app.use(errorHandler);

// io.on('connection', (socket) => {
//   socket.emit('me', socket.id);

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('callended');
//   });

//   socket.on('calluser', ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit('calluser', { signal: signalData, from, name });
//   });

//   socket.on('answercall', (data) => {
//     io.to(data.to).emit('callaccepted', data.signal);
//   });
// });
