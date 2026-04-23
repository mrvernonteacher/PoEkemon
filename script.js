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
    playerCharacter: null,
    playerTeam: [],
    badges: [],
    currentUnit: 1,
    currentEnemy: null,
    isTrainerBattle: false
};

let playerPos = { x: 1, y: 1 };

// ==========================================
// 2. SPRITE ENGINE
// ==========================================
window.drawCharacterSprite = function(ctx, x, y, size) {
    const s = size / 40;
    ctx.save();
    if (gameState.playerCharacter === 'MrV') {
        ctx.fillStyle = "#5d4037"; ctx.fillRect(x + (8*s), y + (4*s), 24*s, 16*s);
        ctx.fillStyle = "#e0ac69"; ctx.fillRect(x + (10*s), y + (6*s), 20*s, 10*s);
        ctx.fillStyle = "#000000"; ctx.fillRect(x + (10*s), y + (8*s), 20*s, 4*s);
        ctx.fillStyle = "#c62828"; ctx.fillRect(x + (10*s), y + (20*s), 20*s, 15*s);
        ctx.fillStyle = "#8e0000"; 
        ctx.fillRect(x + (10*s), y + (20*s), 5*s, 5*s); ctx.fillRect(x + (20*s), y + (20*s), 5*s, 5*s);
        ctx.fillRect(x + (15*s), y + (25*s), 5*s, 5*s); ctx.fillRect(x + (25*s), y + (25*s), 5*s, 5*s);
        ctx.fillStyle = "#1a237e"; ctx.fillRect(x + (12*s), y + (35*s), 7*s, 10*s); ctx.fillRect(x + (21*s), y + (35*s), 7*s, 10*s);
    } else {
        ctx.fillStyle = "#4e342e"; ctx.fillRect(x + (8*s), y + (4*s), 24*s, 18*s);
        ctx.fillStyle = "#ffffff"; ctx.fillRect(x + (8*s), y + (4*s), 18*s, 4*s);
        ctx.fillStyle = "#f5cbad"; ctx.fillRect(x + (12*s), y + (8*s), 16*s, 12*s);
        ctx.fillStyle = "#00acc1"; ctx.fillRect(x + (10*s), y + (22*s), 20*s, 10*s);
        ctx.fillStyle = "#ffffff"; ctx.fillRect(x + (9*s), y + (32*s), 22*s, 8*s);
        ctx.fillStyle = "#f5cbad"; ctx.fillRect(x + (13*s), y + (40*s), 5*s, 6*s); ctx.fillRect(x + (22*s), y + (40*s), 5*s, 6*s);
    }
    ctx.restore();
};

// ==========================================
// 3. UI & SAVE ENGINE
// ==========================================
window.showScreen = function(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('screen-' + name);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    if (name === 'map') setTimeout(window.drawMap, 50);
};

window.saveGame = function() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
};

window.loadGame = function() {
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (saved) gameState = JSON.parse(saved);
};

window.toggleSettings = function() {
    document.getElementById('settings-overlay').classList.toggle('hidden');
};

window.resetGame = function() {
    if (confirm("Reset progress?")) {
        localStorage.removeItem('PoEkemon_Waltonia_Save');
        location.reload();
    }
};

// ==========================================
// 4. MAP & STARTER
// ==========================================
window.selectStarter = function(char, id) {
    gameState.playerCharacter = char;
    const mon = poekedex.find(p => p.id === id);
    if (mon) {
        gameState.playerTeam = [{ ...mon, currentHP: mon.hp, maxHP: mon.hp }];
        window.saveGame();
        window.showScreen('map');
    }
};

window.drawMap = function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const map = unitMaps[gameState.currentUnit];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === 0) ctx.fillStyle = "#e2e2e2"; 
            if (tile === 1) ctx.fillStyle = "#78c850"; 
            if (tile === 2) ctx.fillStyle = "#ff6b6b"; 
            if (tile === 3) ctx.fillStyle = "#2d4c1e"; 
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    });
    window.drawCharacterSprite(ctx, playerPos.x * TILE_SIZE, playerPos.y * TILE_SIZE, TILE_SIZE);
};

window.addEventListener('keydown', (e) => {
    if (!document.getElementById('screen-map').classList.contains('active')) return;
    let nx = playerPos.x, ny = playerPos.y;
    if (['ArrowUp', 'w'].includes(e.key)) ny--;
    if (['ArrowDown', 's'].includes(e.key)) ny++;
    if (['ArrowLeft', 'a'].includes(e.key)) nx--;
    if (['ArrowRight', 'd'].includes(e.key)) nx++;
    const map = unitMaps[gameState.currentUnit];
    if (map && map[ny] && map[ny][nx] !== 3) {
        playerPos.x = nx; playerPos.y = ny;
        window.drawMap();
        if (map[ny][nx] === 1 && Math.random() < 0.12) window.startEncounter(gameState.currentUnit, false);
        if (map[ny][nx] === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// ==========================================
// 5. COMBAT ENGINE (THE FIX)
// ==========================================
window.startEncounter = function(unit, isGym) {
    const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    // Reset UI Elements
    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('dialogue-box').textContent = `Wild ${gameState.currentEnemy.name} appeared!`;
    
    // Explicitly show buttons and hide questions
    document.getElementById('action-menu').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
    
    window.showScreen('battle');
    window.updateHP();
    
    // Draw Sprite in Battle
    const pSprite = document.getElementById('player-sprite');
    pSprite.innerHTML = '<canvas id="bCanvas" width="80" height="80"></canvas>';
    const bCtx = document.getElementById('bCanvas').getContext('2d');
    window.drawCharacterSprite(bCtx, 0, 0, 80);
};

window.executeAttack = function() {
    document.getElementById('action-menu').classList.add('hidden');
    gameState.currentEnemy.currentHP -= 10;
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
    gameState.playerTeam[0].currentHP -= 8;
    document.getElementById('dialogue-box').textContent = `${gameState.currentEnemy.name} attacked back!`;
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
    const eHP = (gameState.currentEnemy.currentHP / gameState.currentEnemy.hp) * 100;
    const pHP = (gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP) * 100;
    document.getElementById('enemy-hp').style.width = eHP + "%";
    document.getElementById('player-hp').style.width = pHP + "%";
};

// ==========================================
// 6. INITIALIZE
// ==========================================
window.onload = () => {
    window.loadGame();
    document.getElementById('btn-settings').onclick = window.toggleSettings;
    document.getElementById('btn-map').onclick = () => window.showScreen('map');
    document.getElementById('btn-dex').onclick = () => window.showScreen('dex');

    if (!gameState.playerTeam || gameState.playerTeam.length === 0) window.showScreen('characterSelect');
    else window.showScreen('map');
};
