var { Player } = require('./Player');
var { Logger } = require('../logger/Logger');

exports.Game = class {
    
    constructor(gameCode, io) {
        this.gameCode = gameCode;
        this.io = io;
        this.players = [];
        this.logger = new Logger(io);
    }

    join(request, socketId) {
        this.logger.debug(`Player: ${request.userName} joining game: ${this.gameCode} with socket id: ${socketId}`);
        this.players.push(new Player(request.userName, request.gameCode, socketId));
    }

    leave(userName) {
        this.logger.debug(`Player: ${userName} leaving game: ${this.gameCode}`);
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