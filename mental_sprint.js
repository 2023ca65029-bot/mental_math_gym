let currentMode = "addition";
let countValue = 0;
let minValue = 0;
let maxValue = 0;
let sequenceNumbers = [];
let sequenceOperators = [];
let currentIndex = 0;
let displayTimer = null;

function selectMode(mode) {
  currentMode = mode;

  const title =
    mode === "addition"
      ? "Addition Sprint"
      : mode === "multiplication"
      ? "Multiplication Sprint"
      : "Mixed Sprint";

  document.getElementById("setup-title").textContent = title;
  document.getElementById("sprint-title").textContent = title;

  const rangeFields = document.getElementById("range-fields");

  if (mode === "mixed") {
    rangeFields.classList.add("hidden");
  } else {
    rangeFields.classList.remove("hidden");
  }

  document.getElementById("mode-screen").classList.add("hidden");
  document.getElementById("setup-screen").classList.remove("hidden");
}

function showModeSelection() {
  clearDisplayTimer();

  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("sprint-screen").classList.add("hidden");
  document.getElementById("mode-screen").classList.remove("hidden");

  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";
  document.getElementById("answer-input").value = "";
}

function restartSprint() {
  clearDisplayTimer();
  document.getElementById("answer-input").value = "";
  document.getElementById("sprint-screen").classList.add("hidden");
  startSprint();
}

function clearDisplayTimer() {
  if (displayTimer) {
    clearTimeout(displayTimer);
    displayTimer = null;
  }
}

function startSprint() {
  const countInput = Number(document.getElementById("count-input").value);

  if (!Number.isInteger(countInput) || countInput < 2) {
    showSetupError("Please enter a valid number of values (at least 2).");
    return;
  }

  countValue = countInput;
  sequenceNumbers = [];
  sequenceOperators = [];

  if (currentMode === "mixed") {
    generateMixedSequence(countValue);
  } else {
    minValue = Number(document.getElementById("min-input").value);
    maxValue = Number(document.getElementById("max-input").value);

    if (!Number.isInteger(minValue) || !Number.isInteger(maxValue)) {
      showSetupError("Please enter valid whole numbers.");
      return;
    }

    if (minValue > maxValue) {
      showSetupError("Minimum must be smaller than or equal to maximum.");
      return;
    }

    for (let i = 0; i < countValue; i++) {
      const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      sequenceNumbers.push(randomNumber);
    }

    sequenceOperators = Array(countValue - 1).fill(
      currentMode === "addition" ? "+" : "×"
    );
  }

  currentIndex = 0;
  clearDisplayTimer();
  showSetupError("");

  document.getElementById("answer-input").value = "";
  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("sprint-screen").classList.remove("hidden");
  document.getElementById("answer-section").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";

  showSequenceStep();
}

function generateMixedSequence(length) {
  const operators = ["+", "-", "×", "÷"];

  let currentValue = getRandomWholeNumber(1, 12);
  sequenceNumbers.push(currentValue);

  for (let i = 1; i < length; i++) {
    let operator = randomFrom(operators);
    let nextValue = getRandomWholeNumber(1, 12);

    if (operator === "-") {
      while (currentValue - nextValue < 0) {
        nextValue = getRandomWholeNumber(1, 12);
      }
    } else if (operator === "÷") {
      const divisors = getDivisors(currentValue);

      if (divisors.length === 0) {
        operator = "+";
      } else {
        const validDivisors = divisors.filter((d) => d <= 12);

        if (validDivisors.length > 0) {
          nextValue = randomFrom(validDivisors);
        } else {
          operator = "+";
        }
      }
    }

    sequenceNumbers.push(nextValue);
    sequenceOperators.push(operator);
    currentValue = applyOperator(currentValue, operator, nextValue);
  }
}

function getRandomWholeNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getDivisors(value) {
  const divisors = [];

  for (let i = 1; i <= value; i++) {
    if (value % i === 0) {
      divisors.push(i);
    }
  }

  return divisors;
}

function applyOperator(left, operator, right) {
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "×") return left * right;
  if (operator === "÷") return left / right;

  return left + right;
}

function calculateCorrectAnswer() {
  let total = sequenceNumbers[0];

  for (let i = 0; i < sequenceOperators.length; i++) {
    total = applyOperator(total, sequenceOperators[i], sequenceNumbers[i + 1]);
  }

  return total;
}

function showSequenceStep() {
  const display = document.getElementById("sequence-display");

  if (currentIndex >= sequenceNumbers.length) {
    display.textContent = "";
    document.getElementById("status-text").textContent = "Enter your final answer";
    document.getElementById("answer-section").classList.remove("hidden");
    document.getElementById("answer-input").focus();
    return;
  }

  let expression = String(sequenceNumbers[0]);

  for (let i = 0; i < currentIndex; i++) {
    expression += ` ${sequenceOperators[i]} ${sequenceNumbers[i + 1]}`;
  }

  display.textContent = expression;
  currentIndex += 1;

  displayTimer = setTimeout(() => {
    showSequenceStep();
  }, 1000);
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById("answer-input").value);

  if (document.getElementById("answer-input").value.trim() === "") {
    showFeedback("Please enter an answer.", "incorrect");
    return;
  }

  const correctAnswer = calculateCorrectAnswer();

  if (userAnswer === correctAnswer) {
    showFeedback("Correct!", "correct");
    document.getElementById("answer-input").value = "";
    setTimeout(() => {
      restartSprint();
    }, 800);
  } else {
    document.getElementById("answer-input").value = "";
    showFeedback("Incorrect, try again", "incorrect");
  }
}

function revealSequence() {
  let expression = String(sequenceNumbers[0]);

  for (let i = 0; i < sequenceOperators.length; i++) {
    expression += ` ${sequenceOperators[i]} ${sequenceNumbers[i + 1]}`;
  }

  document.getElementById("sequence-display").textContent = expression;
  document.getElementById("status-text").textContent = "Sequence revealed";
  document.getElementById("answer-section").classList.remove("hidden");
}

function revealAnswer() {
  const answer = calculateCorrectAnswer();

  document.getElementById("sequence-display").textContent = answer;
  document.getElementById("status-text").textContent = "Answer revealed";
  showFeedback("Answer: " + answer, "correct");
}

function showSetupError(message) {
  document.getElementById("setup-error").textContent = message;
}

function showFeedback(message, className) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.className = className;
}

if (typeof document !== "undefined") {
  document.getElementById("answer-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });
}
