exports.Logger = class {
    constructor(io) {
        this.io = io;
    }

    emitLogEvent(entry) {
        this.io.emit('log', entry);
    }


    debug(message, obj) {
        
        var logEntry = {
            time: new Date(),
            message: message,
            object: obj
        };
        
        if (obj) {
            console.log(`${logEntry.time} - ${logEntry.message} - ${JSON.stringify(obj)}`);
        }
        else {
            console.log(`${logEntry.time} - ${logEntry.message}`);
        }
        
        this.emitLogEvent(logEntry);
    }

}