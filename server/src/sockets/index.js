const socketDriver = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    });

    require('./rotation')(io);
    require('./chat')(io);
    require('./video')(io);
    return io;
};

module.exports = socketDriver;