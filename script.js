// ==========================================
// 1. DATA WRAPPERS (Safety Check)
// ==========================================
// If these aren't loading from your other files, the game will error out here.
console.log("Checking Data Load...");
if (typeof poekedex === 'undefined') console.error("FATAL ERROR: poekedex.js not found!");
if (typeof questionBank === 'undefined') console.error("FATAL ERROR: questions.js not found!");

// ==========================================
// 2. CONFIG & MAPS
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
// 3. GAME STATE
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
// 4. GLOBAL FUNCTIONS (Attached to Window)
// ==========================================

window.showScreen = function(screenName) {
    console.log("Switching to screen:", screenName);
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(s => s.classList.add('hidden'));
    
    // Note: HTML uses 'screen-characterSelect', 'screen-map', etc.
    const target = document.getElementById(`screen-${screenName}`);
    if (target) {
        target.classList.remove('hidden');
        if (screenName === 'map') setTimeout(window.drawMap, 50);
    } else {
        console.error("Could not find screen ID:", `screen-${screenName}`);
    }
};

window.selectStarter = function(char, id) {
    console.log("Starter Selected:", char, "ID:", id);
    gameState.playerCharacter = char;
    
    const starter = poekedex.find(p => p.id === id);
    if (starter) {
        gameState.playerTeam = [{ ...starter, currentHP: starter.hp, maxHP: starter.hp }];
        gameState.currentUnit = 1;
        window.saveGame();
        window.showScreen('map');
    } else {
        console.error("Could not find PoEkemon with ID:", id);
    }
};

window.saveGame = function() {
    localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState));
};

window.loadGame = function() {
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save');
    if (saved) {
        gameState = JSON.parse(saved);
        console.log("Game Loaded Successfully");
    }
};

// ==========================================
// 5. MAP & MOVEMENT
// ==========================================

window.drawMap = function() {
    if (!ctx) return;
    const currentMap = unitMaps[gameState.currentUnit];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentMap.forEach((row, y) => {
        row.forEach((tile, x) => {
            if (tile === 0) ctx.fillStyle = "#e2e2e2"; // Path
            if (tile === 1) ctx.fillStyle = "#78c850"; // Grass
            if (tile === 2) ctx.fillStyle = "#ff6b6b"; // Gym
            if (tile === 3) ctx.fillStyle = "#2d4c1e"; // Walls
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
    });
    window.drawPlayer();
};

window.drawPlayer = function() {
    const px = playerPos.x * TILE_SIZE;
    const py = playerPos.y * TILE_SIZE;
    
    // Mr. V / Ms. G - IEDRunner Style
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#27ae60" : "#2980b9";
    ctx.fillRect(px + 10, py + 10, 20, 25); 
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#2ecc71" : "#3498db";
    ctx.fillRect(px + 8, py + 5, 24, 15); 
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "#333" : "#ecf0f1";
    ctx.fillRect(px + 10, py + 8, 20, 5); 
};

window.addEventListener('keydown', (e) => {
    const mapScreen = document.getElementById('screen-map');
    if (!mapScreen || mapScreen.classList.contains('hidden')) return;

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
        if (tile === 1 && Math.random() < 0.12) window.startEncounter(gameState.currentUnit, false);
        if (tile === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// ==========================================
// 6. COMBAT ENGINE (STUBS - COMBAT NEXT)
// ==========================================

window.startEncounter = function(unit, isGym) {
    console.log("Encounter Started! Unit:", unit, "Gym:", isGym);
    // Combat logic goes here - for now, just a placeholder
    window.showScreen('battle');
};

// ==========================================
// 7. INITIALIZE
// ==========================================
window.onload = () => {
    window.loadGame();
    if (!gameState.playerTeam || gameState.playerTeam.length === 0) {
        window.showScreen('characterSelect');
    } else {
        window.showScreen('map');
    }
};
