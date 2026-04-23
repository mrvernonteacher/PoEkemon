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
    badges: [],
    currentUnit: 1,
    currentEnemy: null,
    isTrainerBattle: false
};

let playerPos = { x: 25, y: 25 };
const spriteCache = {}; // Stores loaded PNGs to save memory

// ==========================================
// 2. SPRITE ENGINE
// ==========================================

// Draws Mr. V or Mrs. G
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

// Draws PoEkemon (Tries to load PNG, falls back to Type-Colored Shape)
window.drawPoekemonSprite = function(ctx, mon, x, y, size) {
    if (!mon) return;

    // If we haven't tried loading this image yet
    if (spriteCache[mon.id] === undefined) {
        const img = new Image();
        img.src = `assets/${mon.id}.png`; // Looks for assets/1.png, etc.
        
        img.onload = () => {
            spriteCache[mon.id] = img;
            // Force redraw of battle scene if image loads late
            if (document.getElementById('screen-battle').classList.contains('active')) {
                window.updateHP(); 
            }
        };
        img.onerror = () => {
            spriteCache[mon.id] = null; // Mark as failed, use fallback
        };
        spriteCache[mon.id] = 'loading';
    }

    if (spriteCache[mon.id] && spriteCache[mon.id] !== 'loading') {
        // We have the student's PNG! Draw it.
        ctx.drawImage(spriteCache[mon.id], x, y, size, size);
    } else {
        // Fallback: Generate a 8-bit block colored by Engineering Type
        const s = size / 40;
        ctx.save();
        
        let color = "#7f8c8d"; // Default Gray
        if(mon.type.includes("Logic") || mon.type.includes("Sensor") || mon.type.includes("Algorithm")) color = "#2ecc71"; // Tech Green
        if(mon.type.includes("Renewable") || mon.type.includes("Energy")) color = "#f1c40f"; // Energy Yellow
        if(mon.type.includes("Thermodynamics") || mon.type.includes("Propulsion")) color = "#e74c3c"; // Heat Red
        if(mon.type.includes("Aerodynamics") || mon.type.includes("Flow")) color = "#3498db"; // Aero Blue
        if(mon.type.includes("Structure") || mon.type.includes("Machine") || mon.type.includes("Material")) color = "#95a5a6"; // Steel Gray

        // Draw generic monster body
        ctx.fillStyle = color;
        ctx.fillRect(x + 5*s, y + 10*s, 30*s, 25*s); 
        ctx.fillRect(x + 10*s, y + 5*s, 20*s, 5*s); 
        
        // Eyes
        ctx.fillStyle = "#fff";
        ctx.fillRect(x + 10*s, y + 15*s, 6*s, 6*s); 
        ctx.fillRect(x + 24*s, y + 15*s, 6*s, 6*s); 
        ctx.fillStyle = "#000";
        ctx.fillRect(x + 12*s, y + 17*s, 2*s, 2*s); 
        ctx.fillRect(x + 24*s, y + 17*s, 2*s, 2*s);

        // ID Number tattoo
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.font = `${8*s}px 'Press Start 2P'`;
        ctx.fillText(`#${mon.id}`, x + 10*s, y + 30*s);
        
        ctx.restore();
    }
};

// ==========================================
// 3. MAP NAVIGATION (CAMERA)
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
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            
            if (tile === 4) {
                ctx.fillStyle = "white";
                ctx.fillRect(x * TILE_SIZE + 15, y * TILE_SIZE + 5, 10, 30);
                ctx.fillRect(x * TILE_SIZE + 5, y * TILE_SIZE + 15, 30, 10);
            }
        }
    }
    const px = (playerPos.x - offsetX) * TILE_SIZE;
    const py = (playerPos.y - offsetY) * TILE_SIZE;
    window.drawCharacterSprite(ctx, px, py, TILE_SIZE);
};

