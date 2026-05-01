// ==========================================
// 1. ENGINE CONFIG & STATE
// ==========================================
const TILE_SIZE = 40;
const VIEW_WIDTH = 15;
const VIEW_HEIGHT = 10;

let gameState = {
    playerCharacter: null,
    playerTeam: [],       
    pokedexCaught: [],    
    answeredQuestions: [], 
    badges: [],
    kennel: [], // PC Storage
    trainerUpgrades: {}, // Tracks how many times trainers have been defeated
    stats: {
        questionsAnswered: 0,
        questionsCorrect: 0,
        battlesWon: 0,
        deployed: {} 
    },
    currentUnit: 1,
    currentEnemy: null,
    currentTrainer: null, 
    gymQueue: [],         
    queuedAttack: null,   
    inBattle: false
};

let playerPos = { x: 25, y: 25 };
let targetPos = { x: 25, y: 25 };
let isMoving = false;
let activeKeys = {}; 
let lastTime = Date.now();

const spriteCache = {}; 
let musicEnabled = false;
let currentBGM = null;

// ==========================================
// 2. AUDIO MANAGER
// ==========================================
window.toggleMusic = function() {
    musicEnabled = !musicEnabled;
    const btn = document.getElementById('btn-music');
    if (musicEnabled) {
        btn.innerHTML = "🔊";
        btn.style.background = "#e67e22"; 
        btn.style.color = "white";
        
        if (gameState.inBattle) {
            if (gameState.currentTrainer) {
                window.playBGM('bgm-gym' + gameState.currentUnit);
            } else {
                window.playBGM('bgm-battle');
            }
        } else {
            window.playBGM('bgm-overworld');
        }
    } else {
        btn.innerHTML = "🔇";
        btn.style.background = "white";
        btn.style.color = "black";
        window.stopBGM();
    }
};

window.playBGM = function(trackId) {
    if (!musicEnabled) return;
    const track = document.getElementById(trackId);
    if (!track) return;
    if (currentBGM && currentBGM.id === trackId && !currentBGM.paused) return; 

    window.stopBGM();
    track.volume = 0.4;
    track.currentTime = 0;
    
    let playPromise = track.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Audio play blocked by browser:", e));
    }
    currentBGM = track;
};

window.stopBGM = function() {
    if (currentBGM) {
        currentBGM.pause();
        currentBGM = null;
    }
};

// ==========================================
// 3. CUSTOM ALERTS
// ==========================================
window.showMessage = function(text, callback) {
    const overlay = document.getElementById('message-overlay');
    if (!overlay) return;
    document.getElementById('message-text').textContent = text;
    const btnOk = document.getElementById('msg-btn-ok');
    const btnCancel = document.getElementById('msg-btn-cancel');

    btnCancel.classList.add('hidden');
    btnOk.onclick = () => {
        overlay.classList.add('hidden');
        if (callback) callback();
    };
    overlay.classList.remove('hidden');
};

window.showConfirm = function(text, onYes, onNo) {
    const overlay = document.getElementById('message-overlay');
    if (!overlay) return;
    document.getElementById('message-text').textContent = text;
    const btnOk = document.getElementById('msg-btn-ok');
    const btnCancel = document.getElementById('msg-btn-cancel');

    btnCancel.classList.remove('hidden');
    btnOk.onclick = () => {
        overlay.classList.add('hidden');
        if (onYes) onYes();
    };
    btnCancel.onclick = () => {
        overlay.classList.add('hidden');
        if (onNo) onNo();
    };
    overlay.classList.remove('hidden');
};

// ==========================================
// 4. ANIMATED SPRITE ENGINE
// ==========================================
window.drawCharacterSprite = function(ctx, x, y, size) {
    const s = size / 40;
    ctx.save();
    
    const walkFrame = isMoving ? (Math.floor(Date.now() / 150) % 4) : 0;
    let bob = (walkFrame === 1 || walkFrame === 3) ? -2 : 0; 
    let leftLegOffset = (walkFrame === 1) ? -4 : 0;          
    let rightLegOffset = (walkFrame === 3) ? -4 : 0;         

    if (gameState.playerCharacter === 'MrV') {
        ctx.fillStyle = "#5d4037"; 
        ctx.fillRect(x + (8*s), y + (4*s) + (bob*s), 24*s, 16*s);
        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + (10*s), y + (6*s) + (bob*s), 20*s, 12*s);
        ctx.fillStyle = "#5d4037"; 
        ctx.fillRect(x + (9*s), y + (14*s) + (bob*s), 22*s, 6*s);
        ctx.fillRect(x + (12*s), y + (18*s) + (bob*s), 16*s, 3*s);

        ctx.fillStyle = "#000000"; 
        ctx.fillRect(x + (11*s), y + (8*s) + (bob*s), 7*s, 5*s); 
        ctx.fillRect(x + (22*s), y + (8*s) + (bob*s), 7*s, 5*s); 
        ctx.fillRect(x + (18*s), y + (9*s) + (bob*s), 4*s, 2*s); 
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + (12*s), y + (9*s) + (bob*s), 5*s, 3*s); 
        ctx.fillRect(x + (23*s), y + (9*s) + (bob*s), 5*s, 3*s); 
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + (14*s), y + (10*s) + (bob*s), 2*s, 2*s); 
        ctx.fillRect(x + (25*s), y + (10*s) + (bob*s), 2*s, 2*s); 
        
        ctx.fillStyle = "#c8102e"; 
        ctx.fillRect(x + (10*s), y + (20*s) + (bob*s), 20*s, 14*s); 
        ctx.fillRect(x + (6*s), y + (20*s) + (bob*s), 4*s, 10*s); 
        ctx.fillRect(x + (30*s), y + (20*s) + (bob*s), 4*s, 10*s); 
        ctx.fillStyle = "#550000"; 
        ctx.fillRect(x + (13*s), y + (20*s) + (bob*s), 2*s, 14*s); 
        ctx.fillRect(x + (19*s), y + (20*s) + (bob*s), 2*s, 14*s); 
        ctx.fillRect(x + (25*s), y + (20*s) + (bob*s), 2*s, 14*s); 
        ctx.fillRect(x + (10*s), y + (23*s) + (bob*s), 20*s, 2*s); 
        ctx.fillRect(x + (10*s), y + (29*s) + (bob*s), 20*s, 2*s); 
        
        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + (6*s), y + (30*s) + (bob*s), 4*s, 4*s); 
        ctx.fillRect(x + (30*s), y + (30*s) + (bob*s), 4*s, 4*s); 
        
        ctx.fillStyle = "#1a237e"; 
        ctx.fillRect(x + (10*s), y + (34*s) + (leftLegOffset*s), 8*s, 6*s); 
        ctx.fillRect(x + (22*s), y + (34*s) + (rightLegOffset*s), 8*s, 6*s); 
        ctx.fillStyle = "#3e2723"; 
        ctx.fillRect(x + (8*s), y + (38*s) + (leftLegOffset*s), 10*s, 3*s); 
        ctx.fillRect(x + (22*s), y + (38*s) + (rightLegOffset*s), 10*s, 3*s); 

    } else { // Ms. G
        ctx.fillStyle = "#4e342e"; 
        ctx.fillRect(x + (8*s), y + (3*s) + (bob*s), 24*s, 6*s);
        
        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(x + (8*s), y + (6*s) + (bob*s), 24*s, 3*s); 
        ctx.fillRect(x + (6*s), y + (8*s) + (bob*s), 28*s, 2*s); 
        
        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + (10*s), y + (10*s) + (bob*s), 20*s, 10*s);
        ctx.fillStyle = "#4e342e";
        ctx.fillRect(x + (8*s), y + (10*s) + (bob*s), 2*s, 8*s);
        ctx.fillRect(x + (30*s), y + (10*s) + (bob*s), 2*s, 8*s);

        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(x + (13*s), y + (12*s) + (bob*s), 4*s, 4*s); 
        ctx.fillRect(x + (23*s), y + (12*s) + (bob*s), 4*s, 4*s); 
        ctx.fillStyle = "#000000"; 
        ctx.fillRect(x + (14*s), y + (13*s) + (bob*s), 2*s, 2*s); 
        ctx.fillRect(x + (24*s), y + (13*s) + (bob*s), 2*s, 2*s); 

        ctx.fillStyle = "#00acc1"; 
        ctx.fillRect(x + (11*s), y + (20*s) + (bob*s), 18*s, 10*s);
        ctx.fillStyle = "#00838f"; 
        ctx.fillRect(x + (7*s), y + (20*s) + (bob*s), 4*s, 6*s); 
        ctx.fillRect(x + (29*s), y + (20*s) + (bob*s), 4*s, 6*s); 
        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + (7*s), y + (26*s) + (bob*s), 4*s, 4*s); 
        ctx.fillRect(x + (29*s), y + (26*s) + (bob*s), 4*s, 4*s); 

        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(x + (9*s), y + (30*s) + (bob*s), 22*s, 6*s);
        ctx.fillStyle = "#dddddd";
        ctx.fillRect(x + (13*s), y + (30*s) + (bob*s), 1*s, 6*s);
        ctx.fillRect(x + (18*s), y + (30*s) + (bob*s), 1*s, 6*s);
        ctx.fillRect(x + (23*s), y + (30*s) + (bob*s), 1*s, 6*s);
        ctx.fillRect(x + (28*s), y + (30*s) + (bob*s), 1*s, 6*s);

        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + (12*s), y + (36*s) + (leftLegOffset*s), 4*s, 3*s); 
        ctx.fillRect(x + (24*s), y + (36*s) + (rightLegOffset*s), 4*s, 3*s); 

        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(x + (10*s), y + (39*s) + (leftLegOffset*s), 6*s, 2*s); 
        ctx.fillRect(x + (24*s), y + (39*s) + (rightLegOffset*s), 6*s, 2*s);
        ctx.fillStyle = "#00acc1";
        ctx.fillRect(x + (12*s), y + (39*s) + (leftLegOffset*s), 2*s, 2*s);
        ctx.fillRect(x + (26*s), y + (39*s) + (rightLegOffset*s), 2*s, 2*s);
    }
    ctx.restore();
};

