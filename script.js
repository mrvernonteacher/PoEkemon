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
    queuedAttack: null,   // Tracks which attack was clicked before trivia
    isTrainerBattle: false
};

let playerPos = { x: 25, y: 25 };
const spriteCache = {}; 

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

window.drawPoekemonSprite = function(ctx, mon, x, y, size) {
    if (!mon) return;

    if (spriteCache[mon.id] === undefined) {
        const img = new Image();
        img.src = `assets/${mon.id}.png`; 
        
        img.onload = () => {
            spriteCache[mon.id] = img;
            if (document.getElementById('screen-battle').classList.contains('active')) window.updateHP(); 
        };
        img.onerror = () => spriteCache[mon.id] = null; 
        spriteCache[mon.id] = 'loading';
    }

    if (spriteCache[mon.id] && spriteCache[mon.id] !== 'loading') {
        ctx.drawImage(spriteCache[mon.id], x, y, size, size);
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
        // Safely add evolution data to old saves
        gameState.playerTeam.forEach(mon => {
            if (mon.xp === undefined) mon.xp = 0;
            if (mon.evolutionLevel === undefined) mon.evolutionLevel = 0;
        });
    }
};
window.toggleSettings = function() { document.getElementById('settings-overlay').classList.toggle('hidden'); };
window.resetGame = function() { if (confirm("Reset progress?")) { localStorage.removeItem('PoEkemon_Waltonia_Save'); location.reload(); } };

