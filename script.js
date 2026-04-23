// ==========================================
// 1. GAME DATA (The PoEkdex & Questions)
// ==========================================

const poEkdex = [
    // Unit 1: Mechanisms
    { id: 1, name: "Fulcru", unit: 1, type: "Mechanisms", desc: "A see-saw creature that gains Mechanical Advantage.", hp: 20 },
    { id: 2, name: "Spurite", unit: 1, type: "Mechanisms", desc: "A small gear that grows into a planetary system.", hp: 25 },
    { id: 3, name: "Pulle-pup", unit: 1, type: "Mechanisms", desc: "Uses rope-like vines to lift heavy objects.", hp: 22 },
    // Unit 2: Machine Control
    { id: 4, name: "Vex-el", unit: 2, type: "Control", desc: "A small brain-chip creature with wire limbs.", hp: 30 },
    { id: 5, name: "Loop-a", unit: 2, type: "Control", desc: "Trapped in a While loop.", hp: 28 },
    // Unit 3: Energy
    { id: 6, name: "Sola-ray", unit: 3, type: "Energy", desc: "Absorbs sunlight to charge its battery.", hp: 35 },
    // Unit 4: Statics
    { id: 7, name: "Truss-tle", unit: 4, type: "Statics", desc: "A turtle whose shell is a perfectly balanced truss.", hp: 50 },
    // Unit 5: Transportation
    { id: 8, name: "Flow-ey", unit: 5, type: "Transport", desc: "Moves faster in groups.", hp: 40 },
    // Unit 6: Kinematics
    { id: 9, name: "Proj-ec", unit: 6, type: "Kinematics", desc: "Launches itself at a specific angle and velocity.", hp: 45 }
];

const questionBank = {
    1: [ // Unit 1: Mechanisms
        {
            q: "If a first-class lever has an effort arm of 10 ft and a resistance arm of 2 ft, what is the Ideal Mechanical Advantage (IMA)?",
            options: ["5", "12", "0.2", "8"],
            ans: 0 // Index of correct option
        },
        {
            q: "In a gear train, if the drive gear has 10 teeth and the driven gear has 40 teeth, what happens to the torque and speed?",
            options: ["Torque increases, speed decreases", "Torque decreases, speed increases", "Both increase", "Both decrease"],
            ans: 0
        },
        {
            q: "How much Work is done if a 50 lb force moves an object 10 feet? ($W = F \\times d$)",
            options: ["500 ft-lbs", "5 ft-lbs", "50 ft-lbs", "60 ft-lbs"],
            ans: 0
        }
    ],
    2: [ // Unit 2: VEX/Control
        {
            q: "Which of the following is considered an ANALOG sensor?",
            options: ["Potentiometer", "Bumper Switch", "Limit Switch", "LED"],
            ans: 0
        }
    ],
    3: [ // Unit 3: Energy
        {
            q: "What type of heat transfer occurs through direct physical contact?",
            options: ["Conduction", "Convection", "Radiation", "Insulation"],
            ans: 0
        }
    ],
    4: [ // Unit 4: Statics
        {
            q: "What is the condition where the sum of all forces and moments acting on a body equals zero?",
            options: ["Static Equilibrium", "Dynamic Kinematics", "Centroidal Axis", "Yield Point"],
            ans: 0
        }
    ],
    5: [ // Unit 5: Transportation
        {
            q: "In traffic engineering, what does 'Headway' refer to?",
            options: ["Time between vehicles passing a point", "Top speed of a car", "Width of the lane", "Stopping distance"],
            ans: 0
        }
    ],
    6: [ // Unit 6: Kinematics
        {
            q: "Ignoring air resistance, at what angle should a projectile be launched to achieve maximum horizontal distance?",
            options: ["45 degrees", "90 degrees", "30 degrees", "60 degrees"],
            ans: 0
        }
    ]
};

// ==========================================
// 2. GAME STATE & SAVE SYSTEM
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
// 3. DOM ELEMENTS
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
// 4. GAME LOGIC
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
    
    // Filter PoEkemon by unit
    const unitMons = poEkdex.filter(p => p.unit === unitNumber);
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

    poEkdex.forEach(mon => {
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
// 5. INITIALIZE
// ==========================================
loadGame();
initMap();
renderDex();
showScreen('map');