window.addEventListener('keydown', (e) => {
    if (!document.getElementById('screen-map').classList.contains('active')) return;
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
        else if (map[ny][nx] === 1 && Math.random() < 0.12) window.startEncounter(gameState.currentUnit, false);
        else if (map[ny][nx] === 2) window.startEncounter(gameState.currentUnit, true);
    }
});

// ==========================================
// 4. MENUS & INITIALIZATION
// ==========================================
window.showScreen = function(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden', 'active'));
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + name);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    if (name === 'map') {
        const region = waltoniaRegions[gameState.currentUnit];
        document.getElementById('map-label').textContent = `Unit ${gameState.currentUnit}: ${region ? region.name : "Unknown Area"}`;
        setTimeout(window.drawMap, 50);
    }
};

window.saveGame = function() { localStorage.setItem('PoEkemon_Waltonia_Save', JSON.stringify(gameState)); };
window.loadGame = function() { 
    const saved = localStorage.getItem('PoEkemon_Waltonia_Save'); 
    if (saved) {
        gameState = JSON.parse(saved);
        if (!gameState.pokedexCaught) gameState.pokedexCaught = [];
    }
};
window.toggleSettings = function() { document.getElementById('settings-overlay').classList.toggle('hidden'); };
window.resetGame = function() { if (confirm("Reset progress?")) { localStorage.removeItem('PoEkemon_Waltonia_Save'); location.reload(); } };

window.selectStarter = function(char, id) {
    gameState.playerCharacter = char;
    const mon = poekedex.find(p => p.id === id);
    if (mon) {
        gameState.playerTeam = [{ ...mon, currentHP: mon.hp, maxHP: mon.hp }];
        gameState.pokedexCaught.push(id); 
        playerPos = { x: 25, y: 25 }; 
        window.saveGame();
        window.showScreen('map');
    }
};

window.onload = () => {
    window.loadGame();
    document.getElementById('btn-settings').onclick = window.toggleSettings;
    document.getElementById('btn-map').onclick = () => window.showScreen('map');
    document.getElementById('btn-dex').onclick = () => {
        window.renderDex();
        window.showScreen('dex');
    };

    if (!gameState.playerTeam || gameState.playerTeam.length === 0) window.showScreen('characterSelect');
    else window.showScreen('map');
};

// ==========================================
// 5. CLINIC HEALING LOGIC
// ==========================================
window.triggerClinic = function() {
    const questions = questionBank[gameState.currentUnit];
    const q = questions[Math.floor(Math.random() * questions.length)];
    
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
            document.querySelector('.battle-stage').style.display = 'block';
            if (i === q.ans) {
                gameState.playerTeam.forEach(mon => mon.currentHP = mon.maxHP);
                window.saveGame();
                alert("Correct! Your PoEkemon are fully healed.");
            } else {
                alert("Incorrect. Study your notes and try again!");
            }
            playerPos.y += 1; 
            window.showScreen('map');
        };
        grid.appendChild(btn);
    });
    document.getElementById('question-container').classList.remove('hidden');
};

// ==========================================
// 6. COMBAT LOGIC
// ==========================================
window.startEncounter = function(unit, isGym) {
    const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('dialogue-box').textContent = `Wild ${gameState.currentEnemy.name} appeared!`;
    document.getElementById('action-menu').classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
    
    window.showScreen('battle');
    window.updateHP(); 
    
    // Draw Player Sprite
    const pSprite = document.getElementById('player-sprite');
    pSprite.innerHTML = '<canvas id="pCanvas" width="80" height="80"></canvas>';
    const pCtx = document.getElementById('pCanvas').getContext('2d');
    window.drawPoekemonSprite(pCtx, gameState.playerTeam[0], 0, 0, 80);

    // Draw Enemy Sprite
    const eSprite = document.querySelector('.enemy .placeholder-sprite');
    eSprite.innerHTML = '<canvas id="eCanvas" width="80" height="80"></canvas>';
    const eCtx = document.getElementById('eCanvas').getContext('2d');
    window.drawPoekemonSprite(eCtx, gameState.currentEnemy, 0, 0, 80);
};

