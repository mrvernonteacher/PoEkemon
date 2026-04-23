// ==========================================
// 1. GAME STATE & SAVE SYSTEM
// ==========================================

let gameState = {
    playerHP: 100,
    maxHP: 100,
    capturedIDs: [],
    currentUnit: null,
    currentEnemy: null,
    currentQuestion: null
};

// Load saved game from LocalStorage
function loadGame() {
    const savedData = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (savedData) {
        gameState = JSON.parse(savedData);
    }
}

// Save game to LocalStorage
function saveGame() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
}

// ==========================================
// 2. DOM ELEMENTS
// ==========================================

const screens = {
    map: document.getElementById('screen-map'),
    battle: document.getElementById('screen-battle'),
    dex: document.getElementById('screen-dex')
};

// Navigation
document.getElementById('btn-map').addEventListener('click', () => showScreen('map'));
document.getElementById('btn-dex').addEventListener('click', () => {
    renderDex();
    showScreen('dex');
});

// Map Elements
const mapGrid = document.getElementById('map-grid');

// Battle Elements
const enemyName = document.getElementById('enemy-name');
const enemyHPFill = document.getElementById('enemy-hp');
const playerHPFill = document.getElementById('player-hp');
const dialogueBox = document.getElementById('dialogue-box');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerGrid = document.getElementById('answer-grid');
const dexCount = document.getElementById('dex-count');
const dexGrid = document.getElementById('dex-grid');

// ==========================================
// 3. GAME LOGIC
// ==========================================

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    screens[screenName].classList.remove('hidden');
    screens[screenName].classList.add('active');
}

function initMap() {
    mapGrid.innerHTML = '';
    const unitNames = ["Mechanisms", "Control Systems", "Energy", "Statics/Materials", "Transportation", "Kinematics"];
    
    for (let i = 1; i <= 6; i++) {
        const btn = document.createElement('button');
        btn.className = 'map-btn';
        btn.innerHTML = `Unit ${i} <span>${unitNames[i-1]}</span>`;
        btn.onclick = () => startEncounter(i);
        mapGrid.appendChild(btn);
    }
}

function startEncounter(unitNumber) {
    gameState.currentUnit = unitNumber;
    
    // Filter PoEkemon by unit using the external poekedex array
    const unitMons = poekedex.filter(p => p.unit === unitNumber);
    if (unitMons.length === 0) {
        alert("No PoEkemon spotted here yet!");
        return;
    }

    // Pick random enemy
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    // Reset Player HP for the encounter
    gameState.playerHP = gameState.maxHP;
    updateHPBars();

    // Setup UI
    enemyName.textContent = `Wild ${gameState.currentEnemy.name}`;
    dialogueBox.textContent = `A wild ${gameState.currentEnemy.name} appeared! Prepare your engineering knowledge.`;
    dialogueBox.classList.remove('hidden');
    questionContainer.classList.add('hidden');

    showScreen('battle');

    // Wait 2 seconds, then show question
    setTimeout(loadNextQuestion, 2000);
}

function loadNextQuestion() {
    // Pull from the external questionBank object
    const questions = questionBank[gameState.currentUnit];
    
    // Check if questions exist for this unit yet
    if (!questions || questions.length === 0) {
        dialogueBox.textContent = "Error: No questions found for this unit.";
        dialogueBox.classList.remove('hidden');
        setTimeout(() => showScreen('map'), 2000);
        return;
    }

    gameState.currentQuestion = questions[Math.floor(Math.random() * questions.length)];

    dialogueBox.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    
    questionText.innerHTML = gameState.currentQuestion.q;
    answerGrid.innerHTML = '';

    gameState.currentQuestion.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(index);
        answerGrid.appendChild(btn);
    });
}

function handleAnswer(selectedIndex) {
    questionContainer.classList.add('hidden');
    dialogueBox.classList.remove('hidden');

    if (selectedIndex === gameState.currentQuestion.ans) {
        // Correct Answer
        const damage = 15; // Base damage
        gameState.currentEnemy.currentHP -= damage;
        dialogueBox.textContent = `Correct! You used "Applied Physics"! It was super effective.`;
        
        if (gameState.currentEnemy.currentHP <= 0) {
            catchPoEkemon();
        } else {
            setTimeout(loadNextQuestion, 2000);
        }
    } else {
        // Incorrect Answer
        const stressDamage = 25;
        gameState.playerHP -= stressDamage;
        dialogueBox.textContent = `Incorrect! The ${gameState.currentEnemy.name} caused you ${stressDamage} Stress Damage!`;
        
        if (gameState.playerHP <= 0) {
            setTimeout(() => {
                dialogueBox.textContent = "Your Stress reached maximum! You blacked out and fled to the Map.";
                setTimeout(() => showScreen('map'), 3000);
            }, 2000);
        } else {
            setTimeout(loadNextQuestion, 2000);
        }
    }
    updateHPBars();
}

function catchPoEkemon() {
    gameState.currentEnemy.currentHP = 0;
    updateHPBars();
    
    dialogueBox.textContent = `Gotcha! ${gameState.currentEnemy.name} was caught!`;
    
    if (!gameState.capturedIDs.includes(gameState.currentEnemy.id)) {
        gameState.capturedIDs.push(gameState.currentEnemy.id);
        saveGame();
    }

    setTimeout(() => {
        showScreen('map');
    }, 3000);
}

function updateHPBars() {
    // Player HP
    const playerPct = Math.max(0, (gameState.playerHP / gameState.maxHP) * 100);
    playerHPFill.style.width = `${playerPct}%`;
    playerHPFill.style.backgroundColor = playerPct > 30 ? "var(--hp-green)" : "red";

    // Enemy HP
    if(gameState.currentEnemy) {
        const enemyPct = Math.max(0, (gameState.currentEnemy.currentHP / gameState.currentEnemy.hp) * 100);
        enemyHPFill.style.width = `${enemyPct}%`;
    }
}

function renderDex() {
    dexGrid.innerHTML = '';
    dexCount.textContent = gameState.capturedIDs.length;

    // Check if poekedex is loaded to avoid errors
    if (typeof poekedex === 'undefined') return;

    poekedex.forEach(mon => {
        const isCaptured = gameState.capturedIDs.includes(mon.id);
        const div = document.createElement('div');
        div.className = `dex-entry ${isCaptured ? 'captured' : ''}`;
        
        div.innerHTML = `
            <div class="dex-sprite-placeholder"></div>
            <h4>#${mon.id} ${isCaptured ? mon.name : '???'}</h4>
            <p style="font-size: 6px;">${isCaptured ? mon.type : 'Unknown'}</p>
        `;
        dexGrid.appendChild(div);
    });
}

// ==========================================
// 4. INITIALIZE
// ==========================================
// Wait for all scripts to load before initializing
window.onload = () => {
    loadGame();
    initMap();
    renderDex();
    showScreen('map');
};
