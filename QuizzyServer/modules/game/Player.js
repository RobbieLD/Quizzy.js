exports.Player = class {
    constructor(userName, gameCode, socketId) {
        this.userName = userName;
        this.gameCode = gameCode;
        this.socketId = socketId;
    }
}