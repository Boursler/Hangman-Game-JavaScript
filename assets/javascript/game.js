

var hangmanDictionary = ["loyalist", "tea", "harbor", "tory", "thirteen", "declaration", "independence", "happiness", "jacobin", "colony", "representation", "massacre", "guerilla", "constitution", "townshend", "intolerable", "proclamation", "federalist", "institute", "abolish"];

var HangmanGame = {
	//set properties of HangmanGame object
	incorrectGuessesLeft: 0,
	winsCounter: 0,
	hangmanWord: [],
	guessedLetters: [],
	revealedWord: [],
	totalNumbersRevealed: 0,
	//begin list of HangmanGame metods
	//check if Game is Over
	isGameOver: function () {
		if (this.incorrectGuessesLeft === 0 || this.totalNumbersRevealed === this.hangmanWord.length) {
			//check if player won
			this.didYouWin();
			return true;
		}
		else {
			return false;
		}
	},
	//check if player won
	didYouWin: function () {
		if (this.totalNumbersRevealed === this.hangmanWord.length) {

			return true;
		}
		else {
			return false;
		}
	},
	//check if submitted guess is correct
	isGuessCorrect: function (guess) {
		if (this.hangmanWord.includes(guess)) {
			return true;
		}
		else {
			return false;
		}
	},
	//if a guess is correct, add it to the revealed word at the desired index
	//returns number of letters revealed by each check
	reveal: function (guess) {
		var revealedLetters = 0;
		for (var i = 0; i < this.revealedWord.length; i++) {

			if (this.hangmanWord[i] === guess) {
				this.revealedWord[i] = guess;
				revealedLetters++;
				console.log("revaled letters " + revealedLetters);
			}
			else { };
		}
		return revealedLetters;
	},
	//submit a user guess to the game: check if guess is correct, add
	submitGuess: function (guess) {

		if (!this.guessedLetters.includes(guess)) {
			this.guessedLetters.push(guess);
			if (this.isGuessCorrect(guess)) {

				// this.reveal(guess);
				this.totalNumbersRevealed += this.reveal(guess);
				console.log("totalNumbers revealed" + this.totalNumbersRevealed);
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
		this.incorrectGuessesLeft = 6;
		this.hangmanWord = tmpWord;
		this.guessedLetters = [];
		this.revealedWord = Array(tmpWord.length).fill(" ");
		this.totalNumbersRevealed = 0;
	}
}
var drawScreen = {
	spanList: [],
	winSound: document.createElement("audio"),
	showWins: function () {
		document.getElementById("numberOfWins").textContent = "You've won " + HangmanGame.winsCounter + " games";
	},

	showEnd: function () {
		if (HangmanGame.isGameOver()) {
			console.log("show ends condition " + HangmanGame.isGameOver());
			document.getElementById("submitId").textContent = "Type the Any key to continue";
			if (!HangmanGame.didYouWin()) {
				document.getElementById("Lose").textContent = "You lose!";
				document.getElementById("hangmanWord").textContent = HangmanGame.hangmanWord.join("");
			}
			else {
				document.getElementById("Lose").textContent = "You've won the game!";

				this.winSound.setAttribute("src", "assets/images/old-fashioned-school-bell-daniel_simon.mp3");
				this.winSound.play();
			}

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
		this.winSound.pause();
		document.getElementById("submitId").textContent = "Submit a guess by typing in a letter!";
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
		var list = "  ";
		for (var i = 0; i < HangmanGame.guessedLetters.length; i++) {
			list += " " + HangmanGame.guessedLetters[i].toString() + " ";
		}
		document.getElementById("previousGuesses").textContent = "Previously guessed:  \n" + list;


	},
	guessesLeft: function () {
		document.getElementById("guessesLeft").textContent = "You have " + HangmanGame.incorrectGuessesLeft + " guesses left";
	},
	currentGuess: function (guess) {
		var youGuess = document.getElementById("youGuessed")
		youGuess.textContent = guess;
		youGuess.setAttribute("style", "font-size: 3em;");
	},
	displayGame: function (guess) {
		this.showWins();
		this.showGuesses();
		this.showEnd();
		this.drawWord();
		this.guessesLeft();
		this.currentGuess(guess);

	}
}

console.log(HangmanGame.hangmanWord);

function setUpGame() {
	var tmpWord = Array.from(hangmanDictionary[Math.floor(Math.random() * hangmanDictionary.length)]);

	HangmanGame.initializeGame(tmpWord);
	drawScreen.initDisplay();
	drawScreen.displayGame();
}
function playGame(guess) {
	if (!HangmanGame.isGameOver()) {
		HangmanGame.submitGuess(guess);
		drawScreen.displayGame(guess);


	}
	else {
		if (HangmanGame.didYouWin()) {
			HangmanGame.winsCounter++
		}
		setUpGame();

	}
}
setUpGame();
document.onkeyup = function (event) {
	// Determines which key was pressed.
	var guess = event.key.toLowerCase();
	if (('a' <= guess && guess <= 'z') && guess.length === 1) {
		playGame(guess);
	}
	else {

	}
}