window.drawTrainerSprite = function(ctx, trainerId, x, y, size) {
    const s = size / 50; 
    ctx.save();
    
    if (trainerId === 'wes') {
        ctx.fillStyle = "#333333"; 
        ctx.fillRect(x + 12*s, y + 4*s, 26*s, 8*s); 
        ctx.fillRect(x + 10*s, y + 10*s, 32*s, 4*s); 
        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + 16*s, y + 14*s, 18*s, 12*s);
        ctx.fillStyle = "#5d4037"; 
        ctx.fillRect(x + 16*s, y + 20*s, 18*s, 8*s); 
        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + 22*s, y + 22*s, 6*s, 2*s);
        
        ctx.fillStyle = "#ffffff"; 
        ctx.fillRect(x + 18*s, y + 16*s, 5*s, 4*s); 
        ctx.fillRect(x + 27*s, y + 16*s, 5*s, 4*s);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 20*s, y + 17*s, 2*s, 2*s); 
        ctx.fillRect(x + 27*s, y + 17*s, 2*s, 2*s);
        ctx.fillRect(x + 23*s, y + 17*s, 4*s, 2*s); 
        
        // Eyepatch
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 15*s, y + 15*s, 6*s, 5*s);
        ctx.fillRect(x + 12*s, y + 16*s, 14*s, 2*s); 

        ctx.fillStyle = "#0033a0"; 
        ctx.fillRect(x + 12*s, y + 26*s, 26*s, 16*s);
        ctx.fillStyle = "#c8102e"; 
        ctx.fillRect(x + 23*s, y + 30*s, 4*s, 4*s); 
        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + 8*s, y + 28*s, 4*s, 12*s); ctx.fillRect(x + 38*s, y + 28*s, 4*s, 12*s);
        ctx.fillStyle = "#d2b48c"; 
        ctx.fillRect(x + 14*s, y + 42*s, 8*s, 12*s); ctx.fillRect(x + 28*s, y + 42*s, 8*s, 12*s);
        
    } else if (trainerId === 'vu') {
        ctx.fillStyle = "#222222"; 
        ctx.fillRect(x + 14*s, y + 4*s, 22*s, 16*s); 
        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + 16*s, y + 8*s, 18*s, 12*s);
        ctx.fillStyle = "#222222"; 
        ctx.fillRect(x + 14*s, y + 8*s, 4*s, 12*s);
        ctx.fillRect(x + 32*s, y + 8*s, 4*s, 12*s);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 17*s, y + 12*s, 6*s, 4*s);
        ctx.fillRect(x + 27*s, y + 12*s, 6*s, 4*s);
        ctx.fillRect(x + 23*s, y + 13*s, 4*s, 2*s);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 18*s, y + 13*s, 4*s, 2*s);
        ctx.fillRect(x + 28*s, y + 13*s, 4*s, 2*s);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 12*s, y + 20*s, 26*s, 16*s);
        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(x + 8*s, y + 20*s, 4*s, 10*s);
        ctx.strokeRect(x + 7*s, y + 16*s, 6*s, 6*s);
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(x + 36*s, y + 22*s, 8*s, 8*s);
        ctx.fillStyle = "#000";
        ctx.fillRect(x + 38*s, y + 24*s, 2*s, 2*s);
        ctx.fillStyle = "#333333";
        ctx.fillRect(x + 16*s, y + 36*s, 6*s, 10*s);
        ctx.fillRect(x + 28*s, y + 36*s, 6*s, 10*s);

    } else if (trainerId === 'vernon') {
        ctx.fillStyle = "#5d4037"; 
        ctx.fillRect(x + 14*s, y + 4*s, 22*s, 16*s);
        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + 16*s, y + 6*s, 18*s, 14*s);
        ctx.fillStyle = "#5d4037";
        ctx.fillRect(x + 15*s, y + 16*s, 20*s, 6*s);
        ctx.fillStyle = "#000000"; 
        ctx.fillRect(x + 17*s, y + 10*s, 6*s, 4*s); 
        ctx.fillRect(x + 27*s, y + 10*s, 6*s, 4*s); 
        ctx.fillRect(x + 23*s, y + 11*s, 4*s, 2*s); 
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 18*s, y + 11*s, 4*s, 2*s); 
        ctx.fillRect(x + 28*s, y + 11*s, 4*s, 2*s); 
        ctx.fillStyle = "#1a237e"; 
        ctx.fillRect(x + 12*s, y + 22*s, 26*s, 14*s);
        ctx.fillStyle = "#000080"; 
        ctx.fillRect(x + 16*s, y + 22*s, 2*s, 14*s);
        ctx.fillRect(x + 24*s, y + 22*s, 2*s, 14*s);
        ctx.fillRect(x + 32*s, y + 22*s, 2*s, 14*s);
        ctx.fillRect(x + 12*s, y + 26*s, 26*s, 2*s);
        ctx.fillRect(x + 12*s, y + 32*s, 26*s, 2*s);
        ctx.fillStyle = "#333333";
        ctx.fillRect(x + 16*s, y + 36*s, 6*s, 10*s);
        ctx.fillRect(x + 28*s, y + 36*s, 6*s, 10*s);

    } else if (trainerId === 'guie') {
        ctx.fillStyle = "#4e342e"; 
        ctx.fillRect(x + 12*s, y + 4*s, 26*s, 18*s);
        ctx.fillStyle = "#ff69b4"; 
        ctx.beginPath();
        ctx.moveTo(x + 14*s, y + 4*s);
        ctx.lineTo(x + 18*s, y - 2*s);
        ctx.lineTo(x + 22*s, y + 4*s);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 28*s, y + 4*s);
        ctx.lineTo(x + 32*s, y - 2*s);
        ctx.lineTo(x + 36*s, y + 4*s);
        ctx.fill();
        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + 16*s, y + 8*s, 18*s, 12*s);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 18*s, y + 12*s, 4*s, 4*s); 
        ctx.fillRect(x + 28*s, y + 12*s, 4*s, 4*s); 
        ctx.fillStyle = "#000";
        ctx.fillRect(x + 19*s, y + 13*s, 2*s, 2*s); 
        ctx.fillRect(x + 29*s, y + 13*s, 2*s, 2*s);
        ctx.fillStyle = "#ffb6c1"; 
        ctx.fillRect(x + 12*s, y + 22*s, 26*s, 14*s);
        ctx.fillStyle = "#f5cbad";
        ctx.fillRect(x + 16*s, y + 36*s, 6*s, 10*s);
        ctx.fillRect(x + 28*s, y + 36*s, 6*s, 10*s);

    } else if (trainerId === 'tim') {
        ctx.fillStyle = "#222222"; 
        ctx.fillRect(x + 14*s, y + 4*s, 22*s, 10*s);
        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + 16*s, y + 8*s, 18*s, 12*s);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 19*s, y + 12*s, 2*s, 2*s); 
        ctx.fillRect(x + 29*s, y + 12*s, 2*s, 2*s);
        ctx.fillStyle = "#2c3e50"; 
        ctx.fillRect(x + 12*s, y + 20*s, 26*s, 16*s);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 20*s, y + 20*s, 10*s, 16*s);
        ctx.fillStyle = "#8b4513";
        ctx.fillRect(x + 40*s, y + 20*s, 6*s, 20*s);
        ctx.fillStyle = "#333";
        ctx.fillRect(x + 38*s, y + 22*s, 2*s, 4*s);
        ctx.fillRect(x + 38*s, y + 34*s, 2*s, 4*s);
        ctx.fillStyle = "#333333";
        ctx.fillRect(x + 16*s, y + 36*s, 6*s, 10*s);
        ctx.fillRect(x + 28*s, y + 36*s, 6*s, 10*s);

    } else if (trainerId === 'hubbard') {
        ctx.fillStyle = "#555555"; 
        ctx.fillRect(x + 16*s, y + 4*s, 18*s, 8*s); 
        ctx.fillStyle = "#f5cbad"; 
        ctx.fillRect(x + 25*s, y + 8*s, 9*s, 12*s);
        ctx.fillStyle = "#7f8c8d"; 
        ctx.fillRect(x + 16*s, y + 8*s, 9*s, 12*s);
        
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(x + 18*s, y + 12*s, 4*s, 4*s);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 27*s, y + 12*s, 5*s, 4*s);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 28*s, y + 13*s, 3*s, 2*s);
        
        ctx.fillStyle = "#2e7d32"; 
        ctx.fillRect(x + 25*s, y + 20*s, 13*s, 16*s);
        ctx.fillStyle = "#34495e"; 
        ctx.fillRect(x + 12*s, y + 20*s, 13*s, 16*s);
        
        ctx.fillStyle = "#333333"; 
        ctx.fillRect(x + 14*s, y + 36*s, 8*s, 10*s); 
        ctx.fillRect(x + 28*s, y + 36*s, 8*s, 10*s);
    }
    ctx.restore();
};

