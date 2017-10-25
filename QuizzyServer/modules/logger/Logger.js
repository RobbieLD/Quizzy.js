exports.Logger = class {
    constructor(io) {
        this.io = io;
    }

    emitLogEvent(entry) {
        this.io.emit('log', entry);
    }


    debug(message) {
        
        var logEntry = {
            time: new Date(),
            message: message
        };
        
        console.log(`${logEntry.time} - ${logEntry.message}`);
        this.emitLogEvent(logEntry);
    }

}