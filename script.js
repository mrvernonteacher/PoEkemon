// ==========================================
// 1. CONFIG & DATA
// ==========================================
const TILE_SIZE = 40;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 10;

const gymLeaders = {
    1: { name: "Prof. Torque", roster: [2, 7, 10] },
    2: { name: "Captain Code", roster: [11, 14, 20] },
    3: { name: "Dr. Watt", roster: [24, 27, 30] },
    4: { name: "Builder Bridge", roster: [31, 35, 40] },
    5: { name: "Mayor Transit", roster: [41, 44, 50] },
    6: { name: "Director Data", roster: [51, 53, 60] }
};

// 0: Path, 1: Grass, 2: Gym, 3: Wall/Tree
const unitMaps = {
    1: [
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
        [3,0,0,0,0,0,1,1,1,1,1,0,0,2,3],
        [3,0,1,1,0,0,1,1,1,1,1,0,0,0,3],
        [3,0,1,1,0,0,0,0,0,0,0,0,0,0,3],
        [3,0,0,0,0,3,3,3,3,3,0,1,1,0,3],
        [3,0,0,0,0,3,3,3,3,3,0,1,1,0,3],
        [3,1,1,0,0,0,0,0,0,0,0,0,0,0,3],
        [3,1,1,0,0,0,1,1,1,0,0,0,1,1,3],
        [3,0,0,0,0,0,1,1,1,0,0,0,1,1,3],
        [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
    ]
};

// ==========================================
// 2. GAME STATE
// ==========================================
let gameState = {
    playerCharacter: null,
    playerTeam: [],
    badges: [],
    currentUnit: 1,
    currentEnemy: null,
    isTrainerBattle: false,
    trainerMonIndex: 0
};

let playerPos = { x: 1, y: 1 };
const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// ==========================================
// 3. CORE ENGINE (Screens & Save)
// ==========================================
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`screen-${screenName}`);
    if (target) target.classList.remove('hidden');
    
    if (screenName === 'map') setTimeout(drawMap, 50);
}

function saveGame() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (saved) gameState = JSON.parse(saved);
}

// ==========================================
// 4. CHARACTER SELECTION
// ==========================================
window.selectStarter = function(char, id) {
    gameState.playerCharacter = char;
    const starter = poekedex.find(p => p.id === id);
    if (starter) {
        gameState.playerTeam = [{ ...starter, currentHP: starter.hp, maxHP: starter.hp }];
        gameState.currentUnit = 1;
        saveGame();
        showScreen('map');
    }
};

// ==========================================
// 5. MAP & MOVEMENT
// ==========================================
window.addEventListener('keydown', (e) => {
    if (document.getElementById('screen-map').classList.contains('hidden')) return;

    let newX = playerPos.x;
    let newY = playerPos.y;

    if (['ArrowUp', 'w'].includes(e.key)) newY--;
    if (['ArrowDown', 's'].includes(e.key)) newY++;
    if (['ArrowLeft', 'a'].includes(e.key)) newX--;
    if (['ArrowRight', 'd'].includes(e.key)) newX++;

    const currentMap = unitMaps[gameState.currentUnit];
    if (currentMap && currentMap[newY] && currentMap[newY][newX] !== 3) {
        playerPos.x = newX;
        playerPos.y = newY;
        drawMap();
        
        const tile = currentMap[newY][newX];
        if (tile === 1 && Math.random() < 0.12) startEncounter(gameState.currentUnit, false);
        if (tile === 2) startEncounter(gameState.currentUnit, true);
    }
});

function drawMap() {
    if (!ctx) return;
    const currentMap = unitMaps[gameState.currentUnit];
    
    currentMap.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === 0) ctx.fillStyle = "#e2e2e2"; // Path
            if (tile === 1) ctx.fillStyle = "#78c850"; // Grass
            if (tile === 2) ctx.fillStyle = "#ff6b6b"; // Gym
            if (tile === 3) ctx.fillStyle = "#2d4c1e"; // Walls
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    });
    drawPlayer();
}

