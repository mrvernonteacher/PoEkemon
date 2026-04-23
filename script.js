// ==========================================
// 1. GYM LEADER DATA & GAME STATE
// ==========================================

const gymLeaders = {
    1: { name: "Prof. Torque", roster: [2, 7, 10] },
    2: { name: "Captain Code", roster: [11, 14, 20] },
    3: { name: "Dr. Watt", roster: [24, 27, 30] },
    4: { name: "Builder Bridge", roster: [31, 35, 40] },
    5: { name: "Mayor Transit", roster: [41, 44, 50] },
    6: { name: "Director Data", roster: [51, 53, 60] }
};

let gameState = {
    playerCharacter: null, // 'MrV' or 'MsG'
    playerTeam: [],        // Array containing captured PoEkemon objects
    badges: [],
    currentUnit: null,
    currentEnemy: null,
    currentQuestion: null,
    isTrainerBattle: false,
    currentTrainer: null,
    trainerMonIndex: 0
};

// Load saved game
function loadGame() {
    const savedData = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (savedData) {
        gameState = JSON.parse(savedData);
    }
}

// Save game
function saveGame() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
}

// ==========================================
// 2. DOM ELEMENTS (Assuming HTML updates)
// ==========================================

const screens = {
    characterSelect: document.getElementById('screen-character-select'), // NEW
    map: document.getElementById('screen-map'),
    battle: document.getElementById('screen-battle'),
    dex: document.getElementById('screen-dex')
};

// Navigation
document.getElementById('btn-map').addEventListener('click', () => {
    if (gameState.playerTeam.length > 0) showScreen('map');
});
document.getElementById('btn-dex').addEventListener('click', () => {
    if (gameState.playerTeam.length > 0) {
        renderDex();
        showScreen('dex');
    }
});

const mapGrid = document.getElementById('map-grid');
const enemyName = document.getElementById('enemy-name');
const enemyHPFill = document.getElementById('enemy-hp');
const playerName = document.getElementById('player-name'); // NEW: Replaces "Your Stress"
const playerHPFill = document.getElementById('player-hp');
const dialogueBox = document.getElementById('dialogue-box');
const actionMenu = document.getElementById('action-menu'); // NEW: Holds Attack & Catch buttons
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerGrid = document.getElementById('answer-grid');
const dexCount = document.getElementById('dex-count');
const dexGrid = document.getElementById('dex-grid');

// ==========================================
// 3. GAME LOGIC & INITIALIZATION
// ==========================================

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        if(screen) {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        }
    });
    if(screens[screenName]) {
        screens[screenName].classList.remove('hidden');
        screens[screenName].classList.add('active');
    }
}

// NEW: Character Selection Logic
function selectStarter(character, starterID) {
    gameState.playerCharacter = character;
    const starter = poekedex.find(p => p.id === starterID);
    
    // Give it full HP to start
    const myStarter = { ...starter, currentHP: starter.hp, maxHP: starter.hp };
    gameState.playerTeam.push(myStarter);
    
    saveGame();
    initMap();
    showScreen('map');
}

function initMap() {
    mapGrid.innerHTML = '';
    const unitNames = ["Mechanisms", "Control Systems", "Energy", "Statics", "Transportation", "Kinematics"];
    
    for (let i = 1; i <= 6; i++) {
        const unitDiv = document.createElement('div');
        unitDiv.style.display = 'flex';
        unitDiv.style.flexDirection = 'column';
        unitDiv.style.gap = '8px';

        const wildBtn = document.createElement('button');
        wildBtn.className = 'map-btn';
        wildBtn.innerHTML = `Unit ${i}: ${unitNames[i-1]} <span>Tall Grass (Catch)</span>`;
        wildBtn.onclick = () => startEncounter(i, false);

        const isBeaten = gameState.badges.includes(i);
        const gymBtn = document.createElement('button');
        gymBtn.className = 'map-btn';
        gymBtn.style.backgroundColor = isBeaten ? '#ffd700' : '#ff6b6b';
        gymBtn.innerHTML = `Unit ${i} Gym <span>${isBeaten ? 'Badge Earned!' : 'Challenge Leader'}</span>`;
        gymBtn.onclick = () => startEncounter(i, true);

        unitDiv.appendChild(wildBtn);
        unitDiv.appendChild(gymBtn);
        mapGrid.appendChild(unitDiv);
    }
}

// ==========================================
// 4. COMBAT ENGINE (RPG Style)
// ==========================================

function startEncounter(unitNumber, isGymBattle) {
    gameState.currentUnit = unitNumber;
    gameState.isTrainerBattle = isGymBattle;
    
    // Heal lead PoEkemon for the encounter (Simplified for now)
    gameState.playerTeam[0].currentHP = gameState.playerTeam[0].maxHP;

    if (isGymBattle) {
        gameState.currentTrainer = gymLeaders[unitNumber];
        gameState.trainerMonIndex = 0;
        loadTrainerMon();
    } else {
        const unitMons = poekedex.filter(p => p.unit === unitNumber && !p.type.includes("Boss"));
        gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
        gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

        enemyName.textContent = `Wild ${gameState.currentEnemy.name}`;
        dialogueBox.textContent = `A wild ${gameState.currentEnemy.name} appeared! Go, ${gameState.playerTeam[0].name}!`;
        setupBattleUI();
    }
}