window.selectStarter = function(char, id) {
    gameState.playerCharacter = char;
    const mon = poekedex.find(p => p.id === id);
    if (mon) {
        // Initialize new stats for the starter
        gameState.playerTeam = [{ ...mon, currentHP: mon.hp, maxHP: mon.hp, xp: 0, evolutionLevel: 0 }];
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
// 6. COMBAT, TRIVIA & EVOLUTION
// ==========================================
window.startEncounter = function(unit, isGym) {
    const unitMons = poekedex.filter(p => p.unit === unit && !p.type.includes("Boss"));
    gameState.currentEnemy = { ...unitMons[Math.floor(Math.random() * unitMons.length)] };
    gameState.currentEnemy.currentHP = gameState.currentEnemy.hp;

    document.getElementById('enemy-name').textContent = gameState.currentEnemy.name;
    document.getElementById('player-mon-name').textContent = gameState.playerTeam[0].name;
    document.getElementById('dialogue-box').textContent = `Wild ${gameState.currentEnemy.name} appeared!`;
    
    window.renderBattleMenu(); // Draws the dynamic attack buttons
    
    window.showScreen('battle');
    window.updateHP(); 
    
    const pSprite = document.getElementById('player-sprite');
    pSprite.innerHTML = '<canvas id="pCanvas" width="80" height="80"></canvas>';
    const pCtx = document.getElementById('pCanvas').getContext('2d');
    window.drawPoekemonSprite(pCtx, gameState.playerTeam[0], 0, 0, 80);

    const eSprite = document.querySelector('.enemy .placeholder-sprite');
    eSprite.innerHTML = '<canvas id="eCanvas" width="80" height="80"></canvas>';
    const eCtx = document.getElementById('eCanvas').getContext('2d');
    window.drawPoekemonSprite(eCtx, gameState.currentEnemy, 0, 0, 80);
};

// Dynamically creates buttons based on Evolution Level
window.renderBattleMenu = function() {
    const mon = gameState.playerTeam[0];
    const menu = document.getElementById('action-menu');
    menu.innerHTML = '';
    menu.classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');

    // 1. Basic Attack (Always available)
    const btnBasic = document.createElement('button');
    btnBasic.className = 'action-btn attack-btn';
    btnBasic.textContent = mon.basicAtkName;
    btnBasic.onclick = () => window.prepareAttack('basic');
    menu.appendChild(btnBasic);

    // 2. Special Attack (Requires Evolution Level 1 or higher)
    if (mon.evolutionLevel > 0) {
        const currentEvo = mon.evolutions[mon.evolutionLevel - 1];
        const btnSpecial = document.createElement('button');
        btnSpecial.className = 'action-btn attack-btn';
        btnSpecial.style.background = '#e67e22'; // Orange color to stand out
        btnSpecial.textContent = currentEvo.specialAtkName;
        btnSpecial.onclick = () => window.prepareAttack('special');
        menu.appendChild(btnSpecial);
    }

    // 3. Capture Button
    const btnCapture = document.createElement('button');
    btnCapture.className = 'action-btn catch-btn';
    btnCapture.textContent = "Capture";
    btnCapture.onclick = () => window.attemptCapture();
    menu.appendChild(btnCapture);
};

window.prepareAttack = function(type) {
    const mon = gameState.playerTeam[0];
    
    // If they use Basic Attack AFTER evolving, they can spam it (No Trivia, No XP)
    if (type === 'basic' && mon.evolutionLevel > 0) {
        window.executeAttack('basic', true, false); 
        return;
    }

    // Otherwise, we need a trivia question
    document.getElementById('action-menu').classList.add('hidden');
    gameState.queuedAttack = type;
    
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
            document.getElementById('question-container').classList.add('hidden');
            if (i === q.ans) {
                // Correct: Deal damage and earn XP!
                window.executeAttack(gameState.queuedAttack, true, true);
            } else {
                // Incorrect: 50/50 penalty
                window.executeAttack(gameState.queuedAttack, false, false);
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
    let attackName = type === 'basic' ? mon.basicAtkName : mon.evolutions[mon.evolutionLevel - 1].specialAtkName;
    
    if (success) {
        if (type === 'special') {
            const power = mon.evolutions[mon.evolutionLevel - 1].specialAtkPower;
            dmg = power + Math.floor(Math.random() * 5); // Base power + variance
        } else {
            dmg = mon.baseAtk + Math.floor(Math.random() * 4);
        }
        msg = `${mon.name} used ${attackName} for ${dmg} damage!`;
        
        // Grant XP and check for Evolution
        if (earnXP) {
            mon.xp += 1;
            window.checkEvolution(mon);
        }
    } else {
        // Punish incorrect answer
        if (Math.random() > 0.5) {
            dmg = Math.max(1, Math.floor(mon.baseAtk / 2)); // Minimum damage
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
            alert("The enemy fainted!");
            window.showScreen('map');
        } else {
            window.enemyTurn();
        }
    }, 1800);
};

window.checkEvolution = function(mon) {
    if (!mon.evolutions || mon.evolutionLevel >= mon.evolutions.length) return; // Max level reached
    
    const nextEvo = mon.evolutions[mon.evolutionLevel];
    if (mon.xp >= nextEvo.reqXP) {
        alert(`What?! Your ${mon.name} is evolving into ${nextEvo.name}!`);
        
        mon.name = nextEvo.name;
        mon.maxHP += nextEvo.hpBonus;
        mon.currentHP += nextEvo.hpBonus; // Heal by the new bonus
        mon.baseAtk += nextEvo.atkBonus;
        mon.evolutionLevel += 1;
        
        document.getElementById('player-mon-name').textContent = mon.name;
        window.saveGame();
    }
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
            window.renderBattleMenu(); // Bring buttons back
        }
    }, 1500);
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
                
                // Init new stats for captured mon
                const newCatch = { ...gameState.currentEnemy, currentHP: gameState.currentEnemy.hp, maxHP: gameState.currentEnemy.hp, xp: 0, evolutionLevel: 0 };
                
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
                document.getElementById('question-container').classList.add('hidden');
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
        btn.innerHTML = `<strong>${mon.name}</strong><br>HP: ${mon.maxHP}<br><em>Release</em>`;
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
            <p style="color: #c8102e; font-weight: bold;">Lvl ${mon.evolutionLevel} | XP: ${mon.xp}</p>
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
