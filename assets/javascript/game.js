

var hangmanDictionary = ["different"]
var tmpWord = Array.from(hangmanDictionary[Math.floor(Math.random() * hangmanDictionary.length)]);

var HangmanGame = {
	correctGuessCounter: 0,
	incorrectGuessesLeft: 0,
	winsCounter: 0,
	hangmanWord: [],
	guessedLetters: [],
	revealedWord: [],
	isGameOver: function () {
		if (this.incorrectGuessesLeft === 0 || this.correctGuessCounter === this.hangmanWord.length) {
			this.didYouWin();
			console.log(this.correctGuessCounter + "correct guesses");
			console.log(this.hangmanWord.length + " length of word");
			return true;
		}
		else {
			return false;
		}
	},
	didYouWin: function () {
		if (this.correctGuessCounter === this.hangmanWord.length) {
			this.winsCounter++;
			return true;
		}
		else {
			return false;
		}
	},
	isGuessCorrect: function (guess) {
		if (this.hangmanWord.includes(guess)) {
			return true;
		}
		else {
			return false;
		}
	},
	reveal: function (guess) {
		for (var i = 0; i < this.revealedWord.length; i++) {
			if (this.hangmanWord[i] === guess) {
				this.revealedWord[i] = guess;
			}
			else { };
		}
	},
	submitGuess: function (guess) {
		if (!this.guessedLetters.includes(guess)) {
			this.guessedLetters.push(guess);
			if (this.isGuessCorrect(guess)) {
				this.correctGuessCounter++;
				this.reveal(guess);
			}
			else {
				this.incorrectGuessesLeft--;
			}
			return true;
		}
		else {
			return false;
		}
	},
	initializeGame: function (tmpWord) {
		this.correctGuessCounter = 0;
		this.incorrectGuessesLeft = 6;
		this.hangmanWord = tmpWord;
		this.guessedLetters = [];
		this.revealedWord = Array(tmpWord.length).fill(" ");
	}
}
var drawScreen = {
	spanList: [],

	showWins: function () {
		document.getElementById("numberOfWins").textContent = "You've won " + HangmanGame.winsCounter + " games";
	},

	showEnd: function () {
		if (HangmanGame.isGameOver()) {
			console.log("show ends condition " + HangmanGame.isGameOver());
			if (!HangmanGame.didYouWin()) {
				document.getElementById("Lose").textContent = "You lose!";
			}
			else {
				document.getElementById("Lose").textContent = "You've won the game!";
			};
		}
		else {
			document.getElementById("Lose").textContent = "";
		}

	},
	initDisplay: function () {
		parent = document.getElementById("hangmanWord");
		while (parent.hasChildNodes()) {
			parent.removeChild(parent.childNodes[0]);
		}

		this.spanList = [];

		for (var i = 0; i < HangmanGame.revealedWord.length; i++) {
			var blank = document.createElement("span");
			this.spanList.push(blank)
			document.getElementById("hangmanWord").appendChild(blank);
			blank.textContent = " _ ";
		}
	},

	drawWord: function () {
		for (var i = 0; i < HangmanGame.revealedWord.length; i++) {
			blank = this.spanList[i];
			if (HangmanGame.revealedWord[i] === " ") {
				blank.textContent = " _ ";
			}
			else {
				blank.textContent = HangmanGame.revealedWord[i];

			}

		}
	},
	showGuesses: function () {
		document.getElementById("previousGuesses").textContent = "You've guessed " + HangmanGame.guessedLetters + " letters";
	},
	guessesLeft: function () {
		document.getElementById("guessesLeft").textContent = "You have " + HangmanGame.incorrectGuessesLeft + "left";
	},
	displayGame: function () {
		this.showWins();
		this.showGuesses();
		this.showEnd();
		this.drawWord();
		this.guessesLeft();

	}
}

console.log(HangmanGame.hangmanWord);

function setUpGame() {
	HangmanGame.initializeGame(tmpWord);

	drawScreen.initDisplay();
	drawScreen.displayGame();
}
function playGame(guess) {
	if (!HangmanGame.isGameOver()) {
		HangmanGame.submitGuess(guess);
		drawScreen.displayGame();


	}
	else {
		setUpGame();

	}
}
setUpGame();
document.onkeyup = function (event) {
	// Determines which key was pressed.
	var guess = event.key;
	playGame(guess);
}
