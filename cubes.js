let minNumber;
let maxNumber;
let currentNumber;


function calculateCube(value) {
  return value * value * value;
}


/*
  Start the practice
*/

function startPractice() {

  minNumber = Number(
    document.getElementById("min-number").value
  );

  maxNumber = Number(
    document.getElementById("max-number").value
  );


  // Check that the numbers are valid

  if (
    !Number.isInteger(minNumber) ||
    !Number.isInteger(maxNumber) ||
    minNumber < 1 ||
    maxNumber < 1
  ) {

    showError("Please enter valid numbers.");

    return;
  }


  // Check that the range is correct

  if (minNumber > maxNumber) {

    showError("The first number must be smaller than the second.");

    return;
  }


  // Clear error

  showError("");


  // Switch screens

  document
    .getElementById("setup-screen")
    .classList.add("hidden");

  document
    .getElementById("practice-screen")
    .classList.remove("hidden");


  // Show first question

  nextQuestion();
}


/*
  Generate the next question
*/

function nextQuestion() {

  currentNumber =
    Math.floor(
      Math.random() * (maxNumber - minNumber + 1)
    ) + minNumber;


  // Show the number

  document.getElementById("number-display").textContent =
    currentNumber;


  // Clear previous answer

  const answerInput =
    document.getElementById("answer-input");

  answerInput.value = "";


  // Clear feedback

  const feedback =
    document.getElementById("feedback");

  feedback.textContent = "";

  feedback.className = "";


  // Put cursor in answer box

  answerInput.focus();
}


/*
  Check the user's answer
*/

function checkAnswer() {

  const answerInput =
    document.getElementById("answer-input");

  const userAnswer =
    Number(answerInput.value);


  // Don't allow empty answers

  if (answerInput.value.trim() === "") {

    showFeedback(
      "Please enter an answer.",
      "incorrect"
    );

    return;
  }


  // Calculate the correct answer

  const correctAnswer =
    calculateCube(currentNumber);


  // Check answer

  if (userAnswer === correctAnswer) {

    showFeedback(
      "✓ Correct!",
      "correct"
    );


    /*
      Wait a short moment so the user
      can see the correct message,
      then show the next number.
    */

    setTimeout(() => {

      nextQuestion();

    }, 600);

  } else {

    showFeedback(
      "✗ Try again!",
      "incorrect"
    );


    // Keep the same number

    answerInput.select();
  }
}


/*
  Stop practice

  This returns the user to
  the range selection screen.
*/

function stopPractice() {

  document
    .getElementById("practice-screen")
    .classList.add("hidden");

  document
    .getElementById("setup-screen")
    .classList.remove("hidden");


  // Clear answer

  document.getElementById("answer-input").value = "";

  document.getElementById("feedback").textContent = "";

  document.getElementById("feedback").className = "";
}


/*
  Show an error on the setup screen
*/

function showError(message) {

  document.getElementById("range-error").textContent =
    message;
}


/*
  Show feedback during practice
*/

function showFeedback(message, className) {

  const feedback =
    document.getElementById("feedback");

  feedback.textContent = message;

  feedback.className = className;
}


if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateCube };
}


if (typeof document !== "undefined") {
  document
    .getElementById("answer-input")
    .addEventListener("keydown", function(event) {

      if (event.key === "Enter") {

        checkAnswer();

      }

    });
}