window.drawPoekemonSprite = function(ctx, mon, x, y, size) {
    if (!mon) return;
    
    const currentLevel = mon.evolutionLevel || 1;
    const spriteKey = `${mon.id}-${currentLevel}`;

    if (spriteCache[spriteKey] === undefined) {
        const img = new Image();
        img.src = `assets/${mon.id}.${currentLevel}.png`; 
        
        img.onload = () => {
            spriteCache[spriteKey] = img;
            
            ctx.clearRect(x, y, size, size);
            ctx.drawImage(img, x, y, size, size);
            
            const screenBattle = document.getElementById('screen-battle');
            if (screenBattle && screenBattle.classList.contains('active')) window.updateHP(); 
        };
        img.onerror = () => spriteCache[spriteKey] = null; 
        spriteCache[spriteKey] = 'loading';
    }

    if (spriteCache[spriteKey] && spriteCache[spriteKey] !== 'loading') {
        ctx.drawImage(spriteCache[spriteKey], x, y, size, size);
    } else {
        const s = size / 40;
        ctx.save();
        let color = "#7f8c8d"; 
        if(mon.type.includes("Logic") || mon.type.includes("Sensor") || mon.type.includes("Algorithm")) color = "#2ecc71"; 
        if(mon.type.includes("Renewable") || mon.type.includes("Energy") || mon.type.includes("Timing")) color = "#f1c40f"; 
        if(mon.type.includes("Thermodynamics") || mon.type.includes("Propulsion")) color = "#e74c3c"; 
        if(mon.type.includes("Aerodynamics") || mon.type.includes("Flow")) color = "#3498db"; 
        if(mon.type.includes("Structure") || mon.type.includes("Machine") || mon.type.includes("Material") || mon.type.includes("Ballistics")) color = "#95a5a6"; 

        ctx.fillStyle = color;
        ctx.fillRect(x + 5*s, y + 10*s, 30*s, 25*s); 
        ctx.fillRect(x + 10*s, y + 5*s, 20*s, 5*s); 
        ctx.fillStyle = "#fff";
        ctx.fillRect(x + 10*s, y + 15*s, 6*s, 6*s); 
        ctx.fillRect(x + 24*s, y + 15*s, 6*s, 6*s); 
        ctx.fillStyle = "#000";
        ctx.fillRect(x + 12*s, y + 17*s, 2*s, 2*s); 
        ctx.fillRect(x + 24*s, y + 17*s, 2*s, 2*s);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.font = `${8*s}px 'Press Start 2P'`;
        ctx.fillText(`#${mon.id}`, x + 10*s, y + 30*s);
        ctx.restore();
    }
};

// ==========================================
// 5. GAME LOOP & MAP RENDERING
// ==========================================
window.drawMap = function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const map = unitMaps[gameState.currentUnit];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let cameraX = playerPos.x - (VIEW_WIDTH / 2);
    let cameraY = playerPos.y - (VIEW_HEIGHT / 2);
    
    cameraX = Math.max(0, Math.min(cameraX, MAP_WIDTH - VIEW_WIDTH));
    cameraY = Math.max(0, Math.min(cameraY, MAP_HEIGHT - VIEW_HEIGHT));

    for (let y = 0; y < VIEW_HEIGHT + 1; y++) {
        for (let x = 0; x < VIEW_WIDTH + 1; x++) {
            let tileY = Math.floor(cameraY) + y;
            let tileX = Math.floor(cameraX) + x;
            
            if (tileY < MAP_HEIGHT && tileX < MAP_WIDTH) {
                let tile = map[tileY][tileX];
                if (tile === 0) ctx.fillStyle = "#e2e2e2"; 
                if (tile === 1) ctx.fillStyle = "#78c850"; 
                if (tile === 2) ctx.fillStyle = "#ff6b6b"; 
                if (tile === 3) ctx.fillStyle = "#2d4c1e"; 
                if (tile === 4) ctx.fillStyle = "#3498db"; 
                if (tile === 5) ctx.fillStyle = "#95a5a6"; 
                
                let drawX = (tileX - cameraX) * TILE_SIZE;
                let drawY = (tileY - cameraY) * TILE_SIZE;
                
                ctx.fillRect(drawX, drawY, TILE_SIZE, TILE_SIZE);
                
                if (tile === 4) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(drawX + 15, drawY + 5, 10, 30);
                    ctx.fillRect(drawX + 5, drawY + 15, 30, 10);
                }
                if (tile === 5) {
                    ctx.fillStyle = "#333";
                    ctx.fillRect(drawX + 5, drawY, 5, 40);
                    ctx.fillRect(drawX + 30, drawY, 5, 40);
                    ctx.fillStyle = "#8b4513"; 
                    for(let t=5; t<40; t+=10) ctx.fillRect(drawX, drawY + t, 40, 4);
                }
            }
        }
    }
    
    let px = (playerPos.x - cameraX) * TILE_SIZE;
    let py = (playerPos.y - cameraY) * TILE_SIZE;
    window.drawCharacterSprite(ctx, px, py, TILE_SIZE);
};

function gameLoop() {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;

    if (document.getElementById('screen-map').classList.contains('active') && !gameState.inBattle) {
        
        if (!isMoving) {
            let dx = 0, dy = 0;
            if (activeKeys['ArrowUp'] || activeKeys['w'] || activeKeys['dpad-up']) dy = -1;
            else if (activeKeys['ArrowDown'] || activeKeys['s'] || activeKeys['dpad-down']) dy = 1;
            else if (activeKeys['ArrowLeft'] || activeKeys['a'] || activeKeys['dpad-left']) dx = -1;
            else if (activeKeys['ArrowRight'] || activeKeys['d'] || activeKeys['dpad-right']) dx = 1;

            if (dx !== 0 || dy !== 0) {
                const nx = Math.round(playerPos.x) + dx;
                const ny = Math.round(playerPos.y) + dy;
                const map = unitMaps[gameState.currentUnit];
                
                if (ny >= 0 && ny < MAP_HEIGHT && nx >= 0 && nx < MAP_WIDTH && map[ny][nx] !== 3) {
                    isMoving = true;
                    targetPos = { x: nx, y: ny };
                }
            }
        }

        if (isMoving) {
            const speed = 0.005 * dt; 
            let reachedX = false;
            let reachedY = false;

            if (playerPos.x < targetPos.x) {
                playerPos.x = Math.min(playerPos.x + speed, targetPos.x);
            } else if (playerPos.x > targetPos.x) {
                playerPos.x = Math.max(playerPos.x - speed, targetPos.x);
            } else {
                reachedX = true;
            }

            if (playerPos.y < targetPos.y) {
                playerPos.y = Math.min(playerPos.y + speed, targetPos.y);
            } else if (playerPos.y > targetPos.y) {
                playerPos.y = Math.max(playerPos.y - speed, targetPos.y);
            } else {
                reachedY = true;
            }

            if (reachedX && reachedY) {
                isMoving = false;
                playerPos.x = Math.round(playerPos.x);
                playerPos.y = Math.round(playerPos.y);
                
                const tile = unitMaps[gameState.currentUnit][playerPos.y][playerPos.x];
                if (tile === 4) {
                    activeKeys = {}; 
                    window.triggerClinic();
                }
                else if (tile === 5) {
                    activeKeys = {};
                    window.triggerTrainStation();
                }
                else if (tile === 1 && Math.random() < 0.12) {
                    activeKeys = {};
                    window.startEncounter(gameState.currentUnit, false);
                }
                else if (tile === 2) {
                    activeKeys = {};
                    window.startEncounter(gameState.currentUnit, true);
                }
            }
        }
        
        window.drawMap();
    }
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    activeKeys[e.key.toLowerCase()] = true;
    activeKeys[e.key] = true; 
});

window.addEventListener('keyup', (e) => {
    activeKeys[e.key.toLowerCase()] = false;
    activeKeys[e.key] = false;
});


