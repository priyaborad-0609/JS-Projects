const quizData = [
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "var x;",
            "variable x;",
            "v x;",
            "declare x;"
        ],
        answer: "var x;"
    },
    {
        question: "Which operator is used for strict equality comparison in JavaScript?",
        options: [
            "==",
            "===",
            "=",
            "!=="
        ],
        answer: "==="
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: [
            "// This is a comment",
            "<!-- This is a comment -->",
            "' This is a comment",
            "# This is a comment"
        ],
        answer: "// This is a comment"
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        answer: "push()"
    },
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Mode",
            "Document Order Model"
        ],
        answer: "Document Object Model"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function myFunction() {}",
            "create myFunction() {}",
            "func myFunction() {}",
            "def myFunction() {}"
        ],
        answer: "function myFunction() {}"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: [
            "onchange",
            "onmouseover",
            "onclick",
            "onload"
        ],
        answer: "onclick"
    },
    {
        question: "What will typeof null return in JavaScript?",
        options: [
            "null",
            "undefined",
            "object",
            "string"
        ],
        answer: "object"
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "let",
            "var",
            "const",
            "constant"
        ],
        answer: "const"
    },
    {
        question: "How do you check if a variable is an array?",
        options: [
            "typeof variable",
            "variable.isArray()",
            "Array.isArray(variable)",
            "variable.type() === 'array'"
        ],
        answer: "Array.isArray(variable)"
    }
];

const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const timeDisplay = document.getElementById('time');
const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let userAnswers = new Array(quizData.length).fill(null);

function startQuiz() {
    totalQuestionsDisplay.textContent = quizData.length;
    showQuestion();
    startTimer();
}

function showQuestion() {
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    const questionData = quizData[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        <div class="options">
            ${questionData.options.map((option, i) => `
                <div class="option">
                    <input type="radio" name="answer" id="option${i}" value="${option}" 
                           ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                    <label for="option${i}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    const selectedOption = questionContainer.querySelector('input[name="answer"]:checked');
    nextButton.disabled = !selectedOption;
    
    const options = questionContainer.querySelectorAll('input[name="answer"]');
    options.forEach(option => {
        option.addEventListener('change', () => {
            nextButton.disabled = false;
            userAnswers[currentQuestionIndex] = option.value;
        });
    });
}

function startTimer() {
    timeLeft = 60;
    timeDisplay.textContent = timeLeft;
    
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeDisplay.textContent = "Time's up!";
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    
    const selectedOption = questionContainer.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value === quizData[currentQuestionIndex].answer) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    
    resultContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${quizData.length}</p>
        <p>Percentage: ${Math.round((score / quizData.length) * 100)}%</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}

nextButton.addEventListener('click', nextQuestion);
startQuiz();