function drawPlayer() {
    const px = playerPos.x * TILE_SIZE;
    const py = playerPos.y * TILE_SIZE;
    
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#27ae60" : "#2980b9";
    ctx.fillRect(px + 10, py + 10, 20, 25); // Body
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#2ecc71" : "#3498db";
    ctx.fillRect(px + 8, py + 5, 24, 15); // Head
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#333" : "#ecf0f1";
    ctx.fillRect(px + 10, py + 8, 20, 5); // Visor
}

// ==========================================
// 6. COMBAT ENGINE
// ==========================================
function startEncounter(unit, isGym) {
    gameState.isTrainerBattle = isGym;
    gameState.playerTeam[0].currentHP = gameState.playerTeam[0].maxHP;

    if (isGym) {
        const trainer = gymLeaders[unit];
        gameState.trainerMonIndex = 0;
        loadTrainerMon(trainer);
    } else {
        const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
        gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
        gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;
        document.getElementById('dialogue-box').textContent = `Wild ${gameState.currentEnemy.name} appeared!`;
        setupBattleUI();
    }
}

function loadTrainerMon(trainer) {
    const mon = poekedex.find(p => p.id === trainer.roster[gameState.trainerMonIndex]);
    gameState.currentEnemy = { ...mon, currentHP: mon.hp };
    document.getElementById('dialogue-box').textContent = `${trainer.name} sent out ${mon.name}!`;
    setupBattleUI();
}

function setupBattleUI() {
    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('action-menu').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
    showScreen('battle');
    updateHP();
}

window.executeAttack = function() {
    document.getElementById('action-menu').classList.add('hidden');
    gameState.currentEnemy.currentHP -= 10;
    document.getElementById('dialogue-box').textContent = `${gameState.playerTeam[0].name} used Force!`;
    updateHP();
    
    setTimeout(() => {
        if (gameState.currentEnemy.currentHP <= 0) handleDefeat();
        else enemyTurn();
    }, 1000);
};

function enemyTurn() {
    gameState.playerTeam[0].currentHP -= 8;
    document.getElementById('dialogue-box').textContent = `${gameState.currentEnemy.name} attacked!`;
    updateHP();
    
    setTimeout(() => {
        if (gameState.playerTeam[0].currentHP <= 0) {
            alert("Fainted!");
            showScreen('map');
        } else {
            document.getElementById('action-menu').classList.remove('hidden');
        }
    }, 1000);
}

// ==========================================
// 7. CAPTURE LOGIC
// ==========================================
window.attemptCapture = function() {
    if (gameState.isTrainerBattle) return alert("Can't catch Trainer PoEkemon!");
    
    document.getElementById('action-menu').classList.add('hidden');
    const questions = questionBank[gameState.currentUnit];
    const q = questions[Math.floor(Math.random() * questions.length)];
    
    document.getElementById('question-text').textContent = q.q;
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'answer-btn';
        b.textContent = opt;
        b.onclick = () => {
            if (i === q.ans) {
                gameState.playerTeam.push({ ...gameState.currentEnemy, maxHP: gameState.currentEnemy.hp });
                saveGame();
                alert("Caught!");
                showScreen('map');
            } else {
                alert("Broke free!");
                enemyTurn();
            }
        };
        grid.appendChild(b);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

function handleDefeat() {
    if (gameState.isTrainerBattle) {
        gameState.trainerMonIndex++;
        const trainer = gymLeaders[gameState.currentUnit];
        if (gameState.trainerMonIndex < trainer.roster.length) loadTrainerMon(trainer);
        else {
            if (!gameState.badges.includes(gameState.currentUnit)) gameState.badges.push(gameState.currentUnit);
            saveGame();
            alert("Gym Defeated!");
            showScreen('map');
        }
    } else {
        alert("Enemy fainted!");
        showScreen('map');
    }
}

function updateHP() {
    document.getElementById('enemy-hp').style.width = `${(gameState.currentEnemy.currentHP/gameState.currentEnemy.hp)*100}%`;
    document.getElementById('player-hp').style.width = `${(gameState.playerTeam[0].currentHP/gameState.playerTeam[0].maxHP)*100}%`;
}

// ==========================================
// 8. INITIALIZE
// ==========================================
window.onload = () => {
    loadGame();
    if (gameState.playerTeam.length === 0) showScreen('characterSelect');
    else showScreen('map');
    
    document.getElementById('btn-map').onclick = () => showScreen('map');
};