// ==========================================
// 6. FILE I/O & UI INITIALIZATION
// ==========================================
window.showScreen = function(name) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('active');
    });
    
    const target = document.getElementById('screen-' + name);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }

    const mapBtn = document.getElementById('btn-map');
    if (mapBtn) {
        if (gameState.inBattle) {
            mapBtn.textContent = "Battle";
            mapBtn.style.background = "#ff6b6b"; 
            mapBtn.style.color = "white";
        } else {
            mapBtn.textContent = "Map";
            mapBtn.style.background = "white";
            mapBtn.style.color = "black";
        }
    }

    if (name === 'map') {
        const region = (typeof waltoniaRegions !== 'undefined' && waltoniaRegions[gameState.currentUnit]) 
                       ? waltoniaRegions[gameState.currentUnit] 
                       : { name: "Unknown Area" };
        const label = document.getElementById('map-label');
        if (label) label.textContent = `Unit ${gameState.currentUnit}: ${region.name}`;
        
        if (!gameState.inBattle) {
            window.playBGM('bgm-overworld');
        }
    }
};

window.saveGame = function() { 
    try {
        localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState)); 
    } catch (e) {
        console.error("Save failed", e);
    }
};

window.loadGame = function() { 
    try {
        const saved = localStorage.getItem('PoEkemon_Waltonia_Save'); 
        if (saved) {
            const loadedState = JSON.parse(saved);
            gameState = { ...gameState, ...loadedState };
        }
        
        gameState.inBattle = false;
        isMoving = false; 
        gameState.currentEnemy = null;
        gameState.currentTrainer = null;
        gameState.gymQueue = [];
        
        if (!Array.isArray(gameState.playerTeam)) gameState.playerTeam = [];
        if (!Array.isArray(gameState.pokedexCaught)) gameState.pokedexCaught = [];
        if (!Array.isArray(gameState.answeredQuestions)) gameState.answeredQuestions = [];
        if (!Array.isArray(gameState.badges)) gameState.badges = [];
        if (!Array.isArray(gameState.kennel)) gameState.kennel = [];
        if (!gameState.trainerUpgrades) gameState.trainerUpgrades = {};
        
        if (!gameState.stats) {
            gameState.stats = { questionsAnswered: 0, questionsCorrect: 0, battlesWon: 0, deployed: {} };
        }
        if (!gameState.stats.deployed) gameState.stats.deployed = {};
        
        gameState.playerTeam.forEach(mon => {
            if (!mon) return;
            if (typeof poekedex !== 'undefined') {
                const masterDex = poekedex.find(p => p.id === mon.id);
                if (masterDex) {
                    mon.basicAtkName = masterDex.basicAtkName;
                    mon.baseAtk = masterDex.baseAtk;
                    mon.evolutions = JSON.parse(JSON.stringify(masterDex.evolutions));
                    if (mon.xp === undefined) mon.xp = 0;
                    
                    let correctLevel = mon.evolutionLevel || 1;
                    if (mon.name === masterDex.name) {
                        correctLevel = 1;
                    } else if (masterDex.evolutions.length > 0 && mon.name === masterDex.evolutions[0].name) {
                        correctLevel = 2;
                    } else if (masterDex.evolutions.length > 1 && mon.name === masterDex.evolutions[1].name) {
                        correctLevel = 3;
                    } else if (mon.evolutionLevel === 0) {
                        correctLevel = 1; 
                    }
                    
                    mon.evolutionLevel = correctLevel;
                    if (mon.evolutionLevel === 1) mon.name = masterDex.name;
                    else if (mon.evolutionLevel > 1 && masterDex.evolutions[mon.evolutionLevel - 2]) {
                        mon.name = masterDex.evolutions[mon.evolutionLevel - 2].name;
                    }
                }
            }
        });
    } catch (err) {
        console.error("Save file corrupted. Resetting memory.", err);
        localStorage.removeItem('PoEkemon_Waltonia_Save');
    }
};

window.downloadSaveFile = async function() {
    const dataStr = JSON.stringify(gameState);
    const now = new Date();
    const timestamp = now.getFullYear() + "-" +
                      String(now.getMonth() + 1).padStart(2, '0') + "-" +
                      String(now.getDate()).padStart(2, '0') + "_" +
                      String(now.getHours()).padStart(2, '0') + "-" +
                      String(now.getMinutes()).padStart(2, '0') + "-" +
                      String(now.getSeconds()).padStart(2, '0');
    const defaultFilename = `poekedex_save_${timestamp}.json`;

    try {
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: defaultFilename,
                types: [{ description: 'JSON Save File', accept: {'application/json': ['.json']} }],
            });
            const writable = await handle.createWritable();
            await writable.write(dataStr);
            await writable.close();
            window.showMessage("Game saved successfully!");
            return;
        }
    } catch (err) {
        if (err.name !== 'AbortError') console.error("File System Access API error:", err);
        else return; 
    }

    const encodedData = "data:text/json;charset=utf-8," + encodeURIComponent(dataStr);
    const a = document.createElement('a');
    a.setAttribute("href", encodedData);
    a.setAttribute("download", defaultFilename);
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.showMessage("Game downloaded to your default Downloads folder.");
};

window.uploadSaveFile = function(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const loadedState = JSON.parse(e.target.result);
            if (loadedState && loadedState.playerTeam) {
                gameState = loadedState;
                window.saveGame(); 
                window.loadGame(); 
                window.showMessage("Save file loaded successfully!", () => window.showScreen('map'));
            } else {
                window.showMessage("Invalid save file.");
            }
        } catch(err) {
            window.showMessage("Error reading the save file.");
        }
    };
    reader.readAsText(file);
};

window.trackDeployment = function(monId) {
    if (!gameState.stats.deployed) gameState.stats.deployed = {};
    gameState.stats.deployed[monId] = (gameState.stats.deployed[monId] || 0) + 1;
    window.saveGame();
};

window.openTrainerCard = function() {
    const overlay = document.getElementById('trainer-card-overlay');
    if (!overlay) return;

    document.getElementById('tc-name').textContent = gameState.playerCharacter === 'MrV' ? 'Mr. V' : (gameState.playerCharacter === 'MsG' ? 'Ms. G' : 'Trainer');
    
    let acc = 0;
    if (gameState.stats.questionsAnswered > 0) {
        acc = Math.round((gameState.stats.questionsCorrect / gameState.stats.questionsAnswered) * 100);
    }
    document.getElementById('tc-accuracy').textContent = acc + "%";
    document.getElementById('tc-questions').textContent = gameState.stats.questionsAnswered;
    document.getElementById('tc-battles').textContent = gameState.stats.battlesWon;
    document.getElementById('tc-caught').textContent = gameState.pokedexCaught.length;
    
    const badgeGrid = document.getElementById('tc-badge-grid');
    badgeGrid.innerHTML = '';
    
    for(let i=1; i<=6; i++) {
        if (gameState.badges.includes(i)) {
            badgeGrid.innerHTML += `
                <div class="gear-badge earned">
                    <div class="gear-inner">U${i}</div>
                </div>`;
        } else {
            badgeGrid.innerHTML += `
                <div class="gear-badge locked">
                    <div class="gear-inner">?</div>
                </div>`;
        }
    }

    const avatarCtx = document.getElementById('tc-avatar-canvas').getContext('2d');
    avatarCtx.clearRect(0, 0, 60, 60);
    let tempMove = isMoving; isMoving = false; 
    window.drawCharacterSprite(avatarCtx, -10, -5, 80); 
    isMoving = tempMove;

    let favId = null;
    let maxUses = 0;
    for (const [id, uses] of Object.entries(gameState.stats.deployed)) {
        if (uses > maxUses) {
            maxUses = uses;
            favId = parseInt(id);
        }
    }

    const favCtx = document.getElementById('tc-fav-canvas').getContext('2d');
    favCtx.clearRect(0, 0, 80, 80);
    
    if (favId) {
        const favMon = poekedex.find(p => p.id === favId);
        document.getElementById('tc-fav-name').textContent = favMon ? favMon.name.substring(0,10) : "Unknown";
        window.drawPoekemonSprite(favCtx, {id: favId, type: favMon.type, evolutionLevel: 1}, 0, 0, 80);
    } else {
        document.getElementById('tc-fav-name').textContent = "None";
    }

    overlay.classList.remove('hidden');
};

window.resetGame = function() { 
    window.showConfirm("Are you sure you want to completely erase your save data? This cannot be undone.", () => {
        localStorage.removeItem('PoEkemon_Waltonia_Save'); 
        location.reload(); 
    });
};

window.selectStarter = function(char, id) {
    try {
        if (typeof poekedex === 'undefined') {
            alert("Error: poekedex.js failed to load. Check for syntax errors.");
            return;
        }
        gameState.playerCharacter = char;
        const mon = poekedex.find(p => p.id === id);
        if (mon) {
            gameState.playerTeam = [{ ...mon, currentHP: mon.hp, maxHP: mon.hp, xp: 0, evolutionLevel: 1 }];
            if (!gameState.pokedexCaught) gameState.pokedexCaught = [];
            gameState.pokedexCaught.push(id); 
            playerPos = { x: 25, y: 25 }; 
            targetPos = { x: 25, y: 25 };
            window.trackDeployment(mon.id);
            window.saveGame();
            window.showScreen('map');
        }
    } catch(e) {
        console.error("Error in selectStarter", e);
    }
};

