/**
 * Future Authoring Program
 * Based on Jordan Peterson's Self-Authoring program
 * Converted from Streamlit to native HTML/CSS/JS
 */

// Questions data structure
const SECTIONS = [
    {
        id: 'intro',
        type: 'intro',
        title: 'Future Authoring',
        subtitle: 'In this exercise you will begin to create a version, in writing, of your ideal future.',
        content: `William James, the great American psychologist, once remarked that he did not know what he thought until he had written his thoughts down. When he didn't know what to write, he wrote about anything that came to mind. Eventually, his ideas became focused and clarified.

Brainstorm. Write whatever comes to mind. Don't worry too much about sentence construction, spelling, or grammar. There will be plenty of time to write polished sentences later. Avoid criticizing what you write. Premature criticism interferes with the creative process.`
    },
    {
        id: 'part1-header',
        type: 'header',
        title: 'Part 1: Imagining Your Ideal Future'
    },
    {
        id: 'q1',
        type: 'text-input',
        section: '1.1',
        title: 'One Thing You Could Do Better',
        question: 'If you could choose only one thing that you could do better, what would it be?',
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q2',
        type: 'text-input',
        section: '1.2',
        title: 'Things to Learn About',
        question: 'What would you like to learn more about, in the next six months? Two years? Five years?',
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q3',
        type: 'text-input',
        section: '1.3',
        title: 'Improve Your Habits',
        question: 'What habits would you like to improve?',
        subQuestions: [
            'At school?',
            'At work?',
            'With friends and family?',
            'For your health?',
            'With regards to smoking/alcohol/drug use?'
        ],
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q4',
        type: 'text-input',
        section: '1.4',
        title: 'Your Social Life in the Future',
        question: 'Describe your ideal social life.',
        content: `Friends and associates are an important part of a meaningful, productive life. Take a moment to consider your social network.

Think about the friends you might want to have, and the connections you might want to make. It is perfectly reasonable to choose friends and associates who are good for you.`,
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q5',
        type: 'text-input',
        section: '1.5',
        title: 'Your Leisure Activity in the Future',
        question: 'What activities would you like to pursue outside of obligations?',
        content: `Take a moment to consider the activities you would like to pursue outside of obligations such as work, family and school. The activities you choose should be worthwhile and personally meaningful.

Without a plan, people often default to whatever is easiest, such as television watching, and waste their private time. If you waste 4 hours a day, which is not uncommon, then you are wasting 1400 hours a year. That is equivalent to 35 40-hour work weeks, which is almost as much as the typical individual spends at his or her job every year.

If your time is worth $25 per hour, then you are wasting time worth $35,000 per year. Over a 50-year period, that is $1.8 million dollars, not counting interest or any increase in the value of your time as you develop.`,
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q6',
        type: 'text-input',
        section: '1.6',
        title: 'Your Family Life in the Future',
        question: 'Describe what your ideal family would be like.',
        content: `Take a moment to consider your home and family life. Peaceful, harmonious family life provides people with a sense of belonging, support for their ambitions, and reciprocal purpose.

You can write about your parents and siblings, or about your plans for your own partner, or about your children, if any - or about all of these. What kind of partner would be good for you? How could you improve your relationship with your parents or siblings?`,
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q7',
        type: 'text-input',
        section: '1.7',
        title: 'Your Career in the Future',
        question: 'Where do you want to be in six months? Two years? Five years? Why? What are you trying to accomplish?',
        content: `Much of what people find engaging in life is related to their careers. A good career provides security, status, interest, and the possibility of contributing to the community.

Take a moment to consider your school or work careers, or both.`,
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'q8',
        type: 'text-input',
        section: '1.8',
        title: 'Qualities You Admire',
        question: 'Who are the two or three people you most admire? Which qualities do they possess that you wish you had?',
        content: `People you automatically admire have qualities that you would like to possess or imitate. Identifying those qualities can help you determine who it is that you want to be.

Take a moment to think about the two or three people you most admire.`,
        hint: 'Think and write for at least two minutes, then move on.',
        inputType: 'short'
    },
    {
        id: 'summary-header',
        type: 'header',
        title: 'Complete Summaries',
        subtitle: 'Now you will write more detailed visions of your future'
    },
    {
        id: 'q9',
        type: 'text-input',
        section: 'Summary 1',
        title: 'The Ideal Future: Complete Summary',
        question: 'Write about the ideal future that you have just imagined.',
        content: `Now you have written briefly about your future, and have had some time to consider more specific issues. This step gives you the chance to integrate all the things that you have just thought and wrote about.

Close your eyes. Daydream, if you can, and imagine your ideal future:
- Who do you want to be?
- What do you want to do?
- Where do you want to end up?
- Why do you want these things?
- How do you plan to achieve your goals?
- When will you put your plans into action?

Write continuously and try not to stop while you are writing. Don't worry about spelling or grammar. You will have an opportunity to fix your mistakes later.

Dream while you write, and don't stop. Write at least until 15 minutes have passed. Be ambitious. Imagine a life that you would regard as honourable, exciting, productive, creative and decent.

Remember, you are writing only for yourself. Choose goals that you want to pursue for your own private reasons, not because someone else thinks that those goals are important. You don't want to live someone else's life.

Include your deepest thoughts and feelings about all your personal goals.`,
        hint: 'Write for at least 15 minutes.',
        inputType: 'long'
    },
    {
        id: 'q10',
        type: 'text-input',
        section: 'Summary 2',
        title: 'A Future to Avoid: Complete Summary',
        question: 'Write about the future you want to avoid.',
        content: `You have now written about the future you would like to have. Clearly defining your future can help reduce the uncertainty in your life, and reduce the amount of negative emotion that you chronically experience, in consequence. This is good for your confidence and for your health.

Having well-defined goals also increases your chances of experiencing positive emotion, as people experience most of their hope and joy and curiosity and engagement as a consequence of pursuing valued goals (and not, as people generally think, by attaining them).

It can also be very useful to deeply imagine the future you would like to avoid. You probably know people who have made very bad decisions, and who end up with a life that nobody would want. You also likely have weaknesses yourself. If you let those get out of control, then you might also end up with a miserable, painful life.

Most people know how their life could go downhill if they let it. Spend some time, now, thinking about what your life would be like if you failed to define or pursue your goals, if you let your bad habits get out of control, and if you ended up miserable, resentful and bitter.

Imagine your life three to five years down the road, if you failed to stay on the path you know you should be on. Use your imagination. Draw on your knowledge of the anxiety and pain you have experienced in the past, when you have betrayed yourself.

Think about the people you know who have made bad decisions or remained indecisive, or who chronically deceive themselves or other people, or who let cynicism and anger dominate their lives.

Where do you not want to be? Dream while you write, and don't stop. Write at least until 15 minutes have passed. Let yourself form a very clear picture of the undesirable future.`,
        hint: 'Write for at least 15 minutes.',
        inputType: 'long'
    },
    {
        id: 'goals-header',
        type: 'header',
        title: 'Stage 2: Specific Goal Identification',
        subtitle: 'Define and break down your ideal future into specific goals'
    },
    {
        id: 'goals-intro',
        type: 'info',
        content: `In this stage, you will first be asked to define and personally title your overall future plan. Then, you will be asked to take your general plans for the ideal future and break them up into more specific goals. Each of these separate goals will also be given its own title. This step will help you clarify your goals.

Please specify a title and brief description for your ideal future as a whole. This can be as simple as "My Ideal Future," in both fields, or, if you have something more personal in mind, you can specify that.

Imagine that you are both specifying and summarizing your ambitions with this title. This will help you remember what you are aiming for. In later screens you can define, prioritize, and analyse specific goals.

Please break down your ideal future into 8 goals. You can re-word, re-write and organize the relevant material from earlier for your goal summaries, if you wish, or you can rely on your memory.

The exercise allows you to specify a minimum of 6 goals, but people who identify 8 have better results with this exercise. These specific goals can be from a number of different domains:
- A personal goal might be "I would like to be healthier."
- A career goal might be "I would like to be more interested in my job."
- A social goal might be "I would like to meet more people."

The summaries you write about each goal should be reasonably brief and memorable. Make sure that each goal summary includes nothing but the most important information. You will have 10-15 minutes for this part of the exercise. Feel free to revise and edit.`
    },
    {
        id: 'goal1',
        type: 'goal',
        number: 1,
        title: 'Goal 1'
    },
    {
        id: 'goal2',
        type: 'goal',
        number: 2,
        title: 'Goal 2'
    },
    {
        id: 'goal3',
        type: 'goal',
        number: 3,
        title: 'Goal 3'
    },
    {
        id: 'goal4',
        type: 'goal',
        number: 4,
        title: 'Goal 4'
    },
    {
        id: 'goal5',
        type: 'goal',
        number: 5,
        title: 'Goal 5'
    },
    {
        id: 'goal6',
        type: 'goal',
        number: 6,
        title: 'Goal 6'
    },
    {
        id: 'goal7',
        type: 'goal',
        number: 7,
        title: 'Goal 7'
    },
    {
        id: 'goal8',
        type: 'goal',
        number: 8,
        title: 'Goal 8'
    }
];

