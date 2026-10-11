
const questions = [
  {
    question: "Which language is used to structure a web page?",
    options: ["Python", "HTML", "Java", "SQL"],
    answer: 1
  },
  {
    question: "Which language is used to style a web page?",
    options: ["CSS", "C", "SQL", "PHP"],
    answer: 0
  },
  {
    question: "Which language adds interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "XML"],
    answer: 2
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    options: ["<link>", "<a>", "<p>", "<href>"],
    answer: 1
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "background", "text-size", "color"],
    answer: 3
  },
  {
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["let", "print", "define", "echo"],
    answer: 0
  },
  {
    question: "Which method selects an element by its ID?",
    options: [
      "document.getElementById()",
      "document.getClass()",
      "document.findId()",
      "document.selectId()"
    ],
    answer: 0
  },
  {
    question: "Which symbol is commonly used for a strict equality comparison in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: 2
  },
  {
    question: "Which HTML element is used to display an image?",
    options: ["<image>", "<img>", "<picture-file>", "<src>"],
    answer: 1
  },
  {
    question: "Which CSS layout system is useful for arranging items in rows or columns?",
    options: ["Console", "Prompt", "Alert", "Flexbox"],
    answer: 3
  }
];

const questionCount = document.getElementById("question-count");
const scoreLabel = document.getElementById("score-label");
const progressBar = document.getElementById("progress-bar");
const quizContent = document.getElementById("quiz-content");
const questionTitle = document.getElementById("quiz-title");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;

  const item = questions[currentQuestion];

  questionCount.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  scoreLabel.textContent = `Score: ${score}`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionTitle.textContent = item.question;
  optionsContainer.replaceChildren();

  feedback.textContent = "";
  feedback.className = "feedback";

  nextButton.disabled = true;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "View Results"
      : "Next Question";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index));

    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const correctIndex = questions[currentQuestion].answer;
  const optionButtons = optionsContainer.querySelectorAll(".option-btn");

  optionButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === correctIndex) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== correctIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    feedback.textContent = "Correct answer! Well done.";
    feedback.classList.add("correct-text");
  } else {
    feedback.textContent =
      `Incorrect. The correct answer is: ${questions[currentQuestion].options[correctIndex]}`;
    feedback.classList.add("incorrect-text");
  }

  scoreLabel.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

function showResults() {
  quizContent.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  progressBar.style.width = "100%";
  questionCount.textContent = "Quiz completed";

  finalScore.textContent = `${score} / ${questions.length}`;

  const percentage = Math.round((score / questions.length) * 100);

  if (percentage >= 80) {
    resultMessage.textContent =
      `Excellent work! You scored ${percentage}%.`;
  } else if (percentage >= 50) {
    resultMessage.textContent =
      `Good effort! You scored ${percentage}%. Keep practising!`;
  } else {
    resultMessage.textContent =
      `You scored ${percentage}%. Review the topics and try again!`;
  }
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  answered = false;

  resultScreen.classList.add("hidden");
  quizContent.classList.remove("hidden");

  showQuestion();
});

showQuestion();
