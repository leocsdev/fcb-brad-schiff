const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");

// initialize state of the game
let state = {
  score: 0,
  wrongAnswers: 0,
};

//
function updateProblem() {
  // store generated problem
  state.currentProblem = generateProblem();

  const num1 = state.currentProblem.numberOne;
  const num2 = state.currentProblem.numberTwo;
  const op = state.currentProblem.operator;

  // render problem to html
  problemElement.innerHTML = `${num1} ${op} ${num2}`;

  // reset the answer text field
  ourField.value = "";

  // select the answer text field
  ourField.focus();
}

// Run on load
updateProblem();

// Generate random number
function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
  // return a math problem as an object
  return {
    // generate num from 0 to 10 and store
    numberOne: generateNumber(10),

    // generate num from 0 to 10 and store
    numberTwo: generateNumber(10),

    // return random operator
    operator: ["+", "-", "x"][generateNumber(2)],
  };
}

// Call handleSubmit function when user submit the answer
ourForm.addEventListener("submit", handleSubmit);

// Check answer and process logic upon submit
function handleSubmit(e) {
  // Prevent form default behavior
  e.preventDefault();

  // Create var for correct answer
  let correctAnswer;

  // get the current problem set
  const p = state.currentProblem;

  // check the operator and compute correct answer
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo;
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo;
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo;

  // check if user enter the correct answer
  if (parseInt(ourField.value, 10) === correctAnswer) {
    // add 1 to score if user answer is correct
    state.score++;

    // Update points needed to win in html
    pointsNeeded.textContent = 10 - state.score;

    // then, get a new set of problem
    updateProblem();
  } else {
    // Add 1 to wrong answer if user answer is wrong
    state.wrongAnswers++;

    // Update allowed mistakes in html
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
  }

  // Check if user won or lost
  checkLogic();
}

function checkLogic() {
  // Check if user won
  if (state.score === 10) {
    // Send message if won
    alert("Congrats! You won!");

    // Then, reset game
    resetGame();
  }

  // Check if user lost
  if (state.wrongAnswers === 3) {
    // Send message if lost
    alert("Sorry, You lost.");

    // Then, reset game
    resetGame();
  }
}

// Reset game
function resetGame() {
  // get a new set of problem
  updateProblem();

  // reset state values
  state.score = 0;
  state.wrongAnswers = 0;

  // reset html values
  pointsNeeded.textContent = 10;
  mistakesAllowed.textContent = 2;
}