window.onload = () => {
    if (typeof poekedex === 'undefined') alert("WARNING: poekedex.js is missing or has a syntax error!");
    if (typeof trainerBank === 'undefined') alert("WARNING: trainers.js is missing or has a syntax error!");
    if (typeof questionBank === 'undefined') alert("WARNING: questions.js is missing or has a syntax error!");

    window.loadGame();
    
    const btnMusic = document.getElementById('btn-music');
    if (btnMusic) btnMusic.onclick = window.toggleMusic;

    const btnMap = document.getElementById('btn-map');
    if (btnMap) btnMap.onclick = () => {
        if (gameState.inBattle) window.showScreen('battle');
        else window.showScreen('map');
    };
    
    const btnDex = document.getElementById('btn-dex');
    if (btnDex) btnDex.onclick = () => {
        window.renderDex();
        window.showScreen('dex');
    };

    const btnQuedex = document.getElementById('btn-quedex');
    if (btnQuedex) btnQuedex.onclick = () => {
        if (gameState.inBattle) {
            window.showMessage("No studying during a battle! Focus on your opponent!");
            return;
        }
        window.renderQuedex();
        window.showScreen('quedex');
    };

    const btnTrainer = document.getElementById('btn-trainer');
    if (btnTrainer) btnTrainer.onclick = window.openTrainerCard;

    const setupDpad = (id, keyName) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const startMove = (e) => { e.preventDefault(); activeKeys[keyName] = true; };
        const stopMove = (e) => { e.preventDefault(); activeKeys[keyName] = false; };
        
        btn.addEventListener('touchstart', startMove, {passive: false});
        btn.addEventListener('touchend', stopMove);
        btn.addEventListener('mousedown', startMove);
        btn.addEventListener('mouseup', stopMove);
        btn.addEventListener('mouseleave', stopMove);
    };

    setupDpad('dpad-up', 'dpad-up');
    setupDpad('dpad-down', 'dpad-down');
    setupDpad('dpad-left', 'dpad-left');
    setupDpad('dpad-right', 'dpad-right');

    if (!gameState.playerTeam || gameState.playerTeam.length === 0) {
        window.showScreen('characterSelect');
    } else {
        window.showScreen('map');
    }
    
    requestAnimationFrame(gameLoop);
};

window.unlockQuestion = function(qId) {
    if (!gameState.answeredQuestions) gameState.answeredQuestions = [];
    if (!gameState.answeredQuestions.includes(qId)) {
        gameState.answeredQuestions.push(qId);
        window.saveGame();
    }
};

