const socketDriver = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            // TODO: add back CORS whitelist
            // origin: ['http://localhost:3000', 'https://upskilltoday.org'],
            origin: '*',
        },
    });

    // Import individual socket wrapper implementations
    require('./rotation')(io);
    require('./chat')(io);
    require('./video')(io);
    return io;
};

module.exports = socketDriver;