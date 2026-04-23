// ==========================================
// 1. GYM LEADER DATA & GAME STATE
// ==========================================

// Defines the Gym Leaders and their 3-creature rosters (by PoEkedex ID)
const gymLeaders = {
    1: { name: "Prof. Torque", roster: [2, 7, 10] },      // Mechanisms
    2: { name: "Captain Code", roster: [11, 14, 20] },    // VEX Control
    3: { name: "Dr. Watt", roster: [24, 27, 30] },        // Energy
    4: { name: "Builder Bridge", roster: [31, 35, 40] },  // Statics
    5: { name: "Mayor Transit", roster: [41, 44, 50] },   // Transportation
    6: { name: "Director Data", roster: [51, 53, 60] }    // Kinematics/AI
};

let gameState = {
    playerHP: 100,
    maxHP: 100,
    capturedIDs: [],
    badges: [], // Tracks defeated Gyms
    currentUnit: null,
    currentEnemy: null,
    currentQuestion: null,
    isTrainerBattle: false,
    currentTrainer: null,
    trainerMonIndex: 0
};

// Load saved game from LocalStorage
function loadGame() {
    const savedData = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (savedData) {
        gameState = JSON.parse(savedData);
        // Safety check for older saves that didn't have badges
        if (!gameState.badges) gameState.badges = []; 
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

// Map & Battle Elements
const mapGrid = document.getElementById('map-grid');
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
    const unitNames = ["Mechanisms", "Control Systems", "Energy", "Statics", "Transportation", "Kinematics"];
    
    for (let i = 1; i <= 6; i++) {
        // Create a wrapper for the two buttons per unit
        const unitDiv = document.createElement('div');
        unitDiv.style.display = 'flex';
        unitDiv.style.flexDirection = 'column';
        unitDiv.style.gap = '8px';

        // Wild Encounter Button
        const wildBtn = document.createElement('button');
        wildBtn.className = 'map-btn';
        wildBtn.innerHTML = `Unit ${i}: ${unitNames[i-1]} <span>Tall Grass (Catch)</span>`;
        wildBtn.onclick = () => startEncounter(i, false);

        // Gym Leader Button
        const isBeaten = gameState.badges.includes(i);
        const gymBtn = document.createElement('button');
        gymBtn.className = 'map-btn';
        gymBtn.style.backgroundColor = isBeaten ? '#ffd700' : '#ff6b6b'; // Gold if beaten, Red if not
        gymBtn.innerHTML = `Unit ${i} Gym <span>${isBeaten ? 'Badge Earned!' : 'Challenge Leader'}</span>`;
        gymBtn.onclick = () => startEncounter(i, true);

        unitDiv.appendChild(wildBtn);
        unitDiv.appendChild(gymBtn);
        mapGrid.appendChild(unitDiv);
    }
}

function startEncounter(unitNumber, isGymBattle) {
    gameState.currentUnit = unitNumber;
    gameState.isTrainerBattle = isGymBattle;
    gameState.playerHP = gameState.maxHP; // Reset Player HP for the run

    if (isGymBattle) {
        // Setup Gym Leader Run
        gameState.currentTrainer = gymLeaders[unitNumber];
        gameState.trainerMonIndex = 0;
        loadTrainerMon();
    } else {
        // Setup Wild Encounter (Filter out the boss types so they are gym exclusive)
        const unitMons = poekedex.filter(p => p.unit === unitNumber && !p.type.includes("Boss"));
        if (unitMons.length === 0) {
            alert("No wild PoEkemon spotted here yet!");
            return;
        }

        gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
        gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

        enemyName.textContent = `Wild ${gameState.currentEnemy.name}`;
        dialogueBox.textContent = `A wild ${gameState.currentEnemy.name} appeared!`;
        
        setupBattleUI();
    }
}

function loadTrainerMon() {
    const monID = gameState.currentTrainer.roster[gameState.trainerMonIndex];
    const baseMon = poekedex.find(p => p.id === monID);
    
    gameState.currentEnemy = { ...baseMon };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    enemyName.textContent = gameState.currentEnemy.name;
    
    if (gameState.trainerMonIndex === 0) {
        dialogueBox.textContent = `Gym Leader ${gameState.currentTrainer.name} challenges you! They sent out ${gameState.currentEnemy.name}!`;
    } else {
        dialogueBox.textContent = `${gameState.currentTrainer.name} sent out ${gameState.currentEnemy.name}!`;
    }

    setupBattleUI();
}

function setupBattleUI() {
    dialogueBox.classList.remove('hidden');
    questionContainer.classList.add('hidden');
    showScreen('battle');
    updateHPBars();
    setTimeout(loadNextQuestion, 2000);
}

function loadNextQuestion() {
    const questions = questionBank[gameState.currentUnit];
    
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
        const damage = 15;
        gameState.currentEnemy.currentHP -= damage;
        dialogueBox.textContent = `Correct! You used "Applied Physics"!`;
        
        if (gameState.currentEnemy.currentHP <= 0) {
            handleEnemyDefeat();
        } else {
            setTimeout(loadNextQuestion, 1500);
        }
    } else {
        // Incorrect Answer
        const stressDamage = 25;
        gameState.playerHP -= stressDamage;
        dialogueBox.textContent = `Incorrect! The ${gameState.currentEnemy.name} caused you ${stressDamage} Stress Damage!`;
        
        if (gameState.playerHP <= 0) {
            setTimeout(() => {
                dialogueBox.textContent = "Your Stress reached maximum! You blacked out and fled.";
                setTimeout(() => showScreen('map'), 3000);
            }, 2000);
        } else {
            setTimeout(loadNextQuestion, 2000);
        }
    }
    updateHPBars();
}

