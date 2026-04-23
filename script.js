// --- NEW MAP DATA ---
const TILE_SIZE = 40;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 10;

// 0: Path, 1: Grass (Encounters), 2: Gym (Boss), 3: Wall/Tree
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
    // You can add maps 2-6 later following this grid
};

let playerPos = { x: 1, y: 1 };
const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// --- MOVEMENT ENGINE ---
window.addEventListener('keydown', (e) => {
    if (screens.map.classList.contains('hidden')) return;

    let newX = playerPos.x;
    let newY = playerPos.y;

    if (e.key === 'ArrowUp' || e.key === 'w') newY--;
    if (e.key === 'ArrowDown' || e.key === 's') newY++;
    if (e.key === 'ArrowLeft' || e.key === 'a') newX--;
    if (e.key === 'ArrowRight' || e.key === 'd') newX++;

    checkCollision(newX, newY);
});

function checkCollision(x, y) {
    const currentMap = unitMaps[gameState.currentUnit];
    const tile = currentMap[y][x];

    if (tile !== 3) { // Not a wall
        playerPos.x = x;
        playerPos.y = y;
        drawMap();

        if (tile === 1) { // Tall Grass
            if (Math.random() < 0.15) { // 15% chance per step
                startEncounter(gameState.currentUnit, false);
            }
        } else if (tile === 2) { // Gym
            startEncounter(gameState.currentUnit, true);
        }
    }
}

function drawMap() {
    if (!ctx) return;
    const currentMap = unitMaps[gameState.currentUnit];

    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            let tile = currentMap[y][x];
            if (tile === 0) ctx.fillStyle = "#e2e2e2"; // Path
            if (tile === 1) ctx.fillStyle = "#78c850"; // Grass
            if (tile === 2) ctx.fillStyle = "#ff6b6b"; // Gym
            if (tile === 3) ctx.fillStyle = "#2d4c1e"; // Trees/Walls
            
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = "rgba(0,0,0,0.05)";
            ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    drawPlayer();
}

function drawPlayer() {
    const px = playerPos.x * TILE_SIZE + 5;
    const py = playerPos.y * TILE_SIZE + 5;
    const pSize = TILE_SIZE - 10;

    if (gameState.playerCharacter === 'MrV') {
        ctx.fillStyle = "#2ecc71"; // Digital Green
        ctx.fillRect(px, py, pSize, pSize); // Body
        ctx.fillStyle = "#333"; 
        ctx.fillRect(px + 5, py + 5, 5, 5); // Eyes
        ctx.fillRect(px + 20, py + 5, 5, 5);
    } else {
        ctx.fillStyle = "#3498db"; // Aero Blue
        ctx.fillRect(px, py, pSize, pSize); 
        ctx.fillStyle = "#ecf0f1"; // Silver visor
        ctx.fillRect(px + 2, py + 5, pSize - 4, 10);
    }
}

// Update the startEncounter to hide the map when battle starts
const originalStartEncounter = startEncounter;
startEncounter = function(unitNumber, isGym) {
    originalStartEncounter(unitNumber, isGym);
};

// Update the character selection to initialize the first map
const originalSelectStarter = selectStarter;
selectStarter = function(char, id) {
    originalSelectStarter(char, id);
    gameState.currentUnit = 1; // Default to Unit 1
    playerPos = { x: 1, y: 1 };
    setTimeout(drawMap, 100); 
};