// Application state
let currentStep = 0;
let answers = {};

// LocalStorage key for persistence
const STORAGE_KEY = 'futureAuthoring_answers';

// Initialize the application
function init() {
    loadFromStorage();
    renderCurrentStep();
    updateProgress();
    setupEventListeners();
}

// Load answers from localStorage
function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            answers = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading from storage:', e);
    }
}

// Save answers to localStorage
function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
}

// Update progress bar
function updateProgress() {
    const totalSteps = SECTIONS.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (progressText) {
        progressText.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
    }
}

// Render the current step
function renderCurrentStep() {
    const section = SECTIONS[currentStep];
    const container = document.getElementById('content-container');
    
    if (!container) return;
    
    let html = '';
    
    switch (section.type) {
        case 'intro':
            html = renderIntro(section);
            break;
        case 'header':
            html = renderHeader(section);
            break;
        case 'info':
            html = renderInfo(section);
            break;
        case 'text-input':
            html = renderTextInput(section);
            break;
        case 'goal':
            html = renderGoal(section);
            break;
    }
    
    container.innerHTML = html;
    
    // Focus on input if present
    const input = container.querySelector('input, textarea');
    if (input) {
        input.focus();
    }
    
    // Update button states
    updateNavigationButtons();
}

// Render intro section
function renderIntro(section) {
    return `
        <div class="future__intro">
            <h2 class="future__title">${section.title}</h2>
            <h3 class="future__subtitle">${section.subtitle}</h3>
            <div class="future__content">
                <p>${section.content.replace(/\n\n/g, '</p><p>')}</p>
            </div>
        </div>
    `;
}

