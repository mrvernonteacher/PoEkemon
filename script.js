// DIAGNOSTIC ALERT - If you don't see this, the file isn't loading!
alert("PoEkedex Script Loaded!");

// ==========================================
// 1. DATA CHECK
// ==========================================
console.log("PoEkedex Data:", typeof poekedex);
console.log("Question Data:", typeof questionBank);

// ==========================================
// 2. CONFIG & STATE
// ==========================================
const TILE_SIZE = 40;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 10;

let gameState = {
    playerCharacter: null,
    playerTeam: [],
    badges: [],
    currentUnit: 1,
    currentEnemy: null
};

let playerPos = { x: 1, y: 1 };

// ==========================================
// 3. CORE FUNCTIONS (Global)
// ==========================================

window.showScreen = function(screenName) {
    console.log("Attempting to show:", screenName);
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.add('hidden'));
    
    const target = document.getElementById(`screen-${screenName}`);
    if (target) {
        target.classList.remove('hidden');
        if (screenName === 'map') setTimeout(window.drawMap, 50);
    } else {
        console.error("Missing Screen ID: screen-" + screenName);
    }
};

window.selectStarter = function(char, id) {
    alert("You chose " + char + " with PoEkemon ID " + id);
    gameState.playerCharacter = char;
    
    // Safety check for the data file
    if (typeof poekedex === 'undefined') {
        alert("Error: poekedex.js not found!");
        return;
    }

    const starter = poekedex.find(p => p.id === id);
    if (starter) {
        gameState.playerTeam = [{ ...starter, currentHP: starter.hp, maxHP: starter.hp }];
        window.showScreen('map');
    } else {
        alert("Error: PoEkemon " + id + " not found in poekedex.js");
    }
};

window.drawMap = function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Simple green fill for testing
    ctx.fillStyle = "#78c850";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Player (Small blue/green square)
    ctx.fillStyle = (gameState.playerCharacter === 'MrV') ? "green" : "blue";
    ctx.fillRect(playerPos.x * TILE_SIZE, playerPos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
};

// ==========================================
// 4. INITIALIZE
// ==========================================
window.onload = function() {
    console.log("Page fully loaded.");
    window.showScreen('characterSelect');
};