window.executeAttack = function() {
    document.getElementById('action-menu').classList.add('hidden');
    
    // Uses the new baseAtk stat from your updated poekedex.js
    const dmg = gameState.playerTeam[0].baseAtk + Math.floor(Math.random() * 4);
    gameState.currentEnemy.currentHP -= dmg;
    
    document.getElementById('dialogue-box').textContent = `${gameState.playerTeam[0].name} attacked for ${dmg} damage!`;
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
    const dmg = gameState.currentEnemy.baseAtk + Math.floor(Math.random() * 4);
    gameState.playerTeam[0].currentHP -= dmg;
    document.getElementById('dialogue-box').textContent = `${gameState.currentEnemy.name} attacked back for ${dmg} damage!`;
    window.updateHP();

    setTimeout(() => {
        if (gameState.playerTeam[0].currentHP <= 0) {
            alert("Your active PoEkemon fainted!");
            gameState.playerTeam[0].currentHP = gameState.playerTeam[0].maxHP; 
            playerPos = { x: 25, y: 25 }; 
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
                const newCatch = { ...gameState.currentEnemy, currentHP: gameState.currentEnemy.hp, maxHP: gameState.currentEnemy.hp };
                
                if (!gameState.pokedexCaught.includes(newCatch.id)) gameState.pokedexCaught.push(newCatch.id);

                if (gameState.playerTeam.length < 6) {
                    gameState.playerTeam.push(newCatch);
                    window.saveGame();
                    window.showScreen('map');
                } else {
                    window.showReleaseMenu(newCatch);
                }
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
    const eRatio = gameState.currentEnemy.currentHP / gameState.currentEnemy.hp;
    const eHP = eRatio * 100;
    const pHP = (gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP) * 100;
    
    document.getElementById('enemy-hp').style.width = Math.max(0, eHP) + "%";
    document.getElementById('player-hp').style.width = Math.max(0, pHP) + "%";
    
    const captureBtn = document.querySelector('.catch-btn');
    if (captureBtn) {
        if (eRatio <= 0.33) {
            captureBtn.disabled = false;
            captureBtn.textContent = "Capture";
        } else {
            captureBtn.disabled = true;
            captureBtn.textContent = "HP Too High";
        }
    }
};

// ==========================================
// 7. PARTY LIMITS & DEX RENDERING
// ==========================================
window.showReleaseMenu = function(newCatch) {
    const overlay = document.getElementById('release-overlay');
    const grid = document.getElementById('release-grid');
    grid.innerHTML = ''; 

    gameState.playerTeam.forEach((mon, index) => {
        const btn = document.createElement('button');
        btn.className = 'starter-btn';
        btn.style.borderColor = '#c8102e'; 
        btn.innerHTML = `<strong>${mon.name}</strong><br>HP: ${mon.hp}<br><em>Release</em>`;
        btn.onclick = () => {
            if (confirm(`Release ${mon.name} and add ${newCatch.name}?`)) {
                gameState.playerTeam[index] = newCatch;
                window.saveGame();
                overlay.classList.add('hidden');
                window.showScreen('map');
            }
        };
        grid.appendChild(btn);
    });

    document.getElementById('release-new-btn').onclick = () => {
        alert(`${newCatch.name} was released.`);
        overlay.classList.add('hidden');
        window.saveGame(); 
        window.showScreen('map');
    };

    overlay.classList.remove('hidden');
};

window.renderDex = function() {
    const partyGrid = document.getElementById('party-grid');
    partyGrid.innerHTML = '';
    
    gameState.playerTeam.forEach((mon, index) => {
        const card = document.createElement('div');
        card.className = 'party-card';
        const isActive = (index === 0);
        
        card.innerHTML = `
            <h4>${mon.name}</h4>
            <p>${mon.type}</p>
            <p>HP: ${mon.currentHP}/${mon.maxHP}</p>
            ${isActive ? '<span class="active-badge">ACTIVE FIGHTER</span>' : `<button class="deploy-btn" onclick="deployMon(${mon.id})">Deploy</button>`}
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
    }
};
