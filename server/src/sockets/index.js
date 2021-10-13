const socketDriver = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    });

    // Import individual socket wrapper implementations
    // require('./rotation')(io);
    require('./chat')(io);

    return io;
};

module.exports = socketDriver;