function loadTrainerMon() {
    const monID = gameState.currentTrainer.roster[gameState.trainerMonIndex];
    const baseMon = poekedex.find(p => p.id === monID);
    
    gameState.currentEnemy = { ...baseMon };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    enemyName.textContent = gameState.currentEnemy.name;
    dialogueBox.textContent = `${gameState.currentTrainer.name} sent out ${gameState.currentEnemy.name}!`;

    setupBattleUI();
}

function setupBattleUI() {
    playerName.textContent = gameState.playerTeam[0].name;
    
    // Show Action Menu (Attack / Catch), hide Questions
    actionMenu.classList.remove('hidden');
    questionContainer.classList.add('hidden');
    dialogueBox.classList.remove('hidden');
    
    showScreen('battle');
    updateHPBars();
}

// NEW: Standard Attack (No questions)
function executeAttack() {
    actionMenu.classList.add('hidden');
    
    const damage = 10; // Base damage
    gameState.currentEnemy.currentHP -= damage;
    dialogueBox.textContent = `${gameState.playerTeam[0].name} used Applied Force!`;
    updateHPBars();

    setTimeout(() => {
        if (gameState.currentEnemy.currentHP <= 0) {
            handleEnemyDefeat();
        } else {
            enemyCounterAttack();
        }
    }, 1500);
}

// NEW: Enemy Turn
function enemyCounterAttack() {
    const damage = 10;
    gameState.playerTeam[0].currentHP -= damage;
    dialogueBox.textContent = `The opposing ${gameState.currentEnemy.name} attacked!`;
    updateHPBars();

    setTimeout(() => {
        if (gameState.playerTeam[0].currentHP <= 0) {
            dialogueBox.textContent = `${gameState.playerTeam[0].name} fainted! You blacked out.`;
            setTimeout(() => showScreen('map'), 2500);
        } else {
            // Player's turn again
            actionMenu.classList.remove('hidden');
        }
    }, 1500);
}

// ==========================================
// 5. CAPTURE ENGINE (Questions Live Here)
// ==========================================

function attemptCapture() {
    if (gameState.isTrainerBattle) {
        dialogueBox.textContent = "You can't catch a Gym Leader's PoEkemon!";
        return;
    }

    actionMenu.classList.add('hidden');
    const questions = questionBank[gameState.currentUnit];
    gameState.currentQuestion = questions[Math.floor(Math.random() * questions.length)];

    dialogueBox.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    questionText.innerHTML = gameState.currentQuestion.q;
    answerGrid.innerHTML = '';

    gameState.currentQuestion.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => handleCaptureAnswer(index);
        answerGrid.appendChild(btn);
    });
}

function handleCaptureAnswer(selectedIndex) {
    questionContainer.classList.add('hidden');
    dialogueBox.classList.remove('hidden');

    if (selectedIndex === gameState.currentQuestion.ans) {
        // Correct - Successful Catch!
        gameState.currentEnemy.currentHP = 0;
        updateHPBars();
        dialogueBox.textContent = `Gotcha! ${gameState.currentEnemy.name} was caught!`;
        
        // Add to team and dex
        gameState.playerTeam.push({ ...gameState.currentEnemy, maxHP: gameState.currentEnemy.hp });
        saveGame();
        
        setTimeout(() => showScreen('map'), 2500);
    } else {
        // Incorrect - Breaks free
        dialogueBox.textContent = `Oh no! The PoEkemon broke free!`;
        setTimeout(() => {
            enemyCounterAttack();
        }, 1500);
    }
}

function handleEnemyDefeat() {
    gameState.currentEnemy.currentHP = 0;
    updateHPBars();

    if (gameState.isTrainerBattle) {
        gameState.trainerMonIndex++;
        if (gameState.trainerMonIndex < gameState.currentTrainer.roster.length) {
            dialogueBox.textContent = `The opposing ${gameState.currentEnemy.name} fainted!`;
            setTimeout(loadTrainerMon, 2000);
        } else {
            dialogueBox.textContent = `You defeated ${gameState.currentTrainer.name}! You earned the Unit ${gameState.currentUnit} Badge!`;
            if (!gameState.badges.includes(gameState.currentUnit)) {
                gameState.badges.push(gameState.currentUnit);
                saveGame();
            }
            setTimeout(() => {
                initMap();
                showScreen('map');
            }, 3500);
        }
    } else {
        dialogueBox.textContent = `The wild ${gameState.currentEnemy.name} fainted!`;
        setTimeout(() => showScreen('map'), 2000);
    }
}

function updateHPBars() {
    const playerPct = Math.max(0, (gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP) * 100);
    playerHPFill.style.width = `${playerPct}%`;
    playerHPFill.style.backgroundColor = playerPct > 30 ? "var(--hp-green)" : "red";

    if(gameState.currentEnemy) {
        const enemyPct = Math.max(0, (gameState.currentEnemy.currentHP / gameState.currentEnemy.hp) * 100);
        enemyHPFill.style.width = `${enemyPct}%`;
    }
}

function renderDex() {
    dexGrid.innerHTML = '';
    
    // We count unique IDs in the player's team to simulate the "Pokedex" count
    const uniqueCaptured = [...new Set(gameState.playerTeam.map(mon => mon.id))];
    dexCount.textContent = uniqueCaptured.length;

    poekedex.forEach(mon => {
        const isCaptured = uniqueCaptured.includes(mon.id);
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
// 6. INITIALIZE
// ==========================================
window.onload = () => {
    loadGame();
    // If no team exists, they must pick a character first
    if (gameState.playerTeam.length === 0) {
        showScreen('characterSelect');
    } else {
        initMap();
        renderDex();
        showScreen('map');
    }
};
