var request = require('request');

var { Player } = require('./Player');
var { Logger } = require('../logger/Logger');

exports.Game = class {
    
    constructor(gameCode, io, url) {
        this.gameCode = gameCode;
        this.io = io;
        this.players = {};
        this.logger = new Logger(io);
        this.questions = [];
        this.fetchQuestion(url);
    }

    // fetchQuestion(url) {
    //     request(url, (error, response, body) => {
    //         if (!error && response.statusCode == 200) {
    //             var trivia = JSON.parse(body);
    //             this.logger.debug(`Call to the api ${url} responded with 200`, trivia);
    //             this.questions = trivia.results;
    //         }
    //         else {
    //             this.logger.debug(`The api ${url} question call failed with status code ${response.statusCode}`, error);
    //             throw new Error(`Api request responded with ${response.statusCode}`);
    //         }
    //     });
    // }

    fetchQuestion(url) {
        this.questions = JSON.parse(`{"response_code":0,"results":[{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"In which African country was the 2006 film &#039;Blood Diamond&#039; mostly set in?","correct_answer":"Sierra Leone","incorrect_answers":["Liberia","Burkina Faso","Central African Republic"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"Which Russian oblast forms a border with Poland?","correct_answer":"Kaliningrad","incorrect_answers":["Samara","Nizhny Novgorod","Omsk"]},{"category":"Entertainment: Music","type":"boolean","difficulty":"medium","question":"Ashley Frangipane performs under the stage name Halsey.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Television","type":"multiple","difficulty":"easy","question":"In the show Stranger Things, what is Eleven&#039;s favorite breakfast food?","correct_answer":"Eggo Waffles","incorrect_answers":["Toast","Captain Crunch","Bacon and Eggs"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"Which coding language was the #1 programming language in terms of usage on GitHub in 2015?","correct_answer":"JavaScript","incorrect_answers":["C#","Python","PHP"]},{"category":"History","type":"multiple","difficulty":"easy","question":"Who was the Prime Minister of Japan when Japan declared war on the US?","correct_answer":"Hideki Tojo","incorrect_answers":["Michinomiya Hirohito","Isoroku Yamamoto","Fumimaro Konoe"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"medium","question":"This trope refers to minor characters that are killed off to show how a monster works.","correct_answer":"Red Shirt","incorrect_answers":["Minions","Expendables","Cannon Fodder"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"In the Pok&eacute;mon series, what is Palkia&#039;s hidden ability?","correct_answer":"Telepathy","incorrect_answers":["Pressure","Water Bubble","Hydration"]},{"category":"Entertainment: Television","type":"multiple","difficulty":"medium","question":"How many seasons did the TV show &quot;Donkey Kong Country&quot; last?","correct_answer":"2","incorrect_answers":["1","4","5"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"medium","question":"Which game is NOT part of the Science Adventure series by 5pb. and Nitroplus?","correct_answer":"Occultic; Nine","incorrect_answers":["Steins; Gate","Robotics; Notes","Chaos; Child"]}]}`).results;
    }

    setPlayerReady(ready, userName) {
        this.logger.debug(`Setting player: ${userName} to ready: ${ready}`);
        this.players[userName].ready = ready;
    }

    updateScore(userName) {
        this.logger.debug(`Incrimenting player: ${userName} by one`);
        this.players[userName].score++;
        this.logger.debug(`PLayer ${userName} now has score of ${this.players[userName].score}`);
    }

    getNextQuestion(userName) {
        this.logger.debug(`Sending nexy question to player ${userName}`);
        return getQuestion(this.players[userName].questionNumber);
    }

    getQuestion(questionNumber) {
        this.logger.debug(`Getting question ${questionNumber}`, this.questions[questionNumber]);
        return this.questions[questionNumber];
    }

    join(request, socketId) {
        this.logger.debug(`Player: ${request.userName} joining game: ${this.gameCode} with socket id: ${socketId}`);
        this.players[request.userName] = new Player(request.userName, request.gameCode, socketId);
    }

    leave(userName) {
        this.logger.debug(`Player: ${userName} leaving game: ${this.gameCode}`);
        delete this.players[userName];
    }

    isPlayerNameInUse(name) {
        this.logger.debug(`Checking if player name: ${name} is in use in game: ${this.gameCode}`);
        return Object.keys(this.players).some(p => this.players[p].userName == name);
    }

    toString() {
        return this.players.map(m => {
            return m.userName;
        }).join();
    }
}