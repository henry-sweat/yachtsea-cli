import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const turn = {};
let turnNumber = 1;
let diceToReroll;

playYachtsea();

function playYachtsea() {
  printInstructions();
  start();
}

function start() {
  rl.question('', async (userInput) => {
    if (userInput === 'exit') {
      rl.close();
      return;
    }

    if (userInput === 'roll') {
      rollFiveDiceTogether();
      printCurrentDice();
    } else if (userProvidedDiceToReroll(userInput)) {
      diceToReroll = getDiceFromUserInput(userInput);
      rerollDice(diceToReroll);
      printCurrentDice();
    }

    turnNumber++;

    if (isYachtsea(turn)) {
      console.log('YACHTSEA!!');
      moveToNextRound();
    }

    if (turnNumber > 3) {
      moveToNextRound();
    }

    start();
  });
}

export function rollFiveDiceTogether() {
  for (let i = 1; i < 6; i++) {
    turn[`die ${i}`] = rollSixSidedDie();
  }
}

export function rollSixSidedDie() {
  return Math.ceil(Math.random() * 6);
}

export function isYachtsea(turnObj) {
  for (let i = 2; i < 6; i++) {
    if (turnObj['die 1'] !== turnObj[`die ${i}`]) {
      return false;
    }
  }
  return true;
}

function rerollDice(diceToReroll) {
  diceToReroll.forEach((dieNumber) => {
    turn[`die ${dieNumber}`] = rollSixSidedDie();
  });
}

function moveToNextRound() {
  console.log(`Turn is over!`);
  turnNumber = 1;
}

function printInstructions() {
  console.log(
    "Welcome to Yachtsea! Type 'exit' to quit.\nType 'roll' when you are ready!"
  );
}

function printCurrentDice() {
  console.log(`turn ${turnNumber}:`, turn);
}

function getDiceFromUserInput(userInput) {
  return userInput.slice(5).split(' ');
}

function userProvidedDiceToReroll(userInput) {
  return userInput.length > 5;
}
