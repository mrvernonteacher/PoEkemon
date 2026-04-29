// ==========================================
// 1. ENGINE CONFIG
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
    currentUnit: 1,
    currentEnemy: null,
    currentTrainer: null, 
    gymQueue: [],         
    queuedAttack: null,   
    inBattle: false
};

let playerPos = { x: 25, y: 25 };
const spriteCache = {}; 

// ==========================================
// 2. CUSTOM ALERTS
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
// 3. SPRITE ENGINE
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
        ctx.fillRect(x + 18*s, y + 16*s, 5*s, 4*s); ctx.fillRect(x + 27*s, y + 16*s, 5*s, 4*s);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + 20*s, y + 17*s, 2*s, 2*s); ctx.fillRect(x + 27*s, y + 17*s, 2*s, 2*s);
        ctx.fillRect(x + 23*s, y + 17*s, 4*s, 2*s); 

        ctx.fillStyle = "#0033a0"; 
        ctx.fillRect(x + 12*s, y + 26*s, 26*s, 16*s);
        ctx.fillStyle = "#c8102e"; 
        ctx.fillRect(x + 23*s, y + 30*s, 4*s, 4*s); 

        ctx.fillStyle = "#e0ac69"; 
        ctx.fillRect(x + 8*s, y + 28*s, 4*s, 12*s); ctx.fillRect(x + 38*s, y + 28*s, 4*s, 12*s);

        ctx.fillStyle = "#d2b48c"; 
        ctx.fillRect(x + 14*s, y + 42*s, 8*s, 12*s); ctx.fillRect(x + 28*s, y + 42*s, 8*s, 12*s);
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
            const screenBattle = document.getElementById('screen-battle');
            if (screenBattle && screenBattle.classList.contains('active')) window.updateHP(); 
            const cardOverlay = document.getElementById('dex-card-overlay');
            if (cardOverlay && !cardOverlay.classList.contains('hidden')) {
                const cardCanvas = document.getElementById('cardCanvas');
                if(cardCanvas) {
                    const cardCtx = cardCanvas.getContext('2d');
                    cardCtx.clearRect(0, 0, 120, 120);
                    cardCtx.drawImage(img, 0, 0, 120, 120);
                }
            }
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
// 4. MAP NAVIGATION 
// ==========================================
window.drawMap = function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const map = unitMaps[gameState.currentUnit];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let offsetX = playerPos.x - Math.floor(VIEW_WIDTH / 2);
    let offsetY = playerPos.y - Math.floor(VIEW_HEIGHT / 2);
    offsetX = Math.max(0, Math.min(offsetX, MAP_WIDTH - VIEW_WIDTH));
    offsetY = Math.max(0, Math.min(offsetY, MAP_HEIGHT - VIEW_HEIGHT));

    for (let y = 0; y < VIEW_HEIGHT; y++) {
        for (let x = 0; x < VIEW_WIDTH; x++) {
            let tile = map[offsetY + y][offsetX + x];
            if (tile === 0) ctx.fillStyle = "#e2e2e2"; 
            if (tile === 1) ctx.fillStyle = "#78c850"; 
            if (tile === 2) ctx.fillStyle = "#ff6b6b"; 
            if (tile === 3) ctx.fillStyle = "#2d4c1e"; 
            if (tile === 4) ctx.fillStyle = "#3498db"; 
            if (tile === 5) ctx.fillStyle = "#95a5a6"; 
            
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            if (tile === 4) {
                ctx.fillStyle = "white";
                ctx.fillRect(x * TILE_SIZE + 15, y * TILE_SIZE + 5, 10, 30);
                ctx.fillRect(x * TILE_SIZE + 5, y * TILE_SIZE + 15, 30, 10);
            }
            if (tile === 5) {
                ctx.fillStyle = "#333";
                ctx.fillRect(x * TILE_SIZE + 5, y * TILE_SIZE, 5, 40);
                ctx.fillRect(x * TILE_SIZE + 30, y * TILE_SIZE, 5, 40);
                ctx.fillStyle = "#8b4513"; 
                for(let t=5; t<40; t+=10) ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE + t, 40, 4);
            }
        }
    }
    const px = (playerPos.x - offsetX) * TILE_SIZE;
    const py = (playerPos.y - offsetY) * TILE_SIZE;
    window.drawCharacterSprite(ctx, px, py, TILE_SIZE);
};

