let currentDate;

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];


function getDayNameFromDate(date) {
  const dayNumber = date.getDay();
  return DAYS_OF_WEEK[dayNumber];
}


function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


function getRandomDate() {
  const startYear = 1600;
  const endYear = 2400;

  const startDate = new Date(startYear, 0, 1, 12, 0, 0, 0);
  const endDate = new Date(endYear, 11, 31, 12, 0, 0, 0);

  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());

  const randomDate = new Date(randomTime);
  randomDate.setHours(12, 0, 0, 0);

  return randomDate;
}


function renderOptions(correctAnswer) {
  const optionsContainer = document.getElementById("answer-options");

  optionsContainer.innerHTML = "";

  DAYS_OF_WEEK.forEach((day) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = day;
    button.onclick = () => checkAnswer(day);
    optionsContainer.appendChild(button);
  });
}


function nextQuestion() {
  currentDate = getRandomDate();

  const correctAnswer = getDayNameFromDate(currentDate);

  document.getElementById("date-display").textContent =
    formatDate(currentDate);

  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";

  renderOptions(correctAnswer);
}


function checkAnswer(selectedDay) {
  const correctAnswer = getDayNameFromDate(currentDate);

  if (selectedDay === correctAnswer) {
    showFeedback("✓ Correct!", "correct");

    setTimeout(() => {
      nextQuestion();
    }, 800);
  } else {
    showFeedback("Incorrect, try again", "incorrect");
  }
}


function showFeedback(message, className) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.className = className;
}


if (typeof document !== "undefined") {
  nextQuestion();
}


if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DAYS_OF_WEEK,
    getDayNameFromDate,
    formatDate,
    getRandomDate
  };
}