// Render header section
function renderHeader(section) {
    return `
        <div class="future__header-section">
            <h2 class="future__section-title">${section.title}</h2>
            ${section.subtitle ? `<p class="future__section-subtitle">${section.subtitle}</p>` : ''}
        </div>
    `;
}

// Render info section
function renderInfo(section) {
    const paragraphs = section.content.split('\n\n').map(p => `<p>${p}</p>`).join('');
    return `
        <div class="future__info">
            ${paragraphs}
        </div>
    `;
}

// Render text input section
function renderTextInput(section) {
    const savedValue = answers[section.id] || '';
    const isLong = section.inputType === 'long';
    
    let subQuestionsHtml = '';
    if (section.subQuestions) {
        subQuestionsHtml = `
            <ul class="future__sub-questions">
                ${section.subQuestions.map(q => `<li>${q}</li>`).join('')}
            </ul>
        `;
    }
    
    return `
        <div class="future__question">
            <div class="future__question-header">
                <span class="future__question-section">${section.section}</span>
                <h3 class="future__question-title">${section.title}</h3>
            </div>
            ${section.content ? `<div class="future__question-content"><p>${section.content.replace(/\n\n/g, '</p><p>')}</p></div>` : ''}
            <p class="future__question-text">${section.question}</p>
            ${subQuestionsHtml}
            <p class="future__hint">${section.hint}</p>
            ${isLong 
                ? `<textarea 
                    id="answer-${section.id}" 
                    class="future__textarea" 
                    placeholder="Write your thoughts here..."
                    rows="12"
                    oninput="handleInput('${section.id}', this.value)"
                >${savedValue}</textarea>`
                : `<textarea 
                    id="answer-${section.id}" 
                    class="future__input" 
                    placeholder="Write your thoughts here..."
                    rows="4"
                    oninput="handleInput('${section.id}', this.value)"
                >${savedValue}</textarea>`
            }
        </div>
    `;
}

// Render goal input
function renderGoal(section) {
    const savedValue = answers[section.id] || '';
    
    return `
        <div class="future__goal">
            <div class="future__goal-header">
                <span class="future__goal-number">${section.number}</span>
                <h3 class="future__goal-title">${section.title}</h3>
            </div>
            <input 
                type="text" 
                id="answer-${section.id}" 
                class="future__goal-input" 
                placeholder="Enter your goal title..."
                value="${savedValue}"
                oninput="handleInput('${section.id}', this.value)"
            />
        </div>
    `;
}

