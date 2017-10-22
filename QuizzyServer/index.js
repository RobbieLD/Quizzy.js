// TODO: Refactor this file and make it look like a real node project
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// TODO: Make this into a class
// global vars
var games = {};

app.get('/', function(req, res){
  res.send('This is the Quizzy Server');
});

io.on('connection', function(socket){
    
    console.log("Client Connected");
    console.log("Players: " + JSON.stringify(games));

    socket.on('disconnect', function(){

        console.log("Client " + socket.username + " disconnected from game: " + socket.code);
        
        // only update the players list if the player join a game
        if (socket.username) {
            games[socket.code] = games[socket.code].filter(p => p.name != socket.username);
            
            io.emit('playersUpdate', games[socket.code]);
            
            console.log("Players: " + JSON.stringify(games));
        }
    });

    socket.on('leave', function(req) {
        console.log("Player " + req.name + " left game: " + req.code);
        // only let the player leave the game if they are actually in there
        if (games[req.code]) {
            games[req.code] = games[req.code].filter(p => p.name != socket.username);
        
            io.emit('playersUpdate', games[req.code]);
            console.log("Players: " + JSON.stringify(games));
        }
    });

    socket.on('sendMessage', function(message) {
        console.log("Message recieved: " + JSON.stringify(message));
        io.emit('chatMessage', message );
    });

    socket.on('validateJoin', function(req) {
        console.log("Validatiing game code: " + req.code);

        if (games[req.code]) {
            console.log("Game Code is Valid");

            // The game is valid now we can validate the user name
            console.log("Validating username: " + req.name);
            if (games[req.code].includes(req.name)) {
                io.emit('joinValidated', {valid: false, message: 'This username is already in use in this game'});
                return;
            }
            
            io.emit('joinValidated', { valid: true, message: '' });
        }
        else {
            console.log("Game code is not valid");
            io.emit('joinValidated', { valid: false, message: req.code + ' Is not a valid game code' });
        }
    });

    socket.on('createGame', function() {
        console.log("Creating Game");
        var code = Object.keys(games).length + 1;
        if (isNaN(code)) {
            code = 1;
        }

        games[code] = [];
        console.log("created Game: " + code);
        io.emit('gameCreated', code);
    });

    // hook up the join event
    socket.on('join', function(req) {
        console.log("Player " + req.name + " joined game: " + req.code);
        socket.username = req.name;
        socket.code = req.code;

        if (games[req.code]) {
            games[req.code].push({ name: req.name });

            io.emit('playersUpdate', games[req.code]);
            console.log("Players: " + JSON.stringify(games));
        }
        else {
            console.log("User trying to join game that doesn't exist yet");
            io.emit('gameError', "Trying to join game that doesn't exist");
        }
    });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});