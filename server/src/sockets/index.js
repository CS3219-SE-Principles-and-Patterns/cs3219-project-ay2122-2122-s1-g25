const socketDriver = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://upskilltoday.org'],
        },
    });

    // Import individual socket wrapper implementations
    require('./rotation')(io);
    require('./chat')(io);
    require('./code')(io)
    return io;
};

module.exports = socketDriver;