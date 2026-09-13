/*
  Store the selected range
*/

let minNumber;

let maxNumber;

let currentNumber;


/*
  =========================
  START PRACTICE
  =========================
*/

function startPractice() {


  // Get range values

  minNumber =
    Number(
      document.getElementById(
        "min-number"
      ).value
    );


  maxNumber =
    Number(
      document.getElementById(
        "max-number"
      ).value
    );


  /*
    Check that both numbers
    are valid positive integers
  */

  if (
    !Number.isInteger(minNumber) ||
    !Number.isInteger(maxNumber) ||
    minNumber < 1 ||
    maxNumber < 1
  ) {

    showError(
      "Please enter valid numbers."
    );

    return;

  }


  /*
    Make sure From is not
    greater than To
  */

  if (minNumber > maxNumber) {

    showError(
      "The first number must be smaller than the second."
    );

    return;

  }


  /*
    Clear any previous error
  */

  showError("");


  /*
    Hide setup screen
  */

  document
    .getElementById("setup-screen")
    .classList.add("hidden");


  /*
    Show practice screen
  */

  document
    .getElementById("practice-screen")
    .classList.remove("hidden");


  /*
    Generate first question
  */

  nextQuestion();

}


/*
  =========================
  NEXT QUESTION
  =========================
*/

function nextQuestion() {


  /*
    Generate a random number
    inside the selected range
  */

  currentNumber =
    Math.floor(
      Math.random() *
      (maxNumber - minNumber + 1)
    ) + minNumber;


  /*
    Show the number
  */

  document
    .getElementById("number-display")
    .textContent =
    currentNumber;


  /*
    Clear the answer box
  */

  const answerInput =
    document.getElementById(
      "answer-input"
    );

  answerInput.value = "";


  /*
    Clear feedback
  */

  const feedback =
    document.getElementById(
      "feedback"
    );

  feedback.textContent = "";

  feedback.className = "";


  /*
    Put cursor in answer box
  */

  answerInput.focus();

}


/*
  =========================
  CHECK ANSWER
  =========================
*/

function checkAnswer() {


  const answerInput =
    document.getElementById(
      "answer-input"
    );


  /*
    Check whether the user
    entered anything
  */

  if (
    answerInput.value.trim() === ""
  ) {

    showFeedback(
      "Please enter an answer.",
      "incorrect"
    );

    return;
