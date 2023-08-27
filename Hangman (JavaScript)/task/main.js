const input = require('sync-input');

const words = ['python', 'java', 'swift', 'javascript']


let isOn = true
let results = {
    nrOfWins: 0, nrOfLost: 0
}

console.log("H A N G M A N")
while (isOn) {
    let userOption = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:');
    switch (userOption) {
        case 'play':
            playGame()
            break;
        case 'results':
            showResults()
            break;
        case 'exit':
            isOn = false;
            break;
        default:
            break;
    }
}

function playGame() {
    let randomWord = getRandomWord();

    let hiddenWord = processRandomWord(randomWord);
    let randomWordLetters = randomWord.split("");
    let hiddenWordLetters = hiddenWord.split("");
    let regexp = /[a-z]/
    let userGuesses = [];
    let attempts = 8;

    console.log(hiddenWord)

    while (hiddenWordLetters.includes("-") && attempts > 0) {
        let userInput = input('Input a letter: \n');

        if (userInput.length === 0 || userInput.length > 1) {
            console.log('Please, input a single letter.')
        } else if (!regexp.test(userInput)) {
            console.log('Please, enter a lowercase letter from the English alphabet.')
        } else if (userGuesses.includes(userInput)) {
            console.log('You\'ve already guessed this letter.')
        } else if (randomWord.includes(userInput)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWordLetters[i] === userInput) {
                    hiddenWordLetters[i] = userInput;
                }
            }
        } else if (!randomWord.includes(userInput)) {
            attempts -= 1
            console.log("That letter doesn't appear in the word.");
        }
        userGuesses.push(userInput)
        console.log(hiddenWordLetters.join().replaceAll(",", ""))
    }
    validateIfWinOrLose(attempts, randomWord)
}

function processRandomWord(randomWord) {
    let hiddenWord = ''
    for (let i = 0; i < randomWord.length; i++) {
        hiddenWord += '-'
    }
    return hiddenWord
}

function getRandomWord() {
    let randomNr = Math.floor(Math.random() * words.length)
    return words[randomNr];
}

function validateIfWinOrLose(attempts, randomWord) {
    if (attempts > 0) {
        console.log(`You guessed the word ${randomWord}!`);
        console.log("You survived!");
        results.nrOfWins += 1
    } else {
        console.log("You lost!");
        results.nrOfLost += 1
    }
}

function showResults() {
    console.log(`You won: ${results.nrOfWins} times.`)
    console.log(`You lost: ${results.nrOfLost} times.`)
}
