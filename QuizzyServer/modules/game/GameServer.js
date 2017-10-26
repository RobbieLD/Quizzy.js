var { Game } = require('./Game');
var { Logger } = require('../logger/Logger');

exports.GameServer = class {
    constructor(io,debug, url) {
        this.io = io;
        this.debug = debug;
        this.games = {};
        this.gameCount = 100;
        this.logger = new Logger(io);
        this.triviaUrl = url;
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

            socket.on('nextQuestion', () => {
                this.nextQuestion(socket);
            });

            socket.on('questionAnswered', (correct) => {
                this.questionAnswered(correct, socket);
            });

            socket.on('readyUpdate', (ready) => {
                this.readyUpdate(ready, socket);
            });
        });
    }

    readyUpdate(ready, socket) {
        var game = this.games[socket.gameCode];
        game.setPlayerReady(ready, socket.userName);
        this.io.to(socket.gameCode).emit('playersUpdate', game.players);
    }

    questionAnswered(correct, socket) {
        var game = this.games[socket.gameCode];
        game.updateScore(correct, socket.userName);
        // do the player update
        this.io.to(socket.gameCode).emit('playersUpdate', game.players);
    }

    nextQuestion(socket) {
        var game = this.games[socket.gameCode];
        var question = game.getNextQuestion(socket.userName);
        this.logger.debug(`Next question for ${socket.userName}`, question);
        this.io.to(socket.gameCode).emit('playersUpdate', game.players);
        // send the question to the user who requested it
        this.io.to(socket.id).emit('advanceQuestion', question);
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

    findEmptyGame() {
        for(var game in this.games) {
            if (this.games[game].players.length == 0) {
                return game;
            }
        }
    }

    createGame(socket) {

        // To prevent there being loads of games created with no one in them
        // we check here to see if there's any empty game we can use instead of 
        // making a new one
        var newGame = this.findEmptyGame();

        if (!newGame) {
            
            var newGameCode = this.gameCount++;

            try {
                newGame = new Game(newGameCode, this.io, this.triviaUrl);
            }
            catch (ex) {
                // Report the error back to the clients 
                this.io.to(socket.id).emit('gameError', `Error getting trivia ${ex.message}`);
                return;
            }
            
            this.logger.debug(`Creating game: ${newGameCode}`);
            this.games[newGameCode] = newGame;
            
            // Only notify the client who requested to game to be created
            this.io.to(socket.id).emit('gameCreated', newGameCode);
        }
        else {
            this.logger.debug(`Reusing game: ${newGame.gameCode}`);
            
            // Only notify the client who requested to game to be created
            this.io.to(socket.id).emit('gameCreated', newGame.gameCode);
        }

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