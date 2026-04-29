// ==========================================
// WALTONIA TRAINER & GYM DATABASE
// ==========================================

const dialoguePool = {
    // Professor Wes (Unit 1) - Mechanics & Physics Jokes
    "wes1": "Why did the gear go to therapy? It had too many complex meshes!",
    "wes2": "I'm reading a book on anti-gravity and inclined planes... It's impossible to put down!",
    "wes3": "What did the fulcrum say to the lever? I've got your back, just don't push me!",
    "wes4": "Why was the belt drive always tired? It was stuck in an endless loop!",
    "wes5": "You know what drives me crazy? Unlubricated sprockets. Really grinds my gears.",

    // Lord Hubbard (Unit 2) - Computer Science & Control Systems Jokes
    "hub1": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "hub2": "I tried to explain an infinite loop to my class, but they just kept asking me to repeat myself.",
    "hub3": "Why did the limit switch break up with the bumper switch? It just needed some physical space.",
    "hub4": "There are 10 types of people in this world: those who understand binary, and those who don't!",
    "hub5": "My robot kept running into the wall... turns out it had a while loop with no exit condition. Classic."
};

const trainerBank = {
    "wes": {
        id: "wes",
        name: "Professor Wes",
        unit: 1, 
        isGym: true,
        jokeIDs: ["wes1", "wes2", "wes3", "wes4", "wes5"],
        intro: "Welcome to the Leveraged Lowlands Gym! Let's see if you can handle the torque!",
        team: [
            { id: 1,  level: 1 }, // Fulcru (Base)
            { id: 6,  level: 2 }, // Cam-Shaft (Evolved)
            { id: 10, level: 1 }  // Maw-ment (Unit 1 Boss)
        ]
    },
    
    "hubbard": {
        id: "hubbard",
        name: "Lord Hubbard",
        unit: 2, 
        isGym: true,
        jokeIDs: ["hub1", "hub2", "hub3", "hub4", "hub5"],
        intro: "I am Lord Hubbard, Breaker of Code! Step into my while-loop and let's see if your logic compiles!",
        team: [
            { id: 14, level: 2 }, // For-Loopa (Evolved)
            { id: 16, level: 2 }, // Servo-Max (Evolved)
            { id: 20, level: 1 }  // The Kernel (Unit 2 Boss)
        ]
    }
    
    // Placeholders for future units 
    // "unit3_leader": { unit: 3, team: [...] }
};
