exports.Player = class {
    constructor(userName, gameCode, socketId) {
        this.userName = userName;
        this.gameCode = gameCode;
        this.socketId = socketId;
        this.score = 0;
        this.questionNumber = 0;
        this.status = 'Waiting for game to start'
    }
}