// ==========================================
// 7. MAP BUILDINGS (CLINIC & STATION)
// ==========================================
window.triggerClinic = function() {
    let qArray = questionBank[gameState.currentUnit] ? questionBank[gameState.currentUnit].regular : [];
    if (!qArray || qArray.length === 0) {
        playerPos.y += 1; targetPos.y += 1; 
        return window.showMessage("Under Construction!", () => { window.showScreen('map'); });
    }

    const q = qArray[Math.floor(Math.random() * qArray.length)];
    
    window.showScreen('battle');
    document.querySelector('.battle-stage').style.display = 'none';
    document.getElementById('action-menu').classList.add('hidden');
    document.getElementById('dialogue-box').textContent = "Welcome to the Clinic! Answer correctly to fully heal your party.";
    
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    document.getElementById('question-text').textContent = q.q;
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            window.unlockQuestion(q.id); 
            gameState.stats.questionsAnswered++; 
            
            document.querySelector('.battle-stage').style.display = 'block';
            if (i === q.ans) {
                gameState.stats.questionsCorrect++; 
                gameState.playerTeam.forEach(mon => mon.currentHP = mon.maxHP);
                window.saveGame();
                window.showMessage("Correct! Your PoEkemon are fully healed.", () => {
                    playerPos.y += 1; targetPos.y += 1; 
                    window.showScreen('map');
                });
            } else {
                window.saveGame();
                window.showMessage("Incorrect. Study your notes and try again!", () => {
                    playerPos.y += 1; targetPos.y += 1; 
                    window.showScreen('map');
                });
            }
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

window.triggerTrainStation = function() {
    window.showScreen('trainStation');
    const list = document.getElementById('unit-travel-list');
    list.innerHTML = '';
    playerPos.y += 1; targetPos.y += 1; 

    for (let i = 1; i <= Object.keys(waltoniaRegions).length; i++) {
        const btn = document.createElement('button');
        btn.className = 'starter-btn';
        btn.style.textAlign = 'left';
        
        if (i === gameState.currentUnit) {
            btn.innerHTML = `<span style="color: #32cd32;">&bull; Unit ${i}: ${waltoniaRegions[i].name}</span>`;
            btn.disabled = true;
            btn.style.borderColor = '#32cd32';
        } else {
            btn.textContent = `Unit ${i}: ${waltoniaRegions[i].name}`;
            btn.onclick = () => {
                gameState.currentUnit = i;
                playerPos = { x: 25, y: 25 }; targetPos = { x: 25, y: 25 }; 
                window.saveGame();
                window.showScreen('map');
            };
        }
        list.appendChild(btn);
    }
};

// ==========================================
// 8. ENCOUNTER LOGIC & MULTI-BATTLE SYSTEM
// ==========================================

window.generateEnemy = function(id, level) {
    const masterMon = poekedex.find(p => p.id === id);
    let enemy = JSON.parse(JSON.stringify(masterMon)); 
    enemy.evolutionLevel = level;
    
    if (level > 1 && enemy.evolutions && enemy.evolutions.length > 0) {
        let maxEvoIndex = enemy.evolutions.length - 1;
        let evoIndex = Math.min(level - 2, maxEvoIndex);
        enemy.name = enemy.evolutions[evoIndex].name;
        
        for(let i=0; i < level - 1; i++) {
            let e = enemy.evolutions[Math.min(i, maxEvoIndex)];
            enemy.hp += e.hpBonus;
            enemy.baseAtk += e.atkBonus;
        }
    }
    enemy.currentHP = enemy.hp;
    return enemy;
};

window.startEncounter = function(unit, isGym) {
    gameState.inBattle = true;
    
    if (isGym) {
        window.playBGM('bgm-gym' + unit);
    } else {
        window.playBGM('bgm-battle');
    }
    
    if (gameState.playerTeam.length > 0) {
        window.trackDeployment(gameState.playerTeam[0].id);
    }
    
    if (isGym) {
        if (typeof trainerBank === 'undefined') {
            playerPos.y += 1; targetPos.y += 1; window.showScreen('map'); gameState.inBattle = false;
            return window.showMessage("Trainer data missing! Please ensure trainers.js loaded correctly.");
        }
        const trainer = Object.values(trainerBank).find(t => t.unit === unit);
        
        if (!trainer) {
            playerPos.y += 1; targetPos.y += 1; window.showScreen('map'); gameState.inBattle = false;
            return window.showMessage("Gym Under Construction!");
        }

        gameState.currentTrainer = trainer;
        gameState.gymQueue = JSON.parse(JSON.stringify(trainer.team)); 
        
        let hasBadge = gameState.badges.includes(unit);
        let upgrades = 0;
        if (!gameState.trainerUpgrades) gameState.trainerUpgrades = {};
        if (gameState.trainerUpgrades[unit]) upgrades = gameState.trainerUpgrades[unit];
        
        for (let i = 0; i < upgrades; i++) {
            let idx = i % gameState.gymQueue.length;
            gameState.gymQueue[idx].level += 1;
        }

        let jokeText = "Let's battle!";
        if (hasBadge) {
             jokeText = `You're back for more? My team has gained +${upgrades} level(s) since our last match!`;
        } else if (trainer.jokeIDs && trainer.jokeIDs.length > 0) {
            const jokeId = trainer.jokeIDs[Math.floor(Math.random() * trainer.jokeIDs.length)];
            if (typeof dialoguePool !== 'undefined' && dialoguePool[jokeId]) jokeText = dialoguePool[jokeId];
        }
        
        const introText = hasBadge ? `${trainer.name} is ready for a rematch!\n\n"${jokeText}"` : `${trainer.intro}\n\n"${jokeText}"`;
        
        window.showMessage(introText, () => {
            window.sendNextTrainerMon();
        });

    } else {
        gameState.currentTrainer = null;
        gameState.gymQueue = [];
        
        let selectedMon;
        const hasBadge = gameState.badges.includes(unit);
        
        let regularMons = poekedex.filter(p => p.unit === unit && (!p.desc || !p.desc.includes("Boss")));
        let bossMons = poekedex.filter(p => p.unit === unit && p.desc && p.desc.includes("Boss"));
        
        if (regularMons.length === 0) regularMons = poekedex.filter(p => p.unit === unit); 

        if (hasBadge && bossMons.length > 0 && Math.random() < 0.01) {
            selectedMon = bossMons[Math.floor(Math.random() * bossMons.length)];
        } else {
            selectedMon = regularMons[Math.floor(Math.random() * regularMons.length)];
        }
        
        gameState.currentEnemy = window.generateEnemy(selectedMon.id, 1);
        
        document.getElementById('dialogue-box').textContent = `Wild ${gameState.currentEnemy.name} appeared!`;
        window.initBattleScene();
    }
};

window.sendNextTrainerMon = function() {
    if (!gameState.gymQueue || gameState.gymQueue.length === 0) return;
    
    const nextData = gameState.gymQueue.shift();
    gameState.currentEnemy = window.generateEnemy(nextData.id, nextData.level);
    
    document.getElementById('dialogue-box').textContent = `${gameState.currentTrainer.name} sent out ${gameState.currentEnemy.name}!`;
    window.initBattleScene();
};

window.initBattleScene = function() {
    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    
    window.renderBattleMenu(); 
    window.showScreen('battle');
    window.updateHP(); 
    
    const pSprite = document.getElementById('player-sprite');
    pSprite.innerHTML = '<canvas id="pCanvas" width="80" height="80"></canvas>';
    const pCtx = document.getElementById('pCanvas').getContext('2d');
    let tempMove = isMoving; isMoving = false; 
    window.drawPoekemonSprite(pCtx, gameState.playerTeam[0], 0, 0, 80);
    isMoving = tempMove;

    const eSprite = document.querySelector('.enemy .placeholder-sprite');
    
    if (gameState.currentTrainer) {
        eSprite.style.width = '160px'; 
        eSprite.innerHTML = '<canvas id="eCanvas" width="160" height="80"></canvas>';
        const eCtx = document.getElementById('eCanvas').getContext('2d');
        
        window.drawTrainerSprite(eCtx, gameState.currentTrainer.id, 0, 0, 80);
        
        if (gameState.currentEnemy.currentHP === gameState.currentEnemy.hp) {
            setTimeout(() => {
                window.drawPoekemonSprite(eCtx, gameState.currentEnemy, 80, 0, 80);
            }, 1500);
        } else {
            window.drawPoekemonSprite(eCtx, gameState.currentEnemy, 80, 0, 80);
        }
    } else {
        eSprite.style.width = '80px';
        eSprite.innerHTML = '<canvas id="eCanvas" width="80" height="80"></canvas>';
        const eCtx = document.getElementById('eCanvas').getContext('2d');
        window.drawPoekemonSprite(eCtx, gameState.currentEnemy, 0, 0, 80);
    }
};

window.renderBattleMenu = function() {
    const mon = gameState.playerTeam[0];
    const menu = document.getElementById('action-menu');
    menu.innerHTML = '';
    menu.classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');

    const btnBasic = document.createElement('button');
    btnBasic.className = 'action-btn attack-btn';
    btnBasic.textContent = mon.basicAtkName;
    btnBasic.onclick = () => window.prepareAttack('basic');
    menu.appendChild(btnBasic);

    if (mon.evolutionLevel > 1) {
        const currentEvo = mon.evolutions[mon.evolutionLevel - 2];
        const btnSpecial = document.createElement('button');
        btnSpecial.className = 'action-btn attack-btn';
        btnSpecial.style.background = '#e67e22'; 
        btnSpecial.textContent = currentEvo.specialAtkName;
        btnSpecial.onclick = () => window.prepareAttack('special');
        menu.appendChild(btnSpecial);
    }

    const btnCapture = document.createElement('button');
    btnCapture.id = 'btn-capture';
    btnCapture.className = 'action-btn catch-btn';
    
    const btnRun = document.createElement('button');
    btnRun.className = 'action-btn';
    btnRun.style.background = '#95a5a6';
    btnRun.style.color = 'white';

    if (gameState.currentTrainer) {
        btnCapture.disabled = true;
        btnCapture.textContent = "Trainer's Mon";
        
        btnRun.disabled = true;
        btnRun.textContent = "No Running!";
    } else {
        btnCapture.textContent = "Capture";
        btnCapture.onclick = () => window.attemptCapture();
        
        btnRun.textContent = "Run";
        btnRun.onclick = () => window.prepareEscape();
    }
    
    menu.appendChild(btnCapture);
    menu.appendChild(btnRun);
    
    window.updateHP(); 
};

window.getQuestion = function() {
    let qArray = [];
    if (gameState.currentTrainer) {
        qArray = questionBank[gameState.currentUnit] ? questionBank[gameState.currentUnit].gym : [];
    } else {
        qArray = questionBank[gameState.currentUnit] ? questionBank[gameState.currentUnit].regular : [];
    }
    if (!qArray || qArray.length === 0) return null;
    return qArray[Math.floor(Math.random() * qArray.length)];
};

window.prepareAttack = function(type) {
    const mon = gameState.playerTeam[0];
    if (type === 'basic' && mon.evolutionLevel > 1) {
        window.executeAttack('basic', true, false); 
        return;
    }

    document.getElementById('action-menu').classList.add('hidden');
    gameState.queuedAttack = type;
    
    const q = window.getQuestion();
    if (!q) {
        window.showMessage("No questions loaded! Free hit!", () => window.executeAttack(gameState.queuedAttack, true, true));
        return;
    }
    
    document.getElementById('question-text').textContent = q.q;
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            window.unlockQuestion(q.id); 
            gameState.stats.questionsAnswered++; 
            
            document.getElementById('question-container').classList.add('hidden');
            if (i === q.ans) {
                gameState.stats.questionsCorrect++; 
                window.executeAttack(gameState.queuedAttack, true, true);
            } else {
                window.executeAttack(gameState.queuedAttack, false, false);
            }
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

window.prepareEscape = function() {
    if (gameState.currentTrainer) return; 
    document.getElementById('action-menu').classList.add('hidden');
    const q = window.getQuestion();
    if (!q) return window.endBattle();

    document.getElementById('question-text').textContent = "Answer correctly to flee: " + q.q;
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            window.unlockQuestion(q.id); 
            gameState.stats.questionsAnswered++; 
            
            document.getElementById('question-container').classList.add('hidden');
            if (i === q.ans) {
                gameState.stats.questionsCorrect++; 
                if (Math.random() < 0.5) window.showMessage("Got away safely!", () => window.endBattle());
                else window.showMessage("Couldn't escape!", () => window.enemyTurn());
            } else {
                window.showMessage("Incorrect! You stumbled and couldn't escape!", () => window.enemyTurn());
            }
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

window.executeAttack = function(type, success, earnXP) {
    const mon = gameState.playerTeam[0];
    let dmg = 0;
    let msg = "";
    
    let attackName = mon.basicAtkName;
    if (type === 'special' && mon.evolutionLevel > 1) {
        attackName = mon.evolutions[mon.evolutionLevel - 2].specialAtkName;
    }
    
    if (success) {
        if (type === 'special') {
            const power = mon.evolutions[mon.evolutionLevel - 2].specialAtkPower || 10; 
            dmg = power + Math.floor(Math.random() * 5); 
        } else {
            dmg = (mon.baseAtk || 5) + Math.floor(Math.random() * 4);
        }
        msg = `${mon.name} used ${attackName} for ${dmg} damage!`;
        if (earnXP) mon.xp += 1; 
    } else {
        if (Math.random() > 0.5) {
            dmg = Math.max(1, Math.floor((mon.baseAtk || 5) / 2)); 
            msg = `Incorrect! ${mon.name} stumbled and only dealt ${dmg} damage.`;
        } else {
            dmg = 0;
            msg = `Incorrect! ${mon.name}'s attack missed completely!`;
        }
    }

    gameState.currentEnemy.currentHP -= dmg;
    document.getElementById('dialogue-box').textContent = msg;
    window.updateHP();

    setTimeout(() => {
        if (gameState.currentEnemy.currentHP <= 0) {
            gameState.stats.battlesWon++; 
            window.showMessage("The enemy fainted!", () => window.endBattle());
        } else {
            window.enemyTurn();
        }
    }, 1500);
};

window.enemyTurn = function() {
    const dmg = gameState.currentEnemy.baseAtk + Math.floor(Math.random() * 4);
    gameState.playerTeam[0].currentHP -= dmg;
    document.getElementById('dialogue-box').textContent = `${gameState.currentEnemy.name} attacked back for ${dmg} damage!`;
    window.updateHP();

    setTimeout(() => {
        if (gameState.playerTeam[0].currentHP <= 0) {
            window.showMessage("Your active PoEkemon fainted!", () => {
                gameState.playerTeam[0].currentHP = gameState.playerTeam[0].maxHP; 
                playerPos.y += 1; targetPos.y += 1; 
                
                gameState.currentTrainer = null;
                gameState.gymQueue = [];
                window.saveGame();
                window.endBattle();
            });
        } else {
            document.getElementById('dialogue-box').textContent = `What will ${gameState.playerTeam[0].name} do?`;
            window.renderBattleMenu(); 
        }
    }, 1800);
};

window.attemptCapture = function() {
    if (gameState.currentTrainer) return; 
    document.getElementById('action-menu').classList.add('hidden');
    const q = window.getQuestion();
    if (!q) return window.endBattle();
    
    document.getElementById('question-text').textContent = q.q;
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            window.unlockQuestion(q.id); 
            gameState.stats.questionsAnswered++; 
            
            if (i === q.ans) {
                gameState.stats.questionsCorrect++; 
                const eRatio = gameState.currentEnemy.currentHP / gameState.currentEnemy.hp;
                const catchChance = eRatio <= 0.33 ? 0.90 : 0.50;
                
                if (Math.random() <= catchChance) {
                    gameState.stats.battlesWon++; 
                    window.showMessage(`Correct! You caught ${gameState.currentEnemy.name}!`, () => {
                        const newCatch = { ...gameState.currentEnemy, currentHP: gameState.currentEnemy.hp, maxHP: gameState.currentEnemy.hp, xp: 0, evolutionLevel: 1 };
                        if (!gameState.pokedexCaught.includes(newCatch.id)) gameState.pokedexCaught.push(newCatch.id);

                        if (gameState.playerTeam.length < 6) {
                            gameState.playerTeam.push(newCatch);
                            window.saveGame();
                            window.endBattle();
                        } else {
                            window.showReleaseMenu(newCatch);
                        }
                    });
                } else {
                    window.showMessage("Correct... but it broke free!", () => {
                        document.getElementById('question-container').classList.add('hidden');
                        window.enemyTurn();
                    });
                }
            } else {
                window.showMessage("Incorrect! It broke free!", () => {
                    document.getElementById('question-container').classList.add('hidden');
                    window.enemyTurn();
                });
            }
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

window.updateHP = function() {
    const eRatio = gameState.currentEnemy.currentHP / gameState.currentEnemy.hp;
    const eHP = eRatio * 100;
    const pHP = (gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP) * 100;
    
    const enemyBar = document.getElementById('enemy-hp');
    const playerBar = document.getElementById('player-hp');
    
    enemyBar.style.width = Math.max(0, eHP) + "%";
    playerBar.style.width = Math.max(0, pHP) + "%";
    
    enemyBar.className = 'hp-bar-fill';
    if (eRatio > 0.66) enemyBar.classList.add('hp-green');
    else if (eRatio > 0.33) enemyBar.classList.add('hp-yellow');
    else enemyBar.classList.add('hp-red');

    const pRatio = gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP;
    playerBar.className = 'hp-bar-fill';
    if (pRatio > 0.66) playerBar.classList.add('hp-green');
    else if (pRatio > 0.33) playerBar.classList.add('hp-yellow');
    else playerBar.classList.add('hp-red');
    
    const captureBtn = document.getElementById('btn-capture');
    if (captureBtn && !gameState.currentTrainer) {
        if (eRatio > 0.66) {
            captureBtn.disabled = true;
            captureBtn.textContent = "HP Too High";
        } else {
            captureBtn.disabled = false;
            captureBtn.textContent = "Capture";
        }
    }
};

window.endBattle = function() {
    let evoQueue = [];
    
    gameState.playerTeam.forEach(mon => {
        if (mon.evolutions && (mon.evolutionLevel - 1) < mon.evolutions.length) {
            const nextEvo = mon.evolutions[mon.evolutionLevel - 1];
            if (mon.xp >= nextEvo.reqXP) {
                evoQueue.push(mon);
            }
        }
    });

    const wrapUpBattle = () => {
        if (gameState.currentTrainer && gameState.playerTeam[0].currentHP > 0) {
            if (gameState.gymQueue && gameState.gymQueue.length > 0) {
                let jokeText = "Let's see how you handle my next one!";
                if (gameState.currentTrainer.jokeIDs && gameState.currentTrainer.jokeIDs.length > 0) {
                    const jokeId = gameState.currentTrainer.jokeIDs[Math.floor(Math.random() * gameState.currentTrainer.jokeIDs.length)];
                    if (typeof dialoguePool !== 'undefined' && dialoguePool[jokeId]) jokeText = dialoguePool[jokeId];
                }
                
                window.showMessage(`${gameState.currentTrainer.name}:\n\n"${jokeText}"`, () => {
                    window.sendNextTrainerMon();
                });
            } else {
                let msg = `You defeated ${gameState.currentTrainer.name}! You earned the Unit ${gameState.currentUnit} Badge!`;
                if (gameState.badges.includes(gameState.currentUnit)) {
                    msg = `You defeated ${gameState.currentTrainer.name} again! Their team will train harder for next time.`;
                }
                
                window.showMessage(msg, () => {
                    if (!gameState.badges.includes(gameState.currentUnit)) {
                        gameState.badges.push(gameState.currentUnit);
                    }
                    if (!gameState.trainerUpgrades) gameState.trainerUpgrades = {};
                    gameState.trainerUpgrades[gameState.currentUnit] = (gameState.trainerUpgrades[gameState.currentUnit] || 0) + 1;
                    
                    gameState.currentTrainer = null;
                    gameState.inBattle = false;
                    playerPos.y += 1; targetPos.y += 1; 
                    window.saveGame();
                    window.showScreen('map');
                });
            }
        } else {
            gameState.inBattle = false;
            window.saveGame(); 
            window.showScreen('map');
        }
    };

    const processEvolutions = () => {
        if (evoQueue.length === 0) {
            wrapUpBattle();
            return;
        }
        const mon = evoQueue.shift();
        const nextEvo = mon.evolutions[mon.evolutionLevel - 1];
        window.showMessage(`What?! Your ${mon.name} is evolving into ${nextEvo.name}!`, () => {
            mon.name = nextEvo.name;
            mon.maxHP += nextEvo.hpBonus;
            mon.currentHP += nextEvo.hpBonus; 
            mon.baseAtk += nextEvo.atkBonus;
            mon.evolutionLevel += 1;
            window.saveGame();
            processEvolutions(); 
        });
    };

    processEvolutions();
};

// ==========================================
// 9. PARTY LIMITS, DEX RENDERING & KENNEL
// ==========================================
window.showReleaseMenu = function(newCatch) {
    const overlay = document.getElementById('release-overlay');
    if (!overlay) return window.endBattle(); 
    
    const newCatchDisplay = document.getElementById('new-catch-display');
    if (newCatchDisplay) {
        newCatchDisplay.innerHTML = `
            <h3 style="color: var(--walton-blue); margin-bottom: 5px;">Caught: ${newCatch.name}</h3>
            Type: ${newCatch.type} | Lvl: <span class="release-stat">${newCatch.evolutionLevel}</span><br>
            HP: <span class="release-stat">${newCatch.maxHP}</span> | Atk: <span class="release-stat">${newCatch.baseAtk}</span>
        `;
    }

    const grid = document.getElementById('release-grid');
    if (grid) {
        grid.innerHTML = ''; 

        gameState.playerTeam.forEach((mon, index) => {
            const btn = document.createElement('button');
            btn.className = 'starter-btn';
            btn.style.borderColor = '#c8102e'; 
            btn.style.padding = '8px';
            btn.innerHTML = `
                <strong>${mon.name}</strong><br>
                <span style="font-size: 6px;">Lvl: ${mon.evolutionLevel} | XP: ${mon.xp}</span><br>
                <span style="font-size: 6px;">HP: ${mon.currentHP}/${mon.maxHP} | Atk: ${mon.baseAtk}</span><br>
                <em style="color: #c8102e; display: block; margin-top: 5px;">Release</em>
            `;
            btn.onclick = () => {
                window.showConfirm(`Release ${mon.name} and add ${newCatch.name}?`, () => {
                    gameState.playerTeam[index] = newCatch;
                    window.saveGame();
                    overlay.classList.add('hidden');
                    window.endBattle();
                });
            };
            grid.appendChild(btn);
        });
    }

    const releaseNewBtn = document.getElementById('release-new-btn');
    if (releaseNewBtn) {
        releaseNewBtn.onclick = () => {
            window.showMessage(`You let ${newCatch.name} go.`, () => {
                overlay.classList.add('hidden');
                window.saveGame(); 
                window.endBattle();
            });
        };
    }

    overlay.classList.remove('hidden');
};

window.renderDex = function() {
    const partyGrid = document.getElementById('party-grid');
    partyGrid.innerHTML = '';
    
    gameState.playerTeam.forEach((mon, index) => {
        const card = document.createElement('div');
        card.className = 'party-card';
        card.onclick = () => window.openDexCard(mon, true);
        
        const isActive = (index === 0);
        card.innerHTML = `
            <h4>${mon.name}</h4>
            <p>${mon.type}</p>
            <p>HP: ${mon.currentHP}/${mon.maxHP}</p>
            <p style="color: #c8102e; font-weight: bold;">Lvl ${mon.evolutionLevel} | XP: ${mon.xp}</p>
            ${isActive ? '<span class="active-badge">ACTIVE FIGHTER</span>' : `<button class="deploy-btn" onclick="event.stopPropagation(); deployMon(${mon.id})">Deploy</button>`}
        `;
        partyGrid.appendChild(card);
    });

    const dexGrid = document.getElementById('dex-grid');
    dexGrid.innerHTML = '';
    
    poekedex.forEach(mon => {
        const hasCaught = gameState.pokedexCaught.includes(mon.id);
        const card = document.createElement('div');
        card.className = `dex-entry ${hasCaught ? 'captured' : ''}`;
        
        if (hasCaught) {
            card.innerHTML = `<h4>${mon.name}</h4><p>${mon.type}</p>`;
            const partyVersion = gameState.playerTeam.find(p => p.id === mon.id);
            card.onclick = () => window.openDexCard(partyVersion || mon, !!partyVersion);
        } else {
            card.innerHTML = `<h4>???</h4><p>Unit ${mon.unit}</p>`;
        }
        dexGrid.appendChild(card);
    });
};

window.deployMon = function(id) {
    const index = gameState.playerTeam.findIndex(p => p.id === id);
    if (index > 0) {
        const temp = gameState.playerTeam[0];
        gameState.playerTeam[0] = gameState.playerTeam[index];
        gameState.playerTeam[index] = temp;
        
        window.trackDeployment(gameState.playerTeam[0].id); 
        window.saveGame();
        window.renderDex(); 
        
        if (gameState.inBattle) {
            window.showMessage(`You sent out ${gameState.playerTeam[0].name}!`, () => {
                window.showScreen('battle');
                window.updateHP();
                
                const pCtx = document.getElementById('pCanvas').getContext('2d');
                pCtx.clearRect(0, 0, 80, 80);
                window.drawPoekemonSprite(pCtx, gameState.playerTeam[0], 0, 0, 80);
                document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
                
                window.enemyTurn();
            });
        }
    }
};

window.openDexCard = function(mon, isOwned) {
    const overlay = document.getElementById('dex-card-overlay');
    document.getElementById('card-name').textContent = mon.name.toUpperCase();
    document.getElementById('card-id').textContent = `#${mon.id.toString().padStart(2, '0')}`;
    document.getElementById('card-type').textContent = mon.type;
    document.getElementById('card-level').textContent = mon.evolutionLevel || 1;
    document.getElementById('card-unit').textContent = mon.unit || "Starter";
    document.getElementById('card-hp').textContent = mon.hp || mon.maxHP;
    document.getElementById('card-atk').textContent = mon.baseAtk;
    document.getElementById('card-desc').textContent = mon.desc;

    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let tempMove = isMoving; isMoving = false;
    window.drawPoekemonSprite(ctx, mon, 0, 0, 120);
    isMoving = tempMove;
    
    overlay.classList.remove('hidden');
};

window.closeDexCard = function() {
    document.getElementById('dex-card-overlay').classList.add('hidden');
};

// POEKENNEL PC SYSTEM LOGIC
window.openKennel = function() {
    if (!gameState.kennel) gameState.kennel = [];
    window.renderKennel();
    document.getElementById('kennel-overlay').classList.remove('hidden');
};

window.renderKennel = function() {
    const partyGrid = document.getElementById('kennel-party-grid');
    const boxGrid = document.getElementById('kennel-box-grid');
    if (!partyGrid || !boxGrid) return;
    
    partyGrid.innerHTML = '';
    boxGrid.innerHTML = '';

    // Render Current Party
    gameState.playerTeam.forEach((mon, index) => {
        const slot = document.createElement('div');
        slot.className = 'kennel-slot';
        
        const info = document.createElement('div');
        info.innerHTML = `
            <strong>${mon.name}</strong><br>
            <span style="font-size: 6px;">Lvl: ${mon.evolutionLevel} | XP: ${mon.xp}</span><br>
            <span style="font-size: 6px;">HP: ${mon.currentHP}/${mon.maxHP} | Atk: ${mon.baseAtk}</span>
        `;
        info.style.marginBottom = '10px';
        slot.appendChild(info);
        
        if (gameState.playerTeam.length > 1) {
            const btn = document.createElement('button');
            btn.className = 'action-btn';
            btn.style.width = '100%';
            btn.style.padding = '5px';
            btn.textContent = 'Deposit';
            btn.onclick = () => {
                gameState.kennel.push(gameState.playerTeam.splice(index, 1)[0]);
                window.saveGame();
                window.renderKennel();
                window.renderDex(); 
            };
            slot.appendChild(btn);
        } else {
            const err = document.createElement('span');
            err.style.color = 'var(--walton-red)';
            err.style.fontSize = '6px';
            err.textContent = 'Cannot Deposit Last Mon';
            slot.appendChild(err);
        }
        partyGrid.appendChild(slot);
    });

    // Pad Party with empties
    for(let i=gameState.playerTeam.length; i<6; i++) {
        const empty = document.createElement('div');
        empty.className = 'kennel-slot empty';
        empty.textContent = 'Empty Slot';
        partyGrid.appendChild(empty);
    }

    // Render PC Storage Box
    gameState.kennel.forEach((mon, index) => {
        const slot = document.createElement('div');
        slot.className = 'kennel-slot';
        
        const info = document.createElement('div');
        info.innerHTML = `
            <strong>${mon.name}</strong><br>
            <span style="font-size: 6px;">Lvl: ${mon.evolutionLevel} | XP: ${mon.xp}</span><br>
            <span style="font-size: 6px;">HP: ${mon.currentHP}/${mon.maxHP} | Atk: ${mon.baseAtk}</span>
        `;
        info.style.marginBottom = '10px';
        slot.appendChild(info);
        
        if (gameState.playerTeam.length < 6) {
            const btn = document.createElement('button');
            btn.className = 'action-btn catch-btn';
            btn.style.width = '100%';
            btn.style.marginBottom = '5px';
            btn.style.padding = '5px';
            btn.textContent = 'Withdraw';
            btn.onclick = () => {
                gameState.playerTeam.push(gameState.kennel.splice(index, 1)[0]);
                window.saveGame();
                window.renderKennel();
                window.renderDex();
            };
            slot.appendChild(btn);
        }
        
        const releaseBtn = document.createElement('button');
        releaseBtn.className = 'action-btn attack-btn';
        releaseBtn.style.width = '100%';
        releaseBtn.style.padding = '5px';
        releaseBtn.textContent = 'Release';
        releaseBtn.onclick = () => {
            window.showConfirm(`Permanently release ${mon.name} into the wild?`, () => {
                gameState.kennel.splice(index, 1);
                window.saveGame();
                window.renderKennel();
            });
        };
        slot.appendChild(releaseBtn);
        
        boxGrid.appendChild(slot);
    });
    
    // Pad Box with empties for aesthetic
    const emptySlots = Math.max(16 - gameState.kennel.length, 0);
    for(let i=0; i<emptySlots; i++) {
        const empty = document.createElement('div');
        empty.className = 'kennel-slot empty';
        empty.textContent = '---';
        boxGrid.appendChild(empty);
    }
};

// ==========================================
// 10. POEQUEDEX 
// ==========================================
window.renderQuedex = function() {
    if (typeof questionBank === 'undefined') {
        alert("Error: questionBank is not loaded. Please fix questions.js syntax errors.");
        return;
    }
    
    const unitSelect = document.getElementById('quedex-unit-select');
    if (!unitSelect) return;
    const unit = unitSelect.value;
    
    const grid = document.getElementById('quedex-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!questionBank[unit]) return;

    const allQuestions = [...questionBank[unit].regular, ...questionBank[unit].gym];

    allQuestions.forEach((q, index) => {
        const isUnlocked = gameState.answeredQuestions && gameState.answeredQuestions.includes(q.id);

        const container = document.createElement('div');
        container.className = 'flashcard-container';
        
        const card = document.createElement('div');
        card.className = 'flashcard';

        if (isUnlocked) {
            container.onclick = function() {
                this.querySelector('.flashcard').classList.toggle('flipped');
            };

            const front = document.createElement('div');
            front.className = 'flashcard-front';
            let badgeType = q.id.includes('_g') ? '<span style="color:#c8102e;">[GYM]</span>' : '';
            front.innerHTML = `<h4>Question #${index + 1} ${badgeType}</h4><p>${q.q}</p>`;

            const back = document.createElement('div');
            back.className = 'flashcard-back';
            const correctAnswerText = q.options[q.ans];
            back.innerHTML = `
                <h4>Answer</h4>
                <p class="ans-text">${correctAnswerText}</p>
                <p class="exp-text">${q.exp || "No explanation provided."}</p>
            `;

            card.appendChild(front);
            card.appendChild(back);
        } else {
            container.classList.add('locked');
            card.classList.add('locked');

            const front = document.createElement('div');
            front.className = 'flashcard-front';
            let badgeType = q.id.includes('_g') ? '<span style="color:#c8102e;">[GYM]</span>' : '';
            front.innerHTML = `<h4>Question #${index + 1} ${badgeType}</h4><p>???</p>`;
            
            card.appendChild(front);
        }

        container.appendChild(card);
        grid.appendChild(container);
    });
};
