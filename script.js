let questions = [
    { text: "I am talkative.", trait: "extraversion", reverse: false },
    { text: "I am reserved.", trait: "extraversion", reverse: true },
    { text: "I am full of energy.", trait: "extraversion", reverse: false },
    { text: "I generate a lot of enthusiasm.", trait: "extraversion", reverse: false },
    { text: "I tend to be quiet.", trait: "extraversion", reverse: true },
    { text: "I am outgoing, sociable.", trait: "extraversion", reverse: false },
    { text: "I am helpful and unselfish with others.", trait: "agreeableness", reverse: false },
    { text: "I tend to find fault with others.", trait: "agreeableness", reverse: true },
    { text: "I have a forgiving nature.", trait: "agreeableness", reverse: false },
    { text: "I am generally trusting.", trait: "agreeableness", reverse: false },
    { text: "I can be cold and aloof.", trait: "agreeableness", reverse: true },
    { text: "I am considerate and kind to almost everyone.", trait: "agreeableness", reverse: false },
    { text: "I am sometimes rude to others.", trait: "agreeableness", reverse: true },
    { text: "I like to cooperate with others.", trait: "agreeableness", reverse: false },
    { text: "I do a thorough job.", trait: "conscientiousness", reverse: false },
    { text: "I can be somewhat careless. ", trait: "conscientiousness", reverse: true },
    { text: "I am a reliable worker.", trait: "conscientiousness", reverse: false },
    { text: "I tend to be disorganized. ", trait: "conscientiousness", reverse: true },
    { text: "I tend to be lazy. ", trait: "conscientiousness", reverse: true },
    { text: "I persevere until the task is finished.", trait: "conscientiousness", reverse: false },
    { text: "I do things efficiently.", trait: "conscientiousness", reverse: false },
    { text: "I make plans and follow through with them.", trait: "conscientiousness", reverse: false },
    { text: "I am easily distracted. ", trait: "conscientiousness", reverse: true },
    { text: "I am depressed, blue.", trait: "neuroticism", reverse: false },
    { text: "I am relaxed, handle stress well. ", trait: "neuroticism", reverse: true },
    { text: "I can be tense.", trait: "neuroticism", reverse: false },
    { text: "I worry a lot.", trait: "neuroticism", reverse: false },
    { text: "I am emotionally stable, not easily upset. ", trait: "neuroticism", reverse: true },
    { text: "I can be moody.", trait: "neuroticism", reverse: false },
    { text: "I remain calm in tense situations. ", trait: "neuroticism", reverse: true },
    { text: "I get nervous easily.", trait: "neuroticism", reverse: false },
    { text: "I have a vivid imagination.", trait: "openness", reverse: false },
    { text: "I am not interested in abstract ideas. ", trait: "openness", reverse: true },
    { text: "I have an active imagination.", trait: "openness", reverse: false },
    { text: "I am original, come up with new ideas.", trait: "openness", reverse: false },
    { text: "I am curious about many different things.", trait: "openness", reverse: false },
    { text: "I am ingenious, a deep thinker.", trait: "openness", reverse: false },
    { text: "I have few artistic interests. ", trait: "openness", reverse: true },
    { text: "I am inventive.", trait: "openness", reverse: false },
    { text: "I value artistic, aesthetic experiences.", trait: "openness", reverse: false },
    { text: "I prefer work that is routine. ", trait: "openness", reverse: true },
    { text: "I like to reflect, play with ideas.", trait: "openness", reverse: false },
    { text: "I am sophisticated in art, music, or literature.", trait: "openness", reverse: false },
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let selectedQuestions = [];

function selectQuestions() {
    const traits = ["extraversion", "agreeableness", "neuroticism", "conscientiousness", "openness"];
    selectedQuestions = [];

    traits.forEach(trait => {
        const traitQuestions = questions.filter(q => q.trait === trait);
        shuffleArray(traitQuestions);
        selectedQuestions = selectedQuestions.concat(traitQuestions.slice(0, 3));
    });

    shuffleArray(selectedQuestions);
    return selectedQuestions;
}

let currentQuestionIndex = 0;
let answers = {
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
    conscientiousness: 0,
    openness: 0
};

const questionContainer = document.getElementById('question-container');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const progressBar = document.querySelector('.progress');

// Define professions with their personality profiles
const professions = {
    "Software Developer": { extraversion: 1, agreeableness: 1, neuroticism: 3, conscientiousness: 3, openness: 3 },
    "Teacher": { extraversion: 5, agreeableness: 5, neuroticism: 2, conscientiousness: 2, openness: 4 },
    "Entrepreneur": { extraversion: 4, agreeableness: 3, neuroticism: 2, conscientiousness: 4, openness: 5 },
    "Nurse": { extraversion: 4, agreeableness: 5, neuroticism: 3, conscientiousness: 4, openness: 3 },
    "Artist": { extraversion: 2, agreeableness: 3, neuroticism: 5, conscientiousness: 2, openness: 5 },
    // Add more professions as needed
};

let selectedScore = null;
let selectedTrait = null;
let selectedReverse = null;

const instructionScreen = document.getElementById('instruction-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const restartQuizButton = document.getElementById('restart-quiz-btn');
const resultsContainer = document.getElementById('results-container');

function initializeQuiz() {
    showScreen('instruction');
    startButton.addEventListener('click', startQuiz);
    restartButton.addEventListener('click', restartQuiz);
    restartQuizButton.addEventListener('click', restartQuiz);
    restartButton.classList.add('hide');
}

function showScreen(screenName) {
    instructionScreen.classList.add('hide');
    quizScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    restartButton.classList.add('hide');

    switch(screenName) {
        case 'instruction':
            instructionScreen.classList.remove('hide');
            break;
        case 'quiz':
            quizScreen.classList.remove('hide');
            restartButton.classList.remove('hide');
            break;
        case 'result':
            resultScreen.classList.remove('hide');
            restartButton.classList.remove('hide');
            break;
    }
}

function startQuiz() {
    showScreen('quiz');
    resetQuiz();
    showQuestion(selectedQuestions[currentQuestionIndex]);
}

function restartQuiz() {
    showScreen('instruction');
    resetQuiz();
}

function resetQuiz() {
    currentQuestionIndex = 0;
    answers = {
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0,
        conscientiousness: 0,
        openness: 0
    };
    selectedScore = null;
    selectedTrait = null;
    selectedReverse = null;
    nextButton.disabled = true;
    nextButton.innerText = 'Next';
    updateProgressBar();
    selectedQuestions = selectQuestions();
}

function showQuestion(question) {
    questionElement.innerText = question.text;
    answerButtonsElement.innerHTML = '';
    const answerOptions = [1, 2, 3, 4, 5]; // Scale from 1 to 5
    answerOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn', 'quiz-btn');
        button.addEventListener('click', () => selectButton(option, question.trait, question.reverse, button));
        answerButtonsElement.appendChild(button);
    });
    selectedScore = null;
    selectedTrait = null;
    selectedReverse = null;
    nextButton.disabled = true;
}

