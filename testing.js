import { rollSixSidedDie } from './index.js';

function testRandomnessOfSixSidedDiceFunction() {
  const rollCounter = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  let currentRoll;
  for (let i = 0; i < 12000; i++) {
    currentRoll = rollSixSidedDie();
    rollCounter[currentRoll]++;
  }
  console.log('rollCounter store:', rollCounter);
}

// function testYachtseaOccurrence() {
//   const numberOfRolls = 12000;
//   let counter = 0;
//   let currentTurn;
//   let isYachtsea;

//   for (let i = 0; i < numberOfRolls; i++) {
//     currentTurn = rollFiveDiceTogether();
//     isYachtsea = checkForYachtsea(currentTurn);
//     if (isYachtsea) {
//       counter++;
//     }
//   }

//   console.log(`There were ${counter} Yachtseas out of ${numberOfRolls} rolls`);
//   const frequency = (counter / numberOfRolls) * 100;
//   const roundedFrequency = Math.round(frequency * 100) / 100;
//   console.log(`That is a frequency of ${roundedFrequency}%!`);
// }

function testChanceOfRollingTwoMatchingDice() {
  const numberOfRolls = 10000;
  let counter = 0;
  let turn = {};
  let currentTurn;
  let areMatching;

  function rollTwoDiceTogether() {
    for (let i = 1; i < 3; i++) {
      turn[`die ${i}`] = rollSixSidedDie();
    }
  }

  for (let i = 0; i < numberOfRolls; i++) {
    currentTurn = rollTwoDiceTogether();
    areMatching = turn[`die 1`] === turn[`die 2`];
    if (areMatching) {
      counter++;
    }
  }

  console.log(`There were ${counter} matches out of ${numberOfRolls} rolls`);
  const frequency = (counter / numberOfRolls) * 100;
  const roundedFrequency = Math.round(frequency * 100) / 100;
  console.log(`That is a frequency of ${roundedFrequency}%!`);
}
