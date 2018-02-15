
var hangmanWordLength;
var hangmanDictionary = ["word", "different", "hello", "world"]

// function HangmanGame(dictionary) {
// 	this.correctGuessCounter = 0;
// 	this.incorrectGuessesLeft = 6;
// 	this.hangmanWord = dictionary[Math.floor(Math.random() * dictionary.length)];
// };
var HangmanGame = {
	correctGuessCounter: 0,
	incorrectGuessesLeft: 6,
	hangmanWord: Array.from(hangmanDictionary[Math.floor(Math.random() * hangmanDictionary.length)]),
	guessedLetters: [],
	isGameOver: function () {
		if (this.incorrectGuessesLeft === 0 || this.correctGuessCounter === this.hangmanWord.length) {
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
	submitGuess: function (guess) {
		if (!this.guessedLetters.includes(guess)) {
			if (this.isGuessCorrect(guess)) {
				this.correctGuessCounter++;
				this.guessedLetters.push(guess);
			}
			else {
				this.incorrectGuessesLeft--;
			}
			return true;
		}
		else {
			return false;
		}
	}
}
console.log(HangmanGame.submitGuess('r'));
console.log(HangmanGame.hangmanWord);
