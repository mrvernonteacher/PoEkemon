// ==========================================
// 1. DATA & CONFIG
// ==========================================
const TILE_SIZE = 40;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 10;

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

let gameState = {
    playerCharacter: 'MrV', // Default if load fails
    playerTeam: [],
    badges: [],
    currentUnit: 1,
    currentEnemy: null,
    isTrainerBattle: false
};

let playerPos = { x: 1, y: 1 };

// ==========================================
// 2. CORE ENGINE
// ==========================================

window.showScreen = function(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`screen-${screenName}`);
    if (target) target.classList.remove('hidden');
    if (screenName === 'map') setTimeout(window.drawMap, 50);
};

window.saveGame = function() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
};

window.loadGame = function() {
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (saved) gameState = JSON.parse(saved);
};

// NEW: Reset Function (Type 'resetGame()' in F12 console to clear)
window.resetGame = function() {
    localStorage.removeItem('PoEkemon_Waltonia_Save');
    location.reload();
};

// ==========================================
// 3. SELECTION & MAP
// ==========================================

window.selectStarter = function(char, id) {
    gameState.playerCharacter = char;
    const starter = poekedex.find(p => p.id === id);
    if (starter) {
        gameState.playerTeam = [{ ...starter, currentHP: starter.hp, maxHP: starter.hp }];
        window.saveGame();
        window.showScreen('map');
    }
};

window.drawMap = function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const currentMap = unitMaps[gameState.currentUnit];
    
    currentMap.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === 0) ctx.fillStyle = "#e2e2e2"; 
            if (tile === 1) ctx.fillStyle = "#78c850"; 
            if (tile === 2) ctx.fillStyle = "#ff6b6b"; 
            if (tile === 3) ctx.fillStyle = "#2d4c1e"; 
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    });

    // Draw Player (IEDRunner Style)
    const px = playerPos.x * TILE_SIZE;
    const py = playerPos.y * TILE_SIZE;
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#27ae60" : "#2980b9";
    ctx.fillRect(px + 10, py + 10, 20, 25);
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#2ecc71" : "#3498db";
    ctx.fillRect(px + 8, py + 5, 24, 15);
    ctx.fillStyle = "#333";
    ctx.fillRect(px + 10, py + 8, 20, 5);
};

window.addEventListener('keydown', (e) => {
    if (!document.getElementById('screen-map').classList.contains('active') && 
        document.getElementById('screen-map').classList.contains('hidden')) return;

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
        window.drawMap();
        
        const tile = currentMap[newY][newX];
        if (tile === 1 && Math.random() < 0.15) window.startEncounter(gameState.currentUnit, false);
        if (tile === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// ==========================================
// 4. COMBAT & CAPTURE
// ==========================================

window.startEncounter = function(unit, isGym) {
    gameState.isTrainerBattle = isGym;
    // Basic Wild Spawn
    const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    // UI Setup
    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('dialogue-box').textContent = `A wild ${gameState.currentEnemy.name} appeared!`;
    document.getElementById('action-menu').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
    
    window.showScreen('battle');
    window.updateHP();
};

window.executeAttack = function() {
    document.getElementById('action-menu').classList.add('hidden');
    const damage = 10;
    gameState.currentEnemy.currentHP -= damage;
    document.getElementById('dialogue-box').textContent = `${gameState.playerTeam[0].name} used Applied Force!`;
    window.updateHP();

    setTimeout(() => {
        if (gameState.currentEnemy.currentHP <= 0) {
            alert("The enemy fainted!");
            window.showScreen('map');
        } else {
            window.enemyTurn();
        }
    }, 1000);
};

window.enemyTurn = function() {
    const damage = 8;
    gameState.playerTeam[0].currentHP -= damage;
    document.getElementById('dialogue-box').textContent = `${gameState.currentEnemy.name} dealt stress damage!`;
    window.updateHP();

    setTimeout(() => {
        if (gameState.playerTeam[0].currentHP <= 0) {
            alert("Your PoEkemon fainted! Returning to safety.");
            gameState.playerTeam[0].currentHP = gameState.playerTeam[0].maxHP;
            window.showScreen('map');
        } else {
            document.getElementById('action-menu').classList.remove('hidden');
        }
    }, 1000);
};

window.attemptCapture = function() {
    document.getElementById('action-menu').classList.add('hidden');
    const questions = questionBank[gameState.currentUnit];
    const q = questions[Math.floor(Math.random() * questions.length)];
    
    document.getElementById('question-text').textContent = q.q;
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            if (i === q.ans) {
                alert("Correct! You caught " + gameState.currentEnemy.name + "!");
                gameState.playerTeam.push({ ...gameState.currentEnemy, maxHP: gameState.currentEnemy.hp });
                window.saveGame();
                window.showScreen('map');
            } else {
                alert("Incorrect! It broke free!");
                window.enemyTurn();
            }
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

window.updateHP = function() {
    const enemyPct = (gameState.currentEnemy.currentHP / gameState.currentEnemy.hp) * 100;
    const playerPct = (gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP) * 100;
    document.getElementById('enemy-hp').style.width = enemyPct + "%";
    document.getElementById('player-hp').style.width = playerPct + "%";
};

// ==========================================
// 5. INITIALIZE
// ==========================================
window.onload = () => {
    window.loadGame();
    if (gameState.playerTeam.length === 0) {
        window.showScreen('characterSelect');
    } else {
        window.showScreen('map');
    }
};
// --- ADD THESE TO THE BOTTOM OF SCRIPT.JS ---

window.toggleSettings = function() {
    const settings = document.getElementById('settings-overlay');
    settings.classList.toggle('hidden');
};

// Explicitly attaching the button listener for the settings icon
document.getElementById('btn-settings').onclick = window.toggleSettings;

window.resetGame = function() {
    if (confirm("Are you sure? This will delete all your PoEkemon and progress!")) {
        localStorage.removeItem('PoEkemon_Waltonia_Save');
        location.reload();
    }
};

// Ensure this matches your existing load logic
window.onload = () => {
    window.loadGame();
    // Force character select if team is empty
    if (!gameState.playerTeam || gameState.playerTeam.length === 0) {
        window.showScreen('characterSelect');
    } else {
        window.showScreen('map');
    }
    
    // Wire up navigation
    document.getElementById('btn-map').onclick = () => window.showScreen('map');
    document.getElementById('btn-dex').onclick = () => {
        if (typeof renderDex === 'function') renderDex();
        window.showScreen('dex');
    };
};
