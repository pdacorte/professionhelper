/**
 * Career Personality Quiz - Big Five Assessment
 * 
 * This quiz uses the Big Five personality model (OCEAN) to match users
 * with suitable careers based on personality trait profiles.
 * 
 * Scoring: Each trait is measured on a 1-5 scale (normalized average).
 * Matching: Uses Euclidean distance for accurate similarity calculation.
 */

// ============================================
// Configuration
// ============================================

const CONFIG = {
    QUESTIONS_PER_TRAIT: 5,
    TOTAL_QUESTIONS: 25,
    TOP_CAREERS_TO_SHOW: 5,
    SCALE_MIN: 1,
    SCALE_MAX: 5
};

// ============================================
// Question Pool - Based on validated Big Five inventory
// ============================================

const QUESTIONS = [
    // Extraversion (E)
    { text: "I feel comfortable around people.", trait: "extraversion", reverse: false },
    { text: "I start conversations with strangers.", trait: "extraversion", reverse: false },
    { text: "I am the life of the party.", trait: "extraversion", reverse: false },
    { text: "I prefer to keep in the background.", trait: "extraversion", reverse: true },
    { text: "I don't talk a lot.", trait: "extraversion", reverse: true },
    { text: "I am skilled in handling social situations.", trait: "extraversion", reverse: false },
    { text: "I feel energized when around other people.", trait: "extraversion", reverse: false },
    { text: "I prefer solitary activities.", trait: "extraversion", reverse: true },
    
    // Agreeableness (A)
    { text: "I am interested in other people's problems.", trait: "agreeableness", reverse: false },
    { text: "I sympathize with others' feelings.", trait: "agreeableness", reverse: false },
    { text: "I take time out for others.", trait: "agreeableness", reverse: false },
    { text: "I feel others' emotions deeply.", trait: "agreeableness", reverse: false },
    { text: "I am not interested in other people's concerns.", trait: "agreeableness", reverse: true },
    { text: "I make people feel at ease.", trait: "agreeableness", reverse: false },
    { text: "I am helpful and unselfish with others.", trait: "agreeableness", reverse: false },
    { text: "I can be cold and distant.", trait: "agreeableness", reverse: true },
    
    // Conscientiousness (C)
    { text: "I am always prepared.", trait: "conscientiousness", reverse: false },
    { text: "I pay attention to details.", trait: "conscientiousness", reverse: false },
    { text: "I get chores done right away.", trait: "conscientiousness", reverse: false },
    { text: "I follow a schedule.", trait: "conscientiousness", reverse: false },
    { text: "I leave my belongings around.", trait: "conscientiousness", reverse: true },
    { text: "I make plans and stick to them.", trait: "conscientiousness", reverse: false },
    { text: "I am exacting in my work.", trait: "conscientiousness", reverse: false },
    { text: "I often forget to put things back in their place.", trait: "conscientiousness", reverse: true },
    
    // Neuroticism (N)
    { text: "I get stressed out easily.", trait: "neuroticism", reverse: false },
    { text: "I worry about things.", trait: "neuroticism", reverse: false },
    { text: "I am easily disturbed.", trait: "neuroticism", reverse: false },
    { text: "I get upset easily.", trait: "neuroticism", reverse: false },
    { text: "I am relaxed most of the time.", trait: "neuroticism", reverse: true },
    { text: "I seldom feel blue.", trait: "neuroticism", reverse: true },
    { text: "I change my mood a lot.", trait: "neuroticism", reverse: false },
    { text: "I remain calm under pressure.", trait: "neuroticism", reverse: true },
    
    // Openness (O)
    { text: "I have a vivid imagination.", trait: "openness", reverse: false },
    { text: "I have excellent ideas.", trait: "openness", reverse: false },
    { text: "I am quick to understand things.", trait: "openness", reverse: false },
    { text: "I enjoy thinking about abstract concepts.", trait: "openness", reverse: false },
    { text: "I am not interested in abstract ideas.", trait: "openness", reverse: true },
    { text: "I enjoy artistic and creative experiences.", trait: "openness", reverse: false },
    { text: "I like to try new things.", trait: "openness", reverse: false },
    { text: "I prefer routine over variety.", trait: "openness", reverse: true }
];

