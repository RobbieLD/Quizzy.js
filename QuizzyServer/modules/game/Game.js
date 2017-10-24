var { Player } = require('./Player');

exports.Game = class {
    
    constructor(gameCode, io) {
        this.gameCode = gameCode;
        this.io = io;
        // an array of sockets (plus some extra props) in this game
        this.players = [];

    }

    join(request, socketId) {
        console.log("Game - join - Player: " + request.userName + " joining game: " + this.gameCode + " with socket id:" + socketId);
        this.players.push(new Player(request.userName, request.gameCode, socketId));
    }

    leave(userName) {
        console.log("Game - leave - Player: " + userName + " leaving game: " + this.gameCode);
        this.players = this.players.filter(p => p.userName != userName);
    }

    isPlayerNameInUse(name) {
        return this.players.some(p => p.userName == name);
    }

    toString() {
        return this.players.map(m => {
            return m.userName;
        }).join();
    }
}