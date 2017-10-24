exports.Game = class {
    
    constructor(gameCode, io) {
        this.gameCode = gameCode;
        this.io = io;
        // an array of sockets (plus some extra props) in this game
        this.players = [];

    }

    join(player) {
        console.log("Game - join - Player: " + player.userName + " joining game: " + this.gameCode);
        this.players.push(player);
    }

    leave(player) {
        console.log("Game - leave - Player: " + player.userName + " leaving game: " + this.gameCode);
        this.players = this.players.filter(p => p.userName != player.userName);
        player.gameCode ='';
        player.userName = '';
    }

    isPlayerNameInUse(name) {
        // TODO: This
        return false;
    }

    toString() {
        return this.players.join();
    }
}