// ============================================
// Career Profiles - All traits on 1-5 scale
// Based on research on personality-career fit
// ============================================

const CAREERS = {
    "Software Developer": {
        traits: { openness: 4.2, conscientiousness: 4.0, extraversion: 2.5, agreeableness: 3.2, neuroticism: 2.5 },
        description: "Designs and builds software applications",
        keyTraits: ["High Openness", "High Conscientiousness", "Lower Extraversion"]
    },
    "Data Scientist": {
        traits: { openness: 4.5, conscientiousness: 4.2, extraversion: 2.8, agreeableness: 3.0, neuroticism: 2.3 },
        description: "Analyzes complex data to find insights",
        keyTraits: ["Very High Openness", "High Conscientiousness"]
    },
    "Teacher": {
        traits: { openness: 3.8, conscientiousness: 3.8, extraversion: 4.0, agreeableness: 4.5, neuroticism: 3.0 },
        description: "Educates and mentors students",
        keyTraits: ["High Agreeableness", "High Extraversion"]
    },
    "Nurse": {
        traits: { openness: 3.2, conscientiousness: 4.3, extraversion: 3.5, agreeableness: 4.8, neuroticism: 3.2 },
        description: "Provides patient care and medical support",
        keyTraits: ["Very High Agreeableness", "High Conscientiousness"]
    },
    "Doctor": {
        traits: { openness: 4.0, conscientiousness: 4.8, extraversion: 3.2, agreeableness: 4.0, neuroticism: 2.5 },
        description: "Diagnoses and treats medical conditions",
        keyTraits: ["Very High Conscientiousness", "High Openness"]
    },
    "Entrepreneur": {
        traits: { openness: 4.5, conscientiousness: 4.0, extraversion: 4.2, agreeableness: 3.0, neuroticism: 2.0 },
        description: "Starts and runs businesses",
        keyTraits: ["High Openness", "High Extraversion", "Low Neuroticism"]
    },
    "Artist": {
        traits: { openness: 4.9, conscientiousness: 2.8, extraversion: 3.0, agreeableness: 3.5, neuroticism: 3.8 },
        description: "Creates visual art and designs",
        keyTraits: ["Very High Openness", "Higher Neuroticism"]
    },
    "Writer": {
        traits: { openness: 4.8, conscientiousness: 3.2, extraversion: 2.5, agreeableness: 3.3, neuroticism: 3.5 },
        description: "Creates written content and stories",
        keyTraits: ["Very High Openness", "Lower Extraversion"]
    },
    "Sales Representative": {
        traits: { openness: 3.5, conscientiousness: 3.8, extraversion: 4.8, agreeableness: 3.8, neuroticism: 2.2 },
        description: "Sells products and builds client relationships",
        keyTraits: ["Very High Extraversion", "Low Neuroticism"]
    },
    "Accountant": {
        traits: { openness: 2.8, conscientiousness: 4.8, extraversion: 2.5, agreeableness: 3.5, neuroticism: 2.5 },
        description: "Manages financial records and reports",
        keyTraits: ["Very High Conscientiousness", "Lower Openness"]
    },
    "Lawyer": {
        traits: { openness: 3.8, conscientiousness: 4.5, extraversion: 3.8, agreeableness: 2.8, neuroticism: 2.8 },
        description: "Provides legal advice and representation",
        keyTraits: ["High Conscientiousness", "Lower Agreeableness"]
    },
    "Psychologist": {
        traits: { openness: 4.5, conscientiousness: 4.0, extraversion: 3.2, agreeableness: 4.5, neuroticism: 2.8 },
        description: "Studies behavior and provides therapy",
        keyTraits: ["High Openness", "High Agreeableness"]
    },
    "Project Manager": {
        traits: { openness: 3.5, conscientiousness: 4.5, extraversion: 4.0, agreeableness: 3.8, neuroticism: 2.5 },
        description: "Plans and oversees project execution",
        keyTraits: ["High Conscientiousness", "High Extraversion"]
    },
    "Research Scientist": {
        traits: { openness: 4.8, conscientiousness: 4.5, extraversion: 2.2, agreeableness: 3.0, neuroticism: 2.5 },
        description: "Conducts scientific research and experiments",
        keyTraits: ["Very High Openness", "High Conscientiousness", "Low Extraversion"]
    },
    "Marketing Manager": {
        traits: { openness: 4.2, conscientiousness: 3.8, extraversion: 4.3, agreeableness: 3.5, neuroticism: 2.8 },
        description: "Develops and executes marketing strategies",
        keyTraits: ["High Extraversion", "High Openness"]
    },
    "Social Worker": {
        traits: { openness: 3.8, conscientiousness: 3.8, extraversion: 3.5, agreeableness: 4.8, neuroticism: 3.3 },
        description: "Helps individuals and communities",
        keyTraits: ["Very High Agreeableness"]
    },
    "Engineer": {
        traits: { openness: 4.0, conscientiousness: 4.5, extraversion: 2.8, agreeableness: 3.2, neuroticism: 2.3 },
        description: "Designs and builds systems and structures",
        keyTraits: ["High Conscientiousness", "High Openness"]
    },
    "UX Designer": {
        traits: { openness: 4.5, conscientiousness: 3.8, extraversion: 3.2, agreeableness: 4.0, neuroticism: 2.8 },
        description: "Designs user-centered digital experiences",
        keyTraits: ["High Openness", "High Agreeableness"]
    },
    "Financial Analyst": {
        traits: { openness: 3.2, conscientiousness: 4.6, extraversion: 2.8, agreeableness: 3.0, neuroticism: 2.5 },
        description: "Analyzes financial data and trends",
        keyTraits: ["Very High Conscientiousness"]
    },
    "Human Resources Manager": {
        traits: { openness: 3.5, conscientiousness: 4.0, extraversion: 4.0, agreeableness: 4.3, neuroticism: 2.5 },
        description: "Manages employee relations and policies",
        keyTraits: ["High Agreeableness", "High Extraversion"]
    },
    "Pharmacist": {
        traits: { openness: 3.0, conscientiousness: 4.5, extraversion: 4.0, agreeableness: 4.5, neuroticism: 2.9 },
        description: "Manages employee relations and policies",
        keyTraits: ["High Agreeableness", "High Extraversion"]
    }
};