// Handle input changes
function handleInput(id, value) {
    answers[id] = value;
    saveToStorage();
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentStep === 0;
    }
    
    if (nextBtn) {
        if (currentStep === SECTIONS.length - 1) {
            nextBtn.textContent = 'Complete';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
}

// Navigate to next step
function nextStep() {
    if (currentStep < SECTIONS.length - 1) {
        currentStep++;
        renderCurrentStep();
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        showCompletion();
    }
}

// Navigate to previous step
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderCurrentStep();
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Show completion screen
function showCompletion() {
    const container = document.getElementById('content-container');
    
    container.innerHTML = `
        <div class="future__completion">
            <div class="future__completion-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h2 class="future__title">Congratulations!</h2>
            <p class="future__completion-text">
                You have completed the Future Authoring exercise. Your responses have been saved locally in your browser.
            </p>
            <p class="future__completion-text">
                Download your responses as a Word document to keep a permanent record of your future vision and goals.
            </p>
            <div class="future__completion-actions">
                <button class="btn btn--primary" onclick="downloadAsWord()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download as Word Document
                </button>
                <button class="btn btn--secondary" onclick="restartExercise()">
                    Start Over
                </button>
            </div>
        </div>
    `;
    
    // Hide navigation
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
}

// Download responses as Word document
function downloadAsWord() {
    // Build the document content
    let content = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" 
              xmlns:w="urn:schemas-microsoft-com:office:word" 
              xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <title>Future Authoring Program</title>
            <style>
                body { font-family: Calibri, Arial, sans-serif; line-height: 1.6; margin: 40px; }
                h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
                h2 { color: #1e293b; margin-top: 30px; }
                h3 { color: #64748b; margin-top: 20px; }
                .section { margin-bottom: 30px; }
                .question { font-weight: bold; color: #1e293b; margin-bottom: 10px; }
                .answer { background: #f8fafc; padding: 15px; border-left: 4px solid #6366f1; margin-bottom: 20px; }
                .goal { margin: 10px 0; padding: 10px; background: #f1f5f9; }
            </style>
        </head>
        <body>
            <h1>Future Authoring Program</h1>
            <p>Completed on: ${new Date().toLocaleDateString()}</p>
    `;
    
    // Add Part 1 answers
    content += `<h2>Part 1: Imagining Your Ideal Future</h2>`;
    
    for (let i = 1; i <= 8; i++) {
        const section = SECTIONS.find(s => s.id === `q${i}`);
        if (section && answers[section.id]) {
            content += `
                <div class="section">
                    <h3>${section.section}: ${section.title}</h3>
                    <p class="question">${section.question}</p>
                    <div class="answer">${answers[section.id].replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }
    }
    
    // Add summaries
    content += `<h2>Complete Summaries</h2>`;
    
    const idealFuture = SECTIONS.find(s => s.id === 'q9');
    if (idealFuture && answers['q9']) {
        content += `
            <div class="section">
                <h3>${idealFuture.title}</h3>
                <div class="answer">${answers['q9'].replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }
    
    const futureToAvoid = SECTIONS.find(s => s.id === 'q10');
    if (futureToAvoid && answers['q10']) {
        content += `
            <div class="section">
                <h3>${futureToAvoid.title}</h3>
                <div class="answer">${answers['q10'].replace(/\n/g, '<br>')}</div>
            </div>
        `;
    }
    
    // Add goals
    content += `<h2>Your Goals</h2>`;
    
    for (let i = 1; i <= 8; i++) {
        if (answers[`goal${i}`]) {
            content += `<div class="goal"><strong>Goal ${i}:</strong> ${answers[`goal${i}`]}</div>`;
        }
    }
    
    content += `
            </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Future_Authoring_Responses.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Restart the exercise
function restartExercise() {
    if (confirm('Are you sure you want to start over? This will clear all your saved responses.')) {
        answers = {};
        localStorage.removeItem(STORAGE_KEY);
        currentStep = 0;
        
        // Show navigation again
        document.getElementById('prev-btn').style.display = '';
        document.getElementById('next-btn').style.display = '';
        
        renderCurrentStep();
        updateProgress();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn')?.addEventListener('click', prevStep);
    document.getElementById('next-btn')?.addEventListener('click', nextStep);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Don't navigate if user is typing
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            nextStep();
        } else if (e.key === 'ArrowLeft') {
            prevStep();
        }
    });
}

// Mobile menu toggle (shared with other pages)
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('show');
        });
        
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.classList.remove('show');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupMobileMenu();
});
