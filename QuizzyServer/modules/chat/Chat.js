var { Logger } = require('../logger/Logger');

exports.Chat = class {
    constructor(io) {
        this.io = io;
        this.logger = new Logger(io);
    }

    listenForMessages() {
        
        // Use (socket) => instead of function(socket) to preserve the scope of 'this'
        this.io.on('connection', (socket) => {
            this.logger.debug("Client connection received by message service");

            // message: { message: this.message, sender: this.username, gamecode: this.gamecode }
            socket.on('sendMessage', (message) => {
                this.logger.debug(`Message recieved`, message);
                this.io.to(message.gamecode).emit('chatMessage', message );
            });

        });
    }
}