// ============================================
// Quiz State
// ============================================

const state = {
    currentQuestionIndex: 0,
    selectedQuestions: [],
    answers: [],
    scores: {
        openness: [],
        conscientiousness: [],
        extraversion: [],
        agreeableness: [],
        neuroticism: []
    },
    selectedAnswer: null
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    // Screens
    instructionScreen: document.getElementById('instruction-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultScreen: document.getElementById('result-screen'),
    
    // Buttons
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    restartQuizBtn: document.getElementById('restart-quiz-btn'),
    nextBtn: document.getElementById('next-btn'),
    answerButtons: document.getElementById('answer-buttons'),
    
    // Quiz elements
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    questionTrait: document.getElementById('question-trait'),
    questionText: document.getElementById('question-text'),
    
    // Results
    traitsChart: document.getElementById('traits-chart'),
    careersList: document.getElementById('careers-list'),
    
    // Navigation
    menuToggle: document.getElementById('menuToggle'),
    menu: document.getElementById('menu')
};

// ============================================
// Utility Functions
// ============================================

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Calculates the average of an array of numbers
 */
function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

/**
 * Calculates Euclidean distance between two trait profiles
 * Returns a similarity score from 0 to 100
 */
function calculateSimilarity(userProfile, careerProfile) {
    const traits = Object.keys(userProfile);
    
    // Calculate Euclidean distance
    const sumSquaredDiff = traits.reduce((sum, trait) => {
        const diff = userProfile[trait] - careerProfile[trait];
        return sum + (diff * diff);
    }, 0);
    
    const distance = Math.sqrt(sumSquaredDiff);
    
    // Maximum possible distance (all traits differ by 4 points: 5-1=4)
    const maxDistance = Math.sqrt(traits.length * 16); // sqrt(5 * 4^2) = sqrt(80)
    
    // Convert to similarity percentage (0-100)
    const similarity = (1 - (distance / maxDistance)) * 100;
    
    return Math.max(0, Math.min(100, similarity));
}

/**
 * Formats trait name for display
 */
function formatTraitName(trait) {
    return trait.charAt(0).toUpperCase() + trait.slice(1);
}

// ============================================
// Quiz Logic
// ============================================

/**
 * Selects questions for the quiz - equal distribution per trait
 */
function selectQuestions() {
    const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    let selected = [];
    
    traits.forEach(trait => {
        const traitQuestions = QUESTIONS.filter(q => q.trait === trait);
        const shuffled = shuffleArray(traitQuestions);
        selected = selected.concat(shuffled.slice(0, CONFIG.QUESTIONS_PER_TRAIT));
    });
    
    return shuffleArray(selected);
}

/**
 * Resets the quiz state
 */
function resetState() {
    state.currentQuestionIndex = 0;
    state.selectedQuestions = selectQuestions();
    state.answers = [];
    state.scores = {
        openness: [],
        conscientiousness: [],
        extraversion: [],
        agreeableness: [],
        neuroticism: []
    };
    state.selectedAnswer = null;
}

/**
 * Shows a specific screen and hides others
 */
function showScreen(screenName) {
    elements.instructionScreen.classList.remove('quiz__screen--active');
    elements.quizScreen.classList.remove('quiz__screen--active');
    elements.resultScreen.classList.remove('quiz__screen--active');
    
    switch (screenName) {
        case 'instruction':
            elements.instructionScreen.classList.add('quiz__screen--active');
            break;
        case 'quiz':
            elements.quizScreen.classList.add('quiz__screen--active');
            break;
        case 'result':
            elements.resultScreen.classList.add('quiz__screen--active');
            break;
    }
}

/**
 * Updates the progress bar
 */
function updateProgress() {
    const progress = ((state.currentQuestionIndex) / state.selectedQuestions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = `${state.currentQuestionIndex} / ${state.selectedQuestions.length}`;
}

/**
 * Displays the current question
 */
function showQuestion() {
    const question = state.selectedQuestions[state.currentQuestionIndex];
    
    elements.questionTrait.textContent = formatTraitName(question.trait);
    elements.questionText.textContent = `"${question.text}"`;
    
    // Reset answer buttons
    const buttons = elements.answerButtons.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.remove('answer-btn--selected'));
    
    state.selectedAnswer = null;
    elements.nextBtn.disabled = true;
    
    // Update button text for last question
    if (state.currentQuestionIndex === state.selectedQuestions.length - 1) {
        elements.nextBtn.textContent = 'See Results';
    } else {
        elements.nextBtn.textContent = 'Next Question';
    }
    
    updateProgress();
}

/**
 * Handles answer selection
 */
function selectAnswer(value, button) {
    // Remove selection from all buttons
    const buttons = elements.answerButtons.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.remove('answer-btn--selected'));
    
    // Select clicked button
    button.classList.add('answer-btn--selected');
    
    state.selectedAnswer = parseInt(value);
    elements.nextBtn.disabled = false;
}

