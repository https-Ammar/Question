const questions = [
  {
    question: "ما هي عاصمة المملكة العربية السعودية؟",
    answers: [
      { text: "جدة", correct: false },
      { text: "الرياض", correct: true },
      { text: "الدمام", correct: false },
    ],
  },
  {
    question: "ما هي أكبر دولة في العالم من حيث المساحة؟",
    answers: [
      { text: "كندا", correct: false },
      { text: "روسيا", correct: true },
      { text: "الصين", correct: false },
    ],
  },
  {
    question: "ما هو أطول نهر في العالم؟",
    answers: [
      { text: "نهر النيل", correct: true },
      { text: "نهر الأمازون", correct: false },
      { text: "نهر اليانغتسي", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
const questionsContainer = document.getElementById("questions-container");
const progressBar = document.getElementById("progress-bar");
const quizHeader = document.getElementById("quiz-header");
const progressContainer = document.getElementById("progress-container");

let confettiInterval;

function initQuiz() {
  currentQuestionIndex = 0;
  renderQuestion();
  updateProgressBar();
  quizHeader.style.display = "block";
  progressContainer.style.display = "block";
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const letters = ["أ", "ب", "ج"];

  const questionHTML = `
        <div class="question-card" id="question-${currentQuestionIndex}">
            <div class="question-header text-center mb-4">
                <h2 class="question-title mb-3">${question.question}</h2>
                <div class="question-divider mx-auto"></div>
            </div>
            <div class="answers d-flex flex-column gap-3">
                ${question.answers
                  .map(
                    (answer, index) => `
                    <button class="answer-button" data-index="${index}" data-correct="${answer.correct}">
                        <div class="answer-content d-flex align-items-center gap-3">
                            <span>${answer.text}</span>
                        </div>
                        <div class="answer-letter">${letters[index]}</div>
                    </button>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;

  questionsContainer.innerHTML = questionHTML;

  const answerButtons = document.querySelectorAll(
    `#question-${currentQuestionIndex} .answer-button`
  );
  answerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectAnswer(this);
      nextQuestion();
    });
  });
}

function selectAnswer(button) {
  const questionDiv = button.closest(".question-card");
  const answerButtons = questionDiv.querySelectorAll(".answer-button");

  answerButtons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove("selected");
  });

  button.classList.add("selected");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
    updateProgressBar();
  } else {
    showWinningScreen();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function createConfetti() {
  const colors = [
    "#fbbf24",
    "#f97316",
    "#3b82f6",
    "#9333ea",
    "#10b981",
    "#ffffff",
    "#f43f5e",
  ];
  const confettiContainer = document.createElement("div");
  confettiContainer.id = "confetti-container";
  confettiContainer.style.position = "fixed";
  confettiContainer.style.top = "0";
  confettiContainer.style.left = "0";
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "1000";
  confettiContainer.style.overflow = "hidden";
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = "absolute";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = -10 + "px";
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = Math.random() * 10 + 5 + "px";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    confettiContainer.appendChild(confetti);

    let duration = Math.random() * 3 + 2;
    let delay = Math.random() * 2;

    confetti.style.animation = `confetti-fall ${duration}s ease-in ${delay}s forwards`;

    setTimeout(() => {
      confetti.remove();
    }, (duration + delay) * 1000);
  }
}

function showWinningScreen() {
  const winningHTML = `
        <div class="winning-card">
            <div class="winning-icon">🎉</div>
            <h1 class="winning-title">مبروك! لقد ربحت!</h1>
            <p class="winning-message">لقد فزت بجائزة خاصة!<br>اضغط على الزر أدناه لاستلام جائزتك</p>
            <button class="btn btn-prize" id="prize-btn">استلم الجائزة الآن</button>
        </div>
    `;

  questionsContainer.innerHTML = winningHTML;
  quizHeader.style.display = "none";
  progressContainer.style.display = "none";

  createConfetti();
  confettiInterval = setInterval(createConfetti, 2000);

  document.getElementById("prize-btn").addEventListener("click", function () {
    clearInterval(confettiInterval);
    const container = document.getElementById("confetti-container");
    if (container) container.remove();
    window.location.href = "https://www.google.com";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initQuiz();
});
