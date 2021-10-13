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
const userRoutes = require('./routes/users')
const userMatchingRoutes = require('./routes/userMatching')
const interviewSessionRoutes = require('./routes/interviewSession')
const rotationRoutes = require('./routes/rotation')
const feedbackRoutes = require('./routes/feedback')

//Websocket imports
const socketDriver = require('./sockets')
socketDriver(server)

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

app.use(notFound);
app.use(errorHandler);

