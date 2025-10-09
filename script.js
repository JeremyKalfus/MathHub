// Math Training Hub - Main JavaScript File

// Global state management
const state = {
    totalQuestions: 0,
    correctAnswers: 0,
    currentModule: null,
    currentQuestion: null,
    selectedAnswer: null
};

// Progress tracking
function updateProgress() {
    document.getElementById('total-questions').textContent = state.totalQuestions;
    document.getElementById('correct-answers').textContent = state.correctAnswers;
    const accuracy = state.totalQuestions > 0 ? Math.round((state.correctAnswers / state.totalQuestions) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

// Navigation functions
function showModule(moduleName) {
    // Hide all modules
    document.querySelectorAll('.module-content').forEach(module => {
        module.classList.add('hidden');
    });
    
    // Show selected module
    const module = document.getElementById(moduleName + '-module');
    if (module) {
        module.classList.remove('hidden');
        state.currentModule = moduleName;
        
        // Initialize module-specific functionality
        initializeModule(moduleName);
    }
}

function showMainMenu() {
    document.querySelectorAll('.module-content').forEach(module => {
        module.classList.add('hidden');
    });
    state.currentModule = null;
}

function initializeModule(moduleName) {
    switch(moduleName) {
        case 'arithmetic':
            generateArithmeticQuestion();
            break;
        case 'unit-circle':
            generateUnitCircleQuestion();
            break;
        case 'factoring':
            generateFactoringQuestion();
            break;
        case 'derivatives':
            generateDerivativesQuestion();
            break;
    }
}

// Arithmetic Module
function generateArithmeticQuestion() {
    const difficulty = document.getElementById('arithmetic-difficulty').value;
    let maxValue;
    
    switch(difficulty) {
        case 'easy': maxValue = 10; break;
        case 'medium': maxValue = 50; break;
        case 'hard': maxValue = 100; break;
    }
    
    const operations = ['+', '-', '×', '÷'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer, question;
    
    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * maxValue) + 1;
            num2 = Math.floor(Math.random() * maxValue) + 1;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
        case '-':
            num1 = Math.floor(Math.random() * maxValue) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
        case '×':
            num1 = Math.floor(Math.random() * Math.min(maxValue, 12)) + 1;
            num2 = Math.floor(Math.random() * Math.min(maxValue, 12)) + 1;
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
        case '÷':
            num2 = Math.floor(Math.random() * Math.min(maxValue, 12)) + 1;
            answer = Math.floor(Math.random() * Math.min(maxValue, 12)) + 1;
            num1 = num2 * answer;
            question = `${num1} ÷ ${num2} = ?`;
            break;
    }
    
    state.currentQuestion = { question, answer, type: 'arithmetic' };
    document.getElementById('arithmetic-question').textContent = question;
    document.getElementById('arithmetic-answer').value = '';
    document.getElementById('arithmetic-feedback').textContent = '';
    document.getElementById('arithmetic-feedback').className = 'feedback';
}

function checkArithmeticAnswer() {
    const userAnswer = parseInt(document.getElementById('arithmetic-answer').value);
    const feedback = document.getElementById('arithmetic-feedback');
    
    state.totalQuestions++;
    
    if (userAnswer === state.currentQuestion.answer) {
        state.correctAnswers++;
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Incorrect. The answer is ${state.currentQuestion.answer}.`;
        feedback.className = 'feedback incorrect';
    }
    
    updateProgress();
}

// Unit Circle Module
function generateUnitCircleQuestion() {
    const angles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
    const angle = angles[Math.floor(Math.random() * angles.length)];
    const questionTypes = ['sin', 'cos', 'tan'];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let answer, question;
    const radians = angle * Math.PI / 180;
    
    switch(questionType) {
        case 'sin':
            answer = Math.round(Math.sin(radians) * 100) / 100;
            question = `What is sin(${angle}°)?`;
            break;
        case 'cos':
            answer = Math.round(Math.cos(radians) * 100) / 100;
            question = `What is cos(${angle}°)?`;
            break;
        case 'tan':
            answer = Math.round(Math.tan(radians) * 100) / 100;
            question = `What is tan(${angle}°)?`;
            break;
    }
    
    state.currentQuestion = { question, answer, type: 'unit-circle', angle, questionType };
    document.getElementById('unit-circle-question').textContent = question;
    
    // Generate answer options
    generateAnswerOptions(answer);
    
    // Draw unit circle
    drawUnitCircle(angle);
    
    document.getElementById('unit-circle-feedback').textContent = '';
    document.getElementById('unit-circle-feedback').className = 'feedback';
}

function generateAnswerOptions(correctAnswer) {
    const options = [correctAnswer];
    
    // Generate 3 incorrect options
    while (options.length < 4) {
        let option = Math.round((Math.random() * 2 - 1) * 100) / 100;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('unit-circle-options');
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectAnswer(optionElement, option);
        optionsContainer.appendChild(optionElement);
    });
}

function selectAnswer(element, value) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select current option
    element.classList.add('selected');
    state.selectedAnswer = value;
}

function drawUnitCircle(angle) {
    const canvas = document.getElementById('unit-circle-canvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw angle line
    const radians = angle * Math.PI / 180;
    const endX = centerX + radius * Math.cos(radians);
    const endY = centerY - radius * Math.sin(radians);
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#4a9eff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw angle arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, radians);
    ctx.strokeStyle = '#4a9eff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw angle label
    ctx.fillStyle = '#4a9eff';
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${angle}°`, centerX + 50, centerY - 20);
}

function checkUnitCircleAnswer() {
    const feedback = document.getElementById('unit-circle-feedback');
    
    state.totalQuestions++;
    
    if (state.selectedAnswer === state.currentQuestion.answer) {
        state.correctAnswers++;
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Incorrect. The answer is ${state.currentQuestion.answer}.`;
        feedback.className = 'feedback incorrect';
    }
    
    updateProgress();
}

// Factoring Module
function generateFactoringQuestion() {
    const type = document.getElementById('factoring-type').value;
    let question, answer;
    
    switch(type) {
        case 'quadratic':
            const a = Math.floor(Math.random() * 3) + 1;
            const b = Math.floor(Math.random() * 10) - 5;
            const c = Math.floor(Math.random() * 10) - 5;
            const d = Math.floor(Math.random() * 10) - 5;
            
            // Generate (ax + b)(cx + d)
            const expanded = `${a * c}x² + ${a * d + b * c}x + ${b * d}`;
            question = `Factor: ${expanded}`;
            answer = `(${a}x + ${b})(${c}x + ${d})`;
            break;
            
        case 'difference-squares':
            const num = Math.floor(Math.random() * 10) + 1;
            question = `Factor: x² - ${num * num}`;
            answer = `(x + ${num})(x - ${num})`;
            break;
            
        case 'perfect-square':
            const coeff = Math.floor(Math.random() * 3) + 1;
            const constant = Math.floor(Math.random() * 10) + 1;
            question = `Factor: ${coeff * coeff}x² + ${2 * coeff * constant}x + ${constant * constant}`;
            answer = `(${coeff}x + ${constant})²`;
            break;
    }
    
    state.currentQuestion = { question, answer, type: 'factoring' };
    document.getElementById('factoring-question').textContent = question;
    document.getElementById('factoring-answer').value = '';
    document.getElementById('factoring-feedback').textContent = '';
    document.getElementById('factoring-feedback').className = 'feedback';
}

function checkFactoringAnswer() {
    const userAnswer = document.getElementById('factoring-answer').value.trim();
    const feedback = document.getElementById('factoring-feedback');
    
    state.totalQuestions++;
    
    // Normalize answers for comparison
    const normalizeAnswer = (ans) => ans.replace(/\s/g, '').toLowerCase();
    
    if (normalizeAnswer(userAnswer) === normalizeAnswer(state.currentQuestion.answer)) {
        state.correctAnswers++;
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Incorrect. The answer is ${state.currentQuestion.answer}.`;
        feedback.className = 'feedback incorrect';
    }
    
    updateProgress();
}

// Derivatives Module
function generateDerivativesQuestion() {
    const type = document.getElementById('derivatives-type').value;
    let question, answer;
    
    switch(type) {
        case 'power':
            const power = Math.floor(Math.random() * 5) + 2;
            const coeff = Math.floor(Math.random() * 5) + 1;
            question = `Find the derivative: ${coeff}x^${power}`;
            if (power - 1 === 1) {
                answer = `${coeff * power}x`;
            } else {
                answer = `${coeff * power}x^${power - 1}`;
            }
            break;
            
        case 'product':
            const a = Math.floor(Math.random() * 3) + 1;
            const b = Math.floor(Math.random() * 3) + 1;
            question = `Find the derivative: (${a}x + 1)(${b}x + 2)`;
            answer = `${a * b * 2}x + ${a * 2 + b}`;
            break;
            
        case 'chain':
            const innerCoeff = Math.floor(Math.random() * 3) + 1;
            const outerPower = Math.floor(Math.random() * 3) + 2;
            question = `Find the derivative: (${innerCoeff}x + 1)^${outerPower}`;
            answer = `${outerPower * innerCoeff}(${innerCoeff}x + 1)^${outerPower - 1}`;
            break;
    }
    
    state.currentQuestion = { question, answer, type: 'derivatives' };
    document.getElementById('derivatives-question').textContent = question;
    document.getElementById('derivatives-answer').value = '';
    document.getElementById('derivatives-feedback').textContent = '';
    document.getElementById('derivatives-feedback').className = 'feedback';
}

function checkDerivativesAnswer() {
    const userAnswer = document.getElementById('derivatives-answer').value.trim();
    const feedback = document.getElementById('derivatives-feedback');
    
    state.totalQuestions++;
    
    // Normalize answers for comparison - handle x^1 = x
    const normalizeAnswer = (ans) => {
        return ans.replace(/\s/g, '').toLowerCase()
                  .replace(/x\^1/g, 'x')
                  .replace(/x\^1/g, 'x'); // Handle multiple occurrences
    };
    
    if (normalizeAnswer(userAnswer) === normalizeAnswer(state.currentQuestion.answer)) {
        state.correctAnswers++;
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Incorrect. The answer is ${state.currentQuestion.answer}.`;
        feedback.className = 'feedback incorrect';
    }
    
    updateProgress();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Module navigation
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function() {
            const module = this.getAttribute('data-module');
            showModule(module);
        });
    });
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', showMainMenu);
    });
    
    // Arithmetic module
    document.getElementById('check-arithmetic').addEventListener('click', checkArithmeticAnswer);
    document.getElementById('new-arithmetic').addEventListener('click', generateArithmeticQuestion);
    document.getElementById('arithmetic-difficulty').addEventListener('change', generateArithmeticQuestion);
    
    // Unit circle module
    document.getElementById('check-unit-circle').addEventListener('click', checkUnitCircleAnswer);
    document.getElementById('new-unit-circle').addEventListener('click', generateUnitCircleQuestion);
    
    // Factoring module
    document.getElementById('check-factoring').addEventListener('click', checkFactoringAnswer);
    document.getElementById('new-factoring').addEventListener('click', generateFactoringQuestion);
    document.getElementById('factoring-type').addEventListener('change', generateFactoringQuestion);
    
    // Derivatives module
    document.getElementById('check-derivatives').addEventListener('click', checkDerivativesAnswer);
    document.getElementById('new-derivatives').addEventListener('click', generateDerivativesQuestion);
    document.getElementById('derivatives-type').addEventListener('change', generateDerivativesQuestion);
    
    // Enter key support for input fields
    document.getElementById('arithmetic-answer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkArithmeticAnswer();
    });
    
    document.getElementById('factoring-answer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkFactoringAnswer();
    });
    
    document.getElementById('derivatives-answer').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkDerivativesAnswer();
    });
    
    // Initialize progress
    updateProgress();
});
