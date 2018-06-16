var Coin = require('./coin.js');
var Furry = require('./furry.js');

var Game = function () {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        this.furryClass = document.querySelector('.furry');
        this.furryClass.classList.remove('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.moveFurry = function () {
        this.hideVisibleFurry();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }

        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');

            this.newScore = document.querySelector('#score strong');
            this.newScore.innerText = this.score;

            this.score++;
            this.newScore.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.over = document.querySelector('#over');
            this.over.classList.remove("invisible");
            var over = document.querySelector('#over');
            var endOfGame = document.createElement('div');
            var endScore = document.createElement('div');
            over.appendChild(endOfGame);
            over.appendChild(endScore);
            over.style.display = 'flex';
            over.style.justifyContent = 'center';
            over.style.alignItems = 'center';
            over.style.flexDirection = 'column';
            endOfGame.style.color = "darkgreen";
            endOfGame.style.fontSize = '80px';
            endOfGame.style.fontWeight = 'bold';
            endScore.style.color = "white";
            endScore.style.fontSize = '40px';
            endOfGame.innerText = 'GAME OVER!:( Try again!';
            endScore.innerText = 'You got ' + this.score + ' points';
            this.hideVisibleFurry();

        }
    };

    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
};
module.exports = Game;