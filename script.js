const questions = [
    { question: "What is the ordinal number for 1?", choices: ["First", "Second", "Third", "Fourth"], answer: "First" },
    { question: "What is the ordinal number for 2?", choices: ["First", "Second", "Third", "Fourth"], answer: "Second" },
    { question: "What is the ordinal number for 3?", choices: ["First", "Second", "Third", "Fourth"], answer: "Third" },
    { question: "What is the ordinal number for 4?", choices: ["First", "Second", "Third", "Fourth"], answer: "Fourth" },
    { question: "What is the ordinal number for 5?", choices: ["Fifth", "Sixth", "Seventh", "Eighth"], answer: "Fifth" },
    { question: "What is the ordinal number for 10?", choices: ["Ninth", "Tenth", "Eleventh", "Twelfth"], answer: "Tenth" },
    { question: "What is the ordinal number for 12?", choices: ["Eleventh", "Twelfth", "Thirteenth", "Fourteenth"], answer: "Twelfth" },
    { question: "What is the ordinal number for 20?", choices: ["Twentieth", "Twenty-first", "Twenty-second", "Twenty-third"], answer: "Twentieth" },
    { question: "What is the ordinal number for 30?", choices: ["Thirtieth", "Thirty-first", "Thirty-second", "Thirty-third"], answer: "Thirtieth" },
    { question: "What is the ordinal number for 100?", choices: ["Hundredth", "Hundred-first", "Hundred-second", "Hundred-third"], answer: "Hundredth" }
];

let currentQuestionIndex = 0;
let score = 0;
let usedQuestions = [];

function getRandomQuestion() {
    if (usedQuestions.length === questions.length) {
        return null;
    }
    let index;
    do {
        index = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(index));
    usedQuestions.push(index);
    return questions[index];
}

function loadQuestion() {
    const question = getRandomQuestion();
    if (!question) {
        showResult();
        return;
    }

    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';

    question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', selectChoice);
        choicesElement.appendChild(button);
    });
}

function selectChoice(event) {
    const selectedChoice = event.target.textContent;
    const correctAnswer = questions[usedQuestions[currentQuestionIndex]].answer;
    
    if (selectedChoice === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function showResult() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Your score is ${score} out of ${questions.length}`;
    document.getElementById('quiz-container').style.display = 'none';

    if (score === questions.length) {
        // Inicia a animação de confete
        startConfetti();
    }
}

document.getElementById('submit-btn').addEventListener('click', showResult);

loadQuestion();
