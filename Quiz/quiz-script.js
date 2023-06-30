const questions = [
  {
    question: "Which is the Largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Elephant", correct: false },
      { text: "Bluewhale", correct: true },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "Which is the Largest Continent in the world?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Australlia", correct: false },
      { text: "Antartica", correct: false },
      { text: "Africa", correct: false }
    ]
  },
  {
    question: "Which is the Largest Desert in the world?",
    answers: [
      { text: "Sahara Desert", correct: true },
      { text: "Thar Desrert", correct: false },
      { text: "Atcama Desert", correct: false },
      { text: "Antartic Desert", correct: false }
    ]
  },
  {
    question: "Which is the Largest Ocean in the world?",
    answers: [
      { text: "Arctic", correct: false },
      { text: "Pacific", correct: true },
      { text: "indian", correct: false },
      { text: "Atlantic", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored for the test is ${
    (score / questions.length) * 4
  }`;
  document.write(`<p>${message}</p>`);
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