window.addEventListener('keydown', (e) => {
    const screenMap = document.getElementById('screen-map');
    const msgOverlay = document.getElementById('message-overlay');
    
    if (!screenMap || !screenMap.classList.contains('active')) return;
    if (msgOverlay && !msgOverlay.classList.contains('hidden')) return;

    let nx = playerPos.x, ny = playerPos.y;
    if (['ArrowUp', 'w'].includes(e.key)) ny--;
    if (['ArrowDown', 's'].includes(e.key)) ny++;
    if (['ArrowLeft', 'a'].includes(e.key)) nx--;
    if (['ArrowRight', 'd'].includes(e.key)) nx++;

    const map = unitMaps[gameState.currentUnit];
    if (ny >= 0 && ny < MAP_HEIGHT && nx >= 0 && nx < MAP_WIDTH && map[ny][nx] !== 3) {
        playerPos.x = nx; playerPos.y = ny;
        window.drawMap();
        
        if (map[ny][nx] === 4) window.triggerClinic();
        else if (map[ny][nx] === 5) window.triggerTrainStation();
        else if (map[ny][nx] === 1 && Math.random() < 0.12) window.startEncounter(gameState.currentUnit, false);
        else if (map[ny][nx] === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// ==========================================
// 5. FILE I/O & BULLETPROOF INITIALIZATION
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
        const region = waltoniaRegions[gameState.currentUnit];
        const label = document.getElementById('map-label');
        if (label) label.textContent = `Unit ${gameState.currentUnit}: ${region ? region.name : "Unknown Area"}`;
        setTimeout(window.drawMap, 50);
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
        
        // --- ANTI-SOFT-LOCK FIX ---
        gameState.inBattle = false;
        gameState.currentEnemy = null;
        gameState.currentTrainer = null;
        gameState.gymQueue = [];
        
        if (!Array.isArray(gameState.playerTeam)) gameState.playerTeam = [];
        if (!Array.isArray(gameState.pokedexCaught)) gameState.pokedexCaught = [];
        if (!Array.isArray(gameState.answeredQuestions)) gameState.answeredQuestions = [];
        if (!Array.isArray(gameState.badges)) gameState.badges = [];
        if (!Array.isArray(gameState.gymQueue)) gameState.gymQueue = [];
        
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
    
    // Generate Timestamp
    const now = new Date();
    const timestamp = now.getFullYear() + "-" +
                      String(now.getMonth() + 1).padStart(2, '0') + "-" +
                      String(now.getDate()).padStart(2, '0') + "_" +
                      String(now.getHours()).padStart(2, '0') + "-" +
                      String(now.getMinutes()).padStart(2, '0') + "-" +
                      String(now.getSeconds()).padStart(2, '0');
                      
    const defaultFilename = `poekedex_save_${timestamp}.json`;

    try {
        // Try using the modern File System Access API (prompts for location)
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: defaultFilename,
                types: [{
                    description: 'JSON Save File',
                    accept: {'application/json': ['.json']},
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(dataStr);
            await writable.close();
            
            window.showMessage("Game saved successfully!");
            return;
        }
    } catch (err) {
        // If user cancelled the prompt, abort silently. Otherwise log.
        if (err.name !== 'AbortError') console.error("File System Access API error:", err);
        else return; 
    }

    // Fallback for browsers that don't support showSaveFilePicker
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

window.toggleSettings = function() { 
    const overlay = document.getElementById('settings-overlay');
    if (overlay) overlay.classList.toggle('hidden'); 
};

window.resetGame = function() { 
    window.showConfirm("Are you sure you want to reset all progress?", () => {
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

    window.loadGame();
    
    const btnSettings = document.getElementById('btn-settings');
    if(btnSettings) btnSettings.onclick = window.toggleSettings;
    
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

    if (!gameState.playerTeam || gameState.playerTeam.length === 0) {
        window.showScreen('characterSelect');
    } else {
        window.showScreen('map');
    }
};

window.unlockQuestion = function(qId) {
    if (!gameState.answeredQuestions) gameState.answeredQuestions = [];
    if (!gameState.answeredQuestions.includes(qId)) {
        gameState.answeredQuestions.push(qId);
        window.saveGame();
    }
};

// ==========================================
// 6. MAP BUILDINGS (CLINIC & STATION)
// ==========================================
window.triggerClinic = function() {
    let qArray = questionBank[gameState.currentUnit] ? questionBank[gameState.currentUnit].regular : [];
    if (!qArray || qArray.length === 0) return window.showMessage("Under Construction!", () => { playerPos.y += 1; window.showScreen('map'); });

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
            document.querySelector('.battle-stage').style.display = 'block';
            if (i === q.ans) {
                gameState.playerTeam.forEach(mon => mon.currentHP = mon.maxHP);
                window.saveGame();
                window.showMessage("Correct! Your PoEkemon are fully healed.", () => {
                    playerPos.y += 1; 
                    window.showScreen('map');
                });
            } else {
                window.showMessage("Incorrect. Study your notes and try again!", () => {
                    playerPos.y += 1; 
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
    playerPos.y += 1; 

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
                playerPos = { x: 25, y: 25 }; 
                window.saveGame();
                window.showScreen('map');
            };
        }
        list.appendChild(btn);
    }
};

// ==========================================
// 7. MULTI-BATTLE SYSTEM
// ==========================================
window.generateEnemy = function(id, level) {
    const masterMon = poekedex.find(p => p.id === id);
    let enemy = JSON.parse(JSON.stringify(masterMon)); 
    enemy.evolutionLevel = level;
    
    if (level > 1 && enemy.evolutions && enemy.evolutions.length > 0) {
        enemy.name = enemy.evolutions[level - 2].name;
        for(let i=0; i < level - 1; i++) {
            if (enemy.evolutions[i]) {
                enemy.hp += enemy.evolutions[i].hpBonus;
                enemy.baseAtk += enemy.evolutions[i].atkBonus;
            }
        }
    }
    enemy.currentHP = enemy.hp;
    return enemy;
};

window.startEncounter = function(unit, isGym) {
    gameState.inBattle = true;
    
    if (isGym) {
        if (typeof trainerBank === 'undefined') {
            return window.showMessage("Trainer data missing! Please ensure trainers.js loaded correctly.", () => { playerPos.y += 1; window.showScreen('map'); gameState.inBattle = false; });
        }
        const trainer = Object.values(trainerBank).find(t => t.unit === unit);
        
        if (!trainer) return window.showMessage("Gym Under Construction!", () => { playerPos.y += 1; window.showScreen('map'); gameState.inBattle = false; });
        
        if (gameState.badges.includes(unit)) {
            return window.showMessage(`You already defeated ${trainer.name} and earned the Unit ${unit} Badge!`, () => { playerPos.y += 1; window.showScreen('map'); gameState.inBattle = false; });
        }

        gameState.currentTrainer = trainer;
        gameState.gymQueue = JSON.parse(JSON.stringify(trainer.team)); 
        
        let jokeText = "Let's battle!";
        if (trainer.jokeIDs && trainer.jokeIDs.length > 0) {
            const jokeId = trainer.jokeIDs[Math.floor(Math.random() * trainer.jokeIDs.length)];
            if (typeof dialoguePool !== 'undefined' && dialoguePool[jokeId]) jokeText = dialoguePool[jokeId];
        }
        
        window.showMessage(`${trainer.intro}\n\n"${jokeText}"`, () => {
            window.sendNextTrainerMon();
        });

    } else {
        gameState.currentTrainer = null;
        gameState.gymQueue = [];
        const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
        gameState.currentEnemy = window.generateEnemy(unitMons[Math.floor(Math.random() * unitMons.length)].id, 1);
        
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
    window.drawPoekemonSprite(pCtx, gameState.playerTeam[0], 0, 0, 80);

    const eSprite = document.querySelector('.enemy .placeholder-sprite');
    eSprite.innerHTML = '<canvas id="eCanvas" width="80" height="80"></canvas>';
    const eCtx = document.getElementById('eCanvas').getContext('2d');
    
    if (gameState.currentTrainer && gameState.currentEnemy.currentHP === gameState.currentEnemy.hp) {
        window.drawTrainerSprite(eCtx, gameState.currentTrainer.id, 0, 0, 80);
        setTimeout(() => {
            eCtx.clearRect(0, 0, 80, 80);
            window.drawPoekemonSprite(eCtx, gameState.currentEnemy, 0, 0, 80);
        }, 1500);
    } else {
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
            document.getElementById('question-container').classList.add('hidden');
            if (i === q.ans) window.executeAttack(gameState.queuedAttack, true, true);
            else window.executeAttack(gameState.queuedAttack, false, false);
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
            document.getElementById('question-container').classList.add('hidden');
            if (i === q.ans) {
                if (Math.random() < 0.5) window.showMessage("Got away safely!", () => window.endBattle());
                else window.showMessage("Couldn't escape!", () => window.enemyTurn());
            } else window.showMessage("Incorrect! You stumbled and couldn't escape!", () => window.enemyTurn());
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
                playerPos = { x: 25, y: 25 }; 
                
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
            if (i === q.ans) {
                const eRatio = gameState.currentEnemy.currentHP / gameState.currentEnemy.hp;
                const catchChance = eRatio <= 0.33 ? 0.90 : 0.50;
                
                if (Math.random() <= catchChance) {
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
                window.sendNextTrainerMon();
            } else {
                window.showMessage(`You defeated ${gameState.currentTrainer.name}! You earned the Unit ${gameState.currentUnit} Badge!`, () => {
                    if (!gameState.badges.includes(gameState.currentUnit)) gameState.badges.push(gameState.currentUnit);
                    gameState.currentTrainer = null;
                    gameState.inBattle = false;
                    playerPos.y += 1; 
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
// 8. PARTY LIMITS, DEX RENDERING & CARDS
// ==========================================
window.showReleaseMenu = function(newCatch) {
    const overlay = document.getElementById('release-overlay');
    const grid = document.getElementById('release-grid');
    grid.innerHTML = ''; 

    gameState.playerTeam.forEach((mon, index) => {
        const btn = document.createElement('button');
        btn.className = 'starter-btn';
        btn.style.borderColor = '#c8102e'; 
        btn.innerHTML = `<strong>${mon.name}</strong><br>HP: ${mon.maxHP}<br><em>Release</em>`;
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

    document.getElementById('release-new-btn').onclick = () => {
        window.showMessage(`${newCatch.name} was released.`, () => {
            overlay.classList.add('hidden');
            window.saveGame(); 
            window.endBattle();
        });
    };

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
    
    window.drawPoekemonSprite(ctx, mon, 0, 0, 120);
    overlay.classList.remove('hidden');
};

window.closeDexCard = function() {
    document.getElementById('dex-card-overlay').classList.add('hidden');
};

// ==========================================
// 9. POEQUEDEX 
// ==========================================
window.renderQuedex = function() {
    const unit = document.getElementById('quedex-unit-select').value;
    const grid = document.getElementById('quedex-grid');
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