/**
 * Processes the current answer and moves to next question
 */
function processAnswer() {
    if (state.selectedAnswer === null) return;
    
    const question = state.selectedQuestions[state.currentQuestionIndex];
    
    // Calculate score (reverse if needed)
    let score = state.selectedAnswer;
    if (question.reverse) {
        score = (CONFIG.SCALE_MAX + 1) - score; // Reverse: 5->1, 4->2, etc.
    }
    
    // Store the score for this trait
    state.scores[question.trait].push(score);
    state.answers.push({
        question: question.text,
        trait: question.trait,
        rawAnswer: state.selectedAnswer,
        processedScore: score
    });
    
    state.currentQuestionIndex++;
    
    if (state.currentQuestionIndex < state.selectedQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

/**
 * Calculates final trait scores (normalized 1-5 average)
 */
function calculateFinalScores() {
    return {
        openness: calculateAverage(state.scores.openness),
        conscientiousness: calculateAverage(state.scores.conscientiousness),
        extraversion: calculateAverage(state.scores.extraversion),
        agreeableness: calculateAverage(state.scores.agreeableness),
        neuroticism: calculateAverage(state.scores.neuroticism)
    };
}

/**
 * Finds matching careers based on personality profile
 */
function findMatchingCareers(userProfile) {
    const matches = Object.entries(CAREERS).map(([name, career]) => {
        const similarity = calculateSimilarity(userProfile, career.traits);
        return {
            name,
            similarity,
            ...career
        };
    });
    
    // Sort by similarity (highest first)
    matches.sort((a, b) => b.similarity - a.similarity);
    
    return matches.slice(0, CONFIG.TOP_CAREERS_TO_SHOW);
}

/**
 * Renders the trait bars in results
 */
function renderTraitBars(scores) {
    const traitsOrder = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    
    elements.traitsChart.innerHTML = traitsOrder.map(trait => {
        const score = scores[trait];
        const percentage = ((score - 1) / 4) * 100; // Convert 1-5 to 0-100%
        
        return `
            <div class="trait-bar trait-bar--${trait}">
                <span class="trait-bar__label">${formatTraitName(trait)}</span>
                <div class="trait-bar__track">
                    <div class="trait-bar__fill" style="width: ${percentage}%"></div>
                </div>
                <span class="trait-bar__value">${score.toFixed(1)}</span>
            </div>
        `;
    }).join('');
}

/**
 * Renders career cards in results
 */
function renderCareerCards(careers) {
    elements.careersList.innerHTML = careers.map((career, index) => `
        <div class="career-card">
            <div class="career-card__rank career-card__rank--${index + 1}">${index + 1}</div>
            <div class="career-card__content">
                <h4 class="career-card__name">${career.name}</h4>
                <p class="career-card__match">
                    Match: <span class="career-card__match-value">${career.similarity.toFixed(0)}%</span>
                </p>
                <div class="career-card__traits">
                    ${career.keyTraits.map(trait => `<span class="career-card__trait">${trait}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Shows the results screen
 */
function showResults() {
    const finalScores = calculateFinalScores();
    const matchingCareers = findMatchingCareers(finalScores);
    
    renderTraitBars(finalScores);
    renderCareerCards(matchingCareers);
    
    showScreen('result');
}

// ============================================
// Event Handlers
// ============================================

function startQuiz() {
    resetState();
    showScreen('quiz');
    showQuestion();
}

function restartQuiz() {
    showScreen('instruction');
}

// ============================================
// Initialization
// ============================================

function init() {
    // Start button
    elements.startBtn.addEventListener('click', startQuiz);
    
    // Restart buttons
    elements.restartBtn.addEventListener('click', restartQuiz);
    elements.restartQuizBtn.addEventListener('click', restartQuiz);
    
    // Next button
    elements.nextBtn.addEventListener('click', processAnswer);
    
    // Answer buttons
    elements.answerButtons.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectAnswer(btn.dataset.value, btn);
        });
    });
    
    // Mobile menu toggle
    elements.menuToggle.addEventListener('click', () => {
        elements.menu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.menu.contains(e.target) && !elements.menuToggle.contains(e.target)) {
            elements.menu.classList.remove('show');
        }
    });
    
    // Show instruction screen
    showScreen('instruction');
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
