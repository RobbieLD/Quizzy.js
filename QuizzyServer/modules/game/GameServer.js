var { Game } = require('./modules/game/Game');

exports.GameServer = class {
    constructor(io,debug) {
        this.io = io;
        this.debug = debug;
        this.games = {};
    }

    listenForClients() {
        // Clients that connect here won't be in a game yet
        this.io.on('connection', (socket) => {
            
            console.log("GameServer - listenForClients - Client Connected");

            // This event is captured when the connection is between the client and the server is dropped
            socket.on('disconnect', () => {
                disconnectClient(socket);
            });

            socket.on('creatGame', () => {
                createGame(socket);
            });

            socket.on('join', (request) => {
                joinGame(request, socket);
            });

            // This event is captured when a client chooses to leave
            socket.on('leave', () => {
                disconnectClient(socket);
            });

            socket.on('validateJoin', (request) => {
                validateJoin(request, socket);
            });
        });
    }

    validateJoin(request, socket) {
        console.log("GameServer - validateJoin - " + request.userName + " validating join for game: " + request.gameCode);
        
        if (this.games[request.gameCode]) {
            console.log("GameServer - validateJoin - Game Code: " + request.gameCode + " is Valid");

            // The game is valid now we can validate the user name
            console.log("GameServer - validateJoin - Validating username: " + request.userName);

            if (this.games[request.gameCode].isPlayerNameInUse(request.userName)) {

                console.log("GameServer - validateJoin - Username Is use");
                this.io.to(socket.id).emit('joinValidated', {valid: false, message: 'This username is already in use in this game'});
                return;
            }
            
            console.log("GameServer - validateJoin - Username Is Valid, valiation succeeded");
            this.io.to(socket.id).emit('joinValidated', { valid: true, message: '' });
        }
        else {
            console.log("GameServer - validateJoin - Gamecode is not valid");
            io.to(socket.id).emit('joinValidated', { valid: false, message: req.code + ' Is not a valid game code' });
        }
    }

    joinGame(request, socket) {
        console.log("GameServer - joinGame - " + request.userName + " joining game: " + request.gameCode);

        // Join the game room
        socket.join(request.gameCode);
        
        // Add some extra props to the socket object to make it into a player
        socket.userName = request.userName;
        socket.gameCode = request.gameCode;
        
        var game = this.games[request.gameCode];

        if (game) {
            // from here on in the socket is now the player (in the game)
            game.join(socket);

            io.to(request.gameCode).emit('playersUpdate', game.players);
            
            logGameState();
        }
        else {
            console.log("GameServer - joinGame - User:" + request.userName + " trying to join game: " + request.gameCode + " that doesn't exist");
            io.to(socket.id).emit('gameError', "Trying to join game that doesn't exist");
        }
    }
    
    disconnectClient(socket) {
        console.log("GameServer - disconnectClient - " + socket.userName + " disconnected from game: " + socket.gameCode);
        logGameState();

        // only try disconnecting the player if they were in a game
        if (socket.gameCode) {
            // hand off the leave call to the game they player is in
            this.games[socket.gameCode].leave(socket);

            // alert the player in this game that someone left
            this.io.to(socket.gameCode).emit('playersUpdate', this.games[socket.gameCode]);

            logGameState();
        }
    }

    createGame(socket) {
        var newGameCode = this.games.length + 1;
        console.log("GameServer - createGame - creating game: " + newGameCode);
        var newGame = new Game(newGameCode, this.io);
        this.games[newGameCode] = newGame;

        // Only notify the client who requested to game to be created
        this.io.to(socket.id).emit('gameCreated', newGameCode);

        logGameState();
    }

    logGameState() {
        if (this.debug) {
            for (var key in this.games) {
                console.log("GameServer - logGameState - " + this.games[key].toString());
            }
        }
    }
}