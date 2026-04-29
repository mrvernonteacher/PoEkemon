// ==========================================
// WALTONIA TRAINER & GYM DATABASE
// ==========================================

const dialoguePool = {
    // Professor Wes (Unit 1) - Mechanics & Physics Jokes
    "wes1": "Why did the gear go to therapy? It had too many complex meshes!",
    "wes2": "I'm reading a book on anti-gravity and inclined planes... It's impossible to put down!",
    "wes3": "What did the fulcrum say to the lever? I've got your back, just don't push me!",
    "wes4": "Why was the belt drive always tired? It was stuck in an endless loop!",
    "wes5": "You know what drives me crazy? Unlubricated sprockets. Really grinds my gears."
};

const trainerBank = {
    "wes": {
        id: "wes",
        name: "Professor Wes",
        unit: 1, // Determines which gym question pool to use
        isGym: true,
        jokeIDs: ["wes1", "wes2", "wes3", "wes4", "wes5"],
        intro: "Welcome to the Leveraged Lowlands Gym! Let's see if you can handle the torque!",
        team: [
            // Progressive difficulty: Level 1 -> Level 2 -> Boss
            { id: 1,  level: 1 }, // Fulcru (Base)
            { id: 6,  level: 2 }, // Cam-Shaft (Evolved)
            { id: 10, level: 1 }  // Maw-ment (Unit 1 Boss/Rare)
        ]
    }
    
    // Placeholders for future units so the game doesn't crash
    // "unit2_leader": { unit: 2, team: [...] },
    // "unit3_leader": { unit: 3, team: [...] }
};
