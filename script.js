// ==========================================
// 1. DATA & CONFIG
// ==========================================
const TILE_SIZE = 40;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 10;

const gymLeaders = {
    1: { name: "Prof. Torque", roster: [2, 7, 10] },
    2: { name: "Captain Code", roster: [11, 14, 20] }
};

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
    isTrainerBattle: false
};

let playerPos = { x: 1, y: 1 };
const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// ==========================================
// 3. CORE UTILITIES
// ==========================================
window.showScreen = function(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`screen-${screenName}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    if (screenName === 'map') setTimeout(window.drawMap, 50);
};

window.saveGame = function() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
};

window.loadGame = function() {
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (saved) gameState = JSON.parse(saved);
};

window.resetGame = function() {
    if (confirm("Reset all progress?")) {
        localStorage.removeItem('PoEkemon_Waltonia_Save');
        location.reload();
    }
};

window.toggleSettings = function() {
    document.getElementById('settings-overlay').classList.toggle('hidden');
};

// ==========================================
// 4. CHARACTER & MAP LOGIC
// ==========================================
window.selectStarter = function(char, id) {
    gameState.playerCharacter = char;
    const starter = poekedex.find(p => p.id === id);
    if (starter) {
        gameState.playerTeam = [{ ...starter, currentHP: starter.hp, maxHP: starter.hp }];
        gameState.currentUnit = 1;
        window.saveGame();
        window.showScreen('map');
    }
};

window.drawMap = function() {
    if (!ctx) return;
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
    window.renderSprite(ctx, playerPos.x * TILE_SIZE, playerPos.y * TILE_SIZE);
};

// SHARED SPRITE RENDERER
window.renderSprite = function(context, x, y) {
    context.save();
    if (gameState.playerCharacter === 'MrV') {
        context.fillStyle = "#5d4037"; context.fillRect(x + 8, y + 4, 24, 16); // Hair
        context.fillStyle = "#e0ac69"; context.fillRect(x + 10, y + 6, 20, 10); // Face
        context.fillStyle = "#000"; context.fillRect(x + 10, y + 8, 20, 4); // Shades
        context.fillStyle = "#c62828"; context.fillRect(x + 10, y + 20, 20, 15); // Shirt
        context.fillStyle = "#1a237e"; context.fillRect(x + 12, y + 35, 7, 10); // L Leg
        context.fillRect(x + 21, y + 35, 7, 10); // R Leg
    } else {
        context.fillStyle = "#4e342e"; context.fillRect(x + 8, y + 4, 24, 18); // Hair
        context.fillStyle = "#ffffff"; context.fillRect(x + 8, y + 4, 18, 4); // Band
        context.fillStyle = "#f5cbad"; context.fillRect(x + 12, y + 8, 16, 12); // Face
        context.fillStyle = "#00acc1"; context.fillRect(x + 10, y + 22, 20, 10); // Top
        context.fillStyle = "#ffffff"; context.fillRect(x + 9, y + 32, 22, 8); // Skirt
        context.fillStyle = "#f5cbad"; context.fillRect(x + 13, y + 40, 5, 6); // L Leg
        context.fillRect(x + 22, y + 40, 5, 6); // R Leg
    }
    context.restore();
};

window.addEventListener('keydown', (e) => {
    if (!document.getElementById('screen-map').classList.contains('active')) return;
    let nX = playerPos.x, nY = playerPos.y;
    if (['ArrowUp', 'w'].includes(e.key)) nY--;
    if (['ArrowDown', 's'].includes(e.key)) nY++;
    if (['ArrowLeft', 'a'].includes(e.key)) nX--;
    if (['ArrowRight', 'd'].includes(e.key)) nX++;

    const map = unitMaps[gameState.currentUnit];
    if (map && map[nY] && map[nY][nX] !== 3) {
        playerPos.x = nX; playerPos.y = nY;
        window.drawMap();
        if (map[nY][nX] === 1 && Math.random() < 0.15) window.startEncounter(gameState.currentUnit, false);
        if (map[nY][nX] === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// ==========================================
// 5. COMBAT ENGINE
// ==========================================
window.startEncounter = function(unit, isGym) {
    gameState.isTrainerBattle = isGym;
    const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('dialogue-box').textContent = `A wild ${gameState.currentEnemy.name} appeared!`;
    
    document.getElementById('action-menu').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
    
    window.showScreen('battle');
    window.updateHP();
    
    // Render Player Sprite in Battle
    const pSpriteBox = document.getElementById('player-sprite');
    pSpriteBox.innerHTML = '<canvas id="battleCanvas" width="50" height="50"></canvas>';
    const bCtx = document.getElementById('battleCanvas').getContext('2d');
    window.renderSprite(bCtx, 5, 0);
};

window.executeAttack = function() {
    document.getElementById('action-menu').classList.add('hidden');
    gameState.currentEnemy.currentHP -= 10;
    document.getElementById('dialogue-box').textContent = `${gameState.playerTeam[0].name} used Force!`;
    window.updateHP();

    setTimeout(() => {
        if (gameState.currentEnemy.currentHP <= 0) {
            alert("Enemy fainted!");
            window.showScreen('map');
        } else {
            window.enemyTurn();
        }
    }, 1000);
};

window.enemyTurn = function() {
    gameState.playerTeam[0].currentHP -= 8;
    document.getElementById('dialogue-box').textContent = `${gameState.currentEnemy.name} dealt damage!`;
    window.updateHP();

    setTimeout(() => {
        if (gameState.playerTeam[0].currentHP <= 0) {
            alert("Fainted!");
            gameState.playerTeam[0].currentHP = gameState.playerTeam[0].maxHP;
            window.showScreen('map');
        } else {
            document.getElementById('action-menu').classList.remove('hidden');
        }
    }, 1000);
};

window.attemptCapture = function() {
    document.getElementById('action-menu').classList.add('hidden');
    const q = questionBank[gameState.currentUnit][0]; // Simplified for testing
    document.getElementById('question-text').textContent = q.q;
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            if (i === q.ans) {
                alert("Caught!");
                gameState.playerTeam.push({ ...gameState.currentEnemy, maxHP: gameState.currentEnemy.hp });
                window.saveGame();
                window.showScreen('map');
            } else {
                alert("Failed!");
                window.enemyTurn();
            }
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

window.updateHP = function() {
    document.getElementById('enemy-hp').style.width = (gameState.currentEnemy.currentHP/gameState.currentEnemy.hp)*100 + "%";
    document.getElementById('player-hp').style.width = (gameState.playerTeam[0].currentHP/gameState.playerTeam[0].maxHP)*100 + "%";
};

// ==========================================
// 6. INITIALIZE
// ==========================================
window.onload = () => {
    window.loadGame();
    if (!gameState.playerTeam || gameState.playerTeam.length === 0) window.showScreen('characterSelect');
    else window.showScreen('map');

    document.getElementById('btn-map').onclick = () => window.showScreen('map');
    document.getElementById('btn-settings').onclick = window.toggleSettings;
};
