var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Pull in the custom classes using the new ES6 syntax
var { Chat } = require('./modules/chat/Chat');
var { GameServer } = require('./modules/game/GameServer')

// some config
const numberOfQuestions = 10;

// Start listening for chat messages
new Chat(io).listenForMessages();

// Start listening for game connections
new GameServer(io, true, "https://opentdb.com/api.php?amount=" + numberOfQuestions).listenForClients();

// The default hander for the http connection
app.get('/', function(req, res){
  res.send('This is the Quizzy Server');
});

// default listner for the socket
http.listen(3000, function(){
    console.log('Index - Main - listening on *:3000');
});