function selectButton(score, trait, reverse, button) {
    // Remove 'selected' class from all buttons
    answerButtonsElement.querySelectorAll('.btn').forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' class to clicked button
    button.classList.add('selected');
    
    selectedScore = score;
    selectedTrait = trait;
    selectedReverse = reverse;
    
    nextButton.disabled = false; // Enable the button when an answer is selected
}

function selectAnswer() {
    if (selectedScore === null) return;

    let score = selectedScore;
    if (selectedReverse) {
        score = 6 - score; // Reverse the score for reverse-scored questions
    }
    answers[selectedTrait] += score;
    currentQuestionIndex++;
    updateProgressBar();
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion(selectedQuestions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex / 15) * 100;
    progressBar.style.width = progressPercentage + '%';
}

function showResults() {
    showScreen('result');
    resultsContainer.innerHTML = '';
    for (let trait in answers) {
        resultsContainer.innerHTML += `<p>${trait}: ${answers[trait]}</p>`;
    }

    // Calculate average scores
    for (let trait in answers) {
        answers[trait] = answers[trait] / 3; // Divide by 3 as we have 3 questions per trait
    }

    // Find matching professions
    const matchingProfessions = findMatchingProfessions(answers);
    
    resultsContainer.innerHTML += `<h3>Recommended Professions:</h3>`;
    matchingProfessions.forEach(profession => {
        resultsContainer.innerHTML += `<p>${profession}</p>`;
    });
}

function findMatchingProfessions(userProfile) {
    const professionScores = Object.keys(professions).map(profession => {
        const score = calculateSimilarity(userProfile, professions[profession]);
        return { profession, score };
    });

    professionScores.sort((a, b) => b.score - a.score);
    return professionScores.slice(0, 3).map(p => p.profession);
}

function calculateSimilarity(profile1, profile2) {
    return Object.keys(profile1).reduce((sum, trait) => {
        return sum - Math.abs(profile1[trait] - profile2[trait]);
    }, 0);
}

nextButton.addEventListener('click', selectAnswer);

initializeQuiz();


// New Styles For Stardew Valley Landing Page

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('show');
        }
    });
});