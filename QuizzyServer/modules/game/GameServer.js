var { Game } = require('./Game');
var { Logger } = require('../logger/Logger');

exports.GameServer = class {
    constructor(io,debug) {
        this.io = io;
        this.debug = debug;
        this.games = {};
        this.gameCount = 100;
        this.logger = new Logger(io);
    }

    listenForClients() {
        // Clients that connect here won't be in a game yet
        this.io.on('connection', (socket) => {
            
            this.logger.debug("Client Connected");

            // This event is captured when the connection is between the client and the server is dropped
            socket.on('disconnect', () => {
                this.disconnectClient(socket);
            });

            socket.on('createGame', () => {
                this.createGame(socket);
            });

            socket.on('join', (request) => {
                this.joinGame(request, socket);
            });

            // This event is captured when a client chooses to leave
            socket.on('leave', () => {
                this.disconnectClient(socket);
            });

            socket.on('validateJoin', (request) => {
                this.validateJoin(request, socket);
            });
        });
    }

    validateJoin(request, socket) {
        this.logger.debug(`${request.userName} validating join for game: ${request.gameCode}`);
        
        if (this.games[request.gameCode]) {
            this.logger.debug(`Game Code: ${request.gameCode} is Valid`);

            // The game is valid now we can validate the user name
            this.logger.debug(`Validating username: ${request.userName}`);

            if (this.games[request.gameCode].isPlayerNameInUse(request.userName)) {

                this.logger.debug("Username Is use");
                this.io.to(socket.id).emit('joinValidated', {valid: false, message: 'This username is already in use in this game'});
                return;
            }
            
            this.logger.debug("Username Is Valid, valiation succeeded");
            this.io.to(socket.id).emit('joinValidated', { valid: true, message: '' });
        }
        else {
            this.logger.debug("Gamecode is not valid");
            this.io.to(socket.id).emit('joinValidated', { valid: false, message: request.gameCode + ' Is not a valid game code' });
        }
    }

    joinGame(request, socket) {
        this.logger.debug(`${request.userName} joining game: ${request.gameCode}`);

        // Join the game room
        socket.join(request.gameCode);
        
        // Add some extra props to the socket object to make it into a player
        socket.userName = request.userName;
        socket.gameCode = request.gameCode;
        
        var game = this.games[request.gameCode];

        if (game) {
            
            game.join(request, socket.id);

            this.io.to(request.gameCode).emit('playersUpdate', game.players);
            
            this.logGameState();
        }
        else {
            this.logger.debug(`User: ${request.userName} trying to join game: ${request.gameCode} that doesn't exist`);
            this.io.to(socket.id).emit('gameError', "Trying to join game that doesn't exist");
        }
    }
    
    disconnectClient(socket) {
        this.logger.debug(`${socket.userName} disconnected from game: ${socket.gameCode}`);
        this.logGameState();

        // only try disconnecting the player if they were in a game
        if (socket.gameCode) {
            // hand off the leave call to the game they player is in
            this.games[socket.gameCode].leave(socket.userName);

            // alert the player in this game that someone left
            this.io.to(socket.gameCode).emit('playersUpdate', this.games[socket.gameCode].players);
            
            this.logGameState();
        }
    }

    createGame(socket) {
        
        var newGameCode = this.gameCount++;
        this.logger.debug(`Creating game: ${newGameCode}`);
        var newGame = new Game(newGameCode, this.io);
        this.games[newGameCode] = newGame;

        // Only notify the client who requested to game to be created
        this.io.to(socket.id).emit('gameCreated', newGameCode);

        this.logGameState();
    }

    logGameState() {
        if (this.debug) {
            for (var key in this.games) {
                this.logger.debug(`Game State for game code: ${this.games[key].gameCode}`, this.games[key].players);
            }
        }
    }
}