function handleEnemyDefeat() {
    gameState.currentEnemy.currentHP = 0;
    updateHPBars();

    if (gameState.isTrainerBattle) {
        // Progress to next Gym Leader PoEkemon
        gameState.trainerMonIndex++;
        if (gameState.trainerMonIndex < gameState.currentTrainer.roster.length) {
            dialogueBox.textContent = `The opposing ${gameState.currentEnemy.name} fainted!`;
            setTimeout(loadTrainerMon, 2500);
        } else {
            // Defeated the entire Gym
            dialogueBox.textContent = `You defeated Gym Leader ${gameState.currentTrainer.name}! You earned the Unit ${gameState.currentUnit} Badge!`;
            if (!gameState.badges.includes(gameState.currentUnit)) {
                gameState.badges.push(gameState.currentUnit);
                saveGame();
            }
            setTimeout(() => {
                initMap(); // Refresh map to show the new gold badge color
                showScreen('map');
            }, 4000);
        }
    } else {
        // Wild Encounter Capture
        dialogueBox.textContent = `Gotcha! ${gameState.currentEnemy.name} was caught!`;
        if (!gameState.capturedIDs.includes(gameState.currentEnemy.id)) {
            gameState.capturedIDs.push(gameState.currentEnemy.id);
            saveGame();
        }
        setTimeout(() => showScreen('map'), 2500);
    }
}

function updateHPBars() {
    const playerPct = Math.max(0, (gameState.playerHP / gameState.maxHP) * 100);
    playerHPFill.style.width = `${playerPct}%`;
    playerHPFill.style.backgroundColor = playerPct > 30 ? "var(--hp-green)" : "red";

    if(gameState.currentEnemy) {
        const enemyPct = Math.max(0, (gameState.currentEnemy.currentHP / gameState.currentEnemy.hp) * 100);
        enemyHPFill.style.width = `${enemyPct}%`;
    }
}

function renderDex() {
    dexGrid.innerHTML = '';
    dexCount.textContent = gameState.capturedIDs.length;

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
window.onload = () => {
    loadGame();
    initMap();
    renderDex();
    showScreen('map');
};
