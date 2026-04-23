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

// ==========================================
// 3. SPRITE DRAWING ENGINE (IED Runner Style)
// ==========================================
window.drawCharacterSprite = function(ctx, x, y, size) {
    const s = size / 40; // Scale factor
    ctx.save();
    
    if (gameState.playerCharacter === 'MrV') {
        // Hair/Beard
        ctx.fillStyle = "#5d4037"; ctx.fillRect(x + (8*s), y + (4*s), 24*s, 16*s);
        // Face
        ctx.fillStyle = "#e0ac69"; ctx.fillRect(x + (10*s), y + (6*s), 20*s, 10*s);
        // Shades
        ctx.fillStyle = "#000000"; ctx.fillRect(x + (10*s), y + (8*s), 20*s, 4*s);
        // Flannel Shirt (Checkered Red)
        ctx.fillStyle = "#c62828"; ctx.fillRect(x + (10*s), y + (20*s), 20*s, 15*s);
        ctx.fillStyle = "#8e0000"; 
        ctx.fillRect(x + (10*s), y + (20*s), 5*s, 5*s);
        ctx.fillRect(x + (20*s), y + (20*s), 5*s, 5*s);
        ctx.fillRect(x + (15*s), y + (25*s), 5*s, 5*s);
        ctx.fillRect(x + (25*s), y + (25*s), 5*s, 5*s);
        // Blue Jeans
        ctx.fillStyle = "#1a237e";
        ctx.fillRect(x + (12*s), y + (35*s), 7*s, 10*s);
        ctx.fillRect(x + (21*s), y + (35*s), 7*s, 10*s);
    } else {
        // Hair
        ctx.fillStyle = "#4e342e"; ctx.fillRect(x + (8*s), y + (4*s), 24*s, 18*s);
        // Headband
        ctx.fillStyle = "#ffffff"; ctx.fillRect(x + (8*s), y + (4*s), 18*s, 4*s);
        // Face
        ctx.fillStyle = "#f5cbad"; ctx.fillRect(x + (12*s), y + (8*s), 16*s, 12*s);
        // Teal Top
        ctx.fillStyle = "#00acc1"; ctx.fillRect(x + (10*s), y + (22*s), 20*s, 10*s);
        // White Skirt
        ctx.fillStyle = "#ffffff"; ctx.fillRect(x + (9*s), y + (32*s), 22*s, 8*s);
        // Legs
        ctx.fillStyle = "#f5cbad";
        ctx.fillRect(x + (13*s), y + (40*s), 5*s, 6*s);
        ctx.fillRect(x + (22*s), y + (40*s), 5*s, 6*s);
    }
    ctx.restore();
};

// ==========================================
// 4. MAP & NAVIGATION
// ==========================================
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

window.showScreen = function(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('screen-' + name);
    if (target) target.classList.remove('hidden');
    if (name === 'map') setTimeout(window.drawMap, 50);
};

// ==========================================
// 5. SETTINGS & SAVE LOGIC
// ==========================================
window.toggleSettings = function() {
    const overlay = document.getElementById('settings-overlay');
    overlay.classList.toggle('hidden');
};

window.resetGame = function() {
    if (confirm("Clear all data and restart?")) {
        localStorage.removeItem('PoEkemon_Waltonia_Save');
        location.reload();
    }
};

window.saveGame = function() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
};

window.loadGame = function() {
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (saved) gameState = JSON.parse(saved);
};

// ==========================================
// 6. INITIALIZATION & STARTER
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

window.onload = () => {
    window.loadGame();
    
    // Explicitly bind settings button
    const setBtn = document.getElementById('btn-settings');
    if (setBtn) setBtn.onclick = window.toggleSettings;

    if (!gameState.playerTeam || gameState.playerTeam.length === 0) {
        window.showScreen('characterSelect');
    } else {
        window.showScreen('map');
    }
};

// ==========================================
// 7. MOVEMENT
// ==========================================
window.addEventListener('keydown', (e) => {
    const mapScreen = document.getElementById('screen-map');
    if (!mapScreen || mapScreen.classList.contains('hidden')) return;

    let nx = playerPos.x, ny = playerPos.y;
    if (['ArrowUp', 'w'].includes(e.key)) ny--;
    if (['ArrowDown', 's'].includes(e.key)) ny++;
    if (['ArrowLeft', 'a'].includes(e.key)) nx--;
    if (['ArrowRight', 'd'].includes(e.key)) nx++;

    const map = unitMaps[gameState.currentUnit];
    if (map && map[ny] && map[ny][nx] !== 3) {
        playerPos.x = nx; playerPos.y = ny;
        window.drawMap();
        if (map[ny][nx] === 1 && Math.random() < 0.15) window.startEncounter(gameState.currentUnit, false);
        if (map[ny][nx] === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// Combat Starter
window.startEncounter = function(unit, isGym) {
    const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('dialogue-box').textContent = `Wild ${gameState.currentEnemy.name} appeared!`;
    
    window.showScreen('battle');
    
    // Draw sprite in battle
    const pSprite = document.getElementById('player-sprite');
    pSprite.innerHTML = '<canvas id="bCanvas" width="80" height="80"></canvas>';
    const bCtx = document.getElementById('bCanvas').getContext('2d');
    window.drawCharacterSprite(bCtx, 0, 0, 80);
};
