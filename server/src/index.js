const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const userRoutes = require('./routes/users')
const questionRoutes = require('./routes/questions')
const userMatchingRoutes = require('./routes/userMatching')
const interviewSessionRoutes = require('./routes/interviewSession')
const rotationRoutes = require('./routes/rotation')
const feedbackRoutes = require('./routes/feedback')

const { verifyLogin } = require('./middleware/auth');
const { errorHandler, notFound } = require('./middleware/middleware');

const socketDriver = require('./sockets')
socketDriver(server)

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    data: 'Welcome! Let\'s Upskill now!',
  });
});
app.use('/api/users', verifyLogin, userRoutes)
app.use('/api/questions', verifyLogin, questionRoutes);
app.use('/api/matching', verifyLogin, userMatchingRoutes);
app.use('/api/interview', verifyLogin, interviewSessionRoutes);
app.use('/api/rotation', verifyLogin, rotationRoutes);
app.use('/api/feedback', verifyLogin, feedbackRoutes);

app.use(notFound);
app.use(errorHandler);
