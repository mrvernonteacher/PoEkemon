// ==========================================
// WALTONIA REGION DATA (50x50 Maps)
// ==========================================

const MAP_WIDTH = 50;
const MAP_HEIGHT = 50;

const waltoniaRegions = {
    1: { name: "The Leveraged Lowlands", unit: "Mechanisms" },
    2: { name: "Cortex Canyon", unit: "Machine Control" },
    3: { name: "Voltage Valley", unit: "Energy" },
    4: { name: "Static Summits", unit: "Statics" },
    5: { name: "The Transit Turnpike", unit: "Transportation" },
    6: { name: "AI Archipelago", unit: "Kinematics & AI" }
};

// Procedural Generator
function buildMap(gymX, gymY) {
    let map = [];
    for (let y = 0; y < MAP_HEIGHT; y++) {
        let row = [];
        for (let x = 0; x < MAP_WIDTH; x++) {
            // Default: 80% Grass (1), 20% Trees (3)
            let tile = Math.random() < 0.2 ? 3 : 1;

            // Clear a 5x5 safe zone in the center where the player spawns
            if (x >= 23 && x <= 27 && y >= 23 && y <= 27) tile = 0;

            // Carve basic intersecting paths across the map
            if (x === 25 || y === 25) tile = 0;
            
            // Solid tree wall around the entire map border
            if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) tile = 3;
            
            row.push(tile);
        }
        map.push(row);
    }
    
    // Place the Gym (Tile 2) on the border
    map[gymY][gymX] = 2;
    if (gymY > 0 && gymY < MAP_HEIGHT - 1) map[gymY + 1][gymX] = 0; 
    if (gymY === MAP_HEIGHT - 1) map[gymY - 1][gymX] = 0;
    
    // Place the Clinic (Tile 4) in the center safe zone
    map[27][25] = 4;
    
    return map;
}

// 0: Path, 1: Grass, 2: Gym, 3: Wall/Tree, 4: Clinic
const unitMaps = {
    1: buildMap(25, 1),  // Gym at Top Center
    2: buildMap(48, 25), // Gym at Right Center
    3: buildMap(25, 48), // Gym at Bottom Center
    4: buildMap(1, 25),  // Gym at Left Center
    5: buildMap(25, 1),
    6: buildMap(48, 25)
};
