// ==========================================
// 1. ENGINE CONFIG
// ==========================================
const TILE_SIZE = 40;
const VIEW_WIDTH = 15;
const VIEW_HEIGHT = 10;

let gameState = {
    playerCharacter: null,
    playerTeam: [],       // Array of objects (Max 6)
    pokedexCaught: [],    // Array of just IDs ever caught
    badges: [],
    currentUnit: 1,
    currentEnemy: null,
    isTrainerBattle: false
};

let playerPos = { x: 25, y: 25 };

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
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
        if (map[ny][nx] === 1 && Math.random() < 0.12) window.startEncounter(gameState.currentUnit, false);
        if (map[ny][nx] === 2) window.startEncounter(gameState.currentUnit, true);
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
        // Ensure pokedex array exists for older saves
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
        gameState.pokedexCaught.push(id); // Add starter to lifetime dex
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
// 5. COMBAT & CAPTURE LOGIC
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
            playerPos = { x: 25, y: 25 }; 
            window.showScreen('map');
        } else {
            document.getElementById('action-menu').classList.remove('hidden');
        }
    }, 1000);
};

window.attemptCapture = function() {
    document.getElementById('action-menu').classList.add('hidden');
    // For simplicity right now, pull first question
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
                
                // Add to lifetime Pokedex
                if (!gameState.pokedexCaught.includes(newCatch.id)) {
                    gameState.pokedexCaught.push(newCatch.id);
                }

                if (gameState.playerTeam.length < 6) {
                    // Room in party
                    gameState.playerTeam.push(newCatch);
                    window.saveGame();
                    window.showScreen('map');
                } else {
                    // Party Full! Trigger Release Menu
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
    const eHP = (gameState.currentEnemy.currentHP / gameState.currentEnemy.hp) * 100;
    const pHP = (gameState.playerTeam[0].currentHP / gameState.playerTeam[0].maxHP) * 100;
    document.getElementById('enemy-hp').style.width = eHP + "%";
    document.getElementById('player-hp').style.width = pHP + "%";
};

// ==========================================
// 6. PARTY LIMITS & DEX RENDERING
// ==========================================
window.showReleaseMenu = function(newCatch) {
    const overlay = document.getElementById('release-overlay');
    const grid = document.getElementById('release-grid');
    grid.innerHTML = ''; 

    // Generate buttons for current party
    gameState.playerTeam.forEach((mon, index) => {
        const btn = document.createElement('button');
        btn.className = 'starter-btn';
        btn.style.borderColor = '#c8102e'; 
        btn.innerHTML = `<strong>${mon.name}</strong><br>HP: ${mon.hp}<br><em>Release</em>`;
        btn.onclick = () => {
            if (confirm(`Are you sure you want to release ${mon.name} and add ${newCatch.name}?`)) {
                gameState.playerTeam[index] = newCatch;
                window.saveGame();
                overlay.classList.add('hidden');
                window.showScreen('map');
            }
        };
        grid.appendChild(btn);
    });

    // Wire up the cancel button
    document.getElementById('release-new-btn').onclick = () => {
        alert(`${newCatch.name} was released back into the wild.`);
        overlay.classList.add('hidden');
        window.saveGame(); // Save Pokedex addition even if released
        window.showScreen('map');
    };

    overlay.classList.remove('hidden');
};

window.renderDex = function() {
    // 1. Render Party (Max 6)
    const partyGrid = document.getElementById('party-grid');
    partyGrid.innerHTML = '';
    
    gameState.playerTeam.forEach((mon, index) => {
        const card = document.createElement('div');
        card.className = 'party-card';
        const isActive = (index === 0);
        
        card.innerHTML = `
            <h4>${mon.name}</h4>
            <p>Type: ${mon.type}</p>
            <p>HP: ${mon.currentHP} / ${mon.maxHP}</p>
            ${isActive ? '<span class="active-badge">ACTIVE FIGHTER</span>' : `<button class="deploy-btn" onclick="deployMon(${mon.id})">Deploy</button>`}
        `;
        partyGrid.appendChild(card);
    });

    // 2. Render Lifetime Pokedex Record
    const dexGrid = document.getElementById('dex-grid');
    dexGrid.innerHTML = '';
    
    poekedex.forEach(mon => {
        // Starters (Unit 0) or regular? Let's show all.
        const hasCaught = gameState.pokedexCaught.includes(mon.id);
        
        const card = document.createElement('div');
        card.className = `dex-entry ${hasCaught ? 'captured' : ''}`;
        
        if (hasCaught) {
            card.innerHTML = `
                <h4>${mon.name}</h4>
                <p>${mon.type}</p>
            `;
        } else {
            card.innerHTML = `
                <h4>???</h4>
                <p>Unit ${mon.unit}</p>
            `;
        }
        dexGrid.appendChild(card);
    });
};

window.deployMon = function(id) {
    const index = gameState.playerTeam.findIndex(p => p.id === id);
    if (index > 0) {
        // Swap selected to index 0
        const temp = gameState.playerTeam[0];
        gameState.playerTeam[0] = gameState.playerTeam[index];
        gameState.playerTeam[index] = temp;
        
        window.saveGame();
        window.renderDex(); // Re-render to update UI badges
    }
};
