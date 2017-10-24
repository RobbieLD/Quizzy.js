exports.Chat = class {
    constructor(io) {
        this.io = io;
    }

    listenForMessages() {
        
        // Use (socket) => instead of function(socket) to preserve the scope of 'this'
        this.io.on('connection', (socket) => {
            console.log("Chat - listenForMessages - Client connection received by message service");

            // message: { message: this.message, sender: this.username, gamecode: this.gamecode }
            socket.on('sendMessage', (message) => {
                console.log("Chat - listenForMessages - Message recieved: " + JSON.stringify(message));
                this.io.to(message.gamecode).emit('chatMessage', message );
            });

        });
    }
}