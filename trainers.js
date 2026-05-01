// ==========================================
// Waltonia Showcase: Trainers Registry
// ==========================================

// Global Dialogue Pool (used dynamically by encounter logic)
window.dialoguePool = {
    // Captain Wes-beard (Unit 1 Boss - Projectile/Vectors)
    'joke_wes_1': 'What is a physicist\'s favorite part of a curve? Its slope! Arrr!',
    'joke_wes_2': 'Why did the scientist keep repeating the experiment? Because he was a re-searcher!',
    'joke_wes_3': 'Why did the geARRRR go to thARRRRapy? It had too many complex meshes!',
    'joke_wes_4': 'I\'m reading a book on anti-gravity and inclined planes... It\'s impossible to get to the end!',
    'joke_wes_5': 'What did the fulcrum say to the levARRR? I\'ve got your back, just don\'t push me!',

    // Dr. Vu (Unit 2 Boss - Machine/Material)
    'joke_vu_1': 'Why did the binary search cross the road? To get to the mid-dle!',
    'joke_vu_2': 'I\'ve calculated that my cookies are 99% logic, and 1% secret material!',
    'joke_vu_3': 'My evil lair is fully automated. The bread maker runs on an infinite DO-WHILE loop!',
    'joke_vu_4': 'What\'s an evil genius\'s favorite data type? A FLOAT... because it sounds like ice cream!',
    'joke_vu_5': 'I told my students to break down the problem. They broke my stand mixer instead! EEEVIL!',

    // The Vernonator (Unit 3 Boss - Energy)
    'joke_vernon_1': 'What is an EV\'s favorite music? AC/DC!',
    'joke_vernon_2': 'I\'m so full of potential, I\'m positively charged!',
    'joke_vernon_3': 'Why do I wear blue plaid? Because red plaid doesn\'t have enough kinetic energy!',
    'joke_vernon_4': 'I\'d tell you a joke about a broken battery, but it doesn\'t have the capacity to make you laugh.',
    'joke_vernon_5': 'Ohm my goodness, you\'re putting up a lot of resistance!',

    // Princess Guien-i-kitty (Unit 4 Boss - Structures)
    'joke_guie_1': 'Why did the LEGO structure feel so stable? Because it had incredible unit testing!',
    'joke_guie_2': 'Your design is beautifully optimistic... just waiting for reality to introduce a single point of failure!',
    'joke_guie_3': 'I love it when a truss bridge smiles! Right before it snaps under tension! YAY!',
    'joke_guie_4': 'What do you call a happy little beam? A cantilever of JOY and DOOM!',
    'joke_guie_5': 'My kingdom is built on love, friendship, and a rigidly calculated Moment of Inertia!',

    // Tim the Guybrarian (Unit 5 Boss - Ballistics)
    'joke_tim_1': 'What do engineers and librarians have in common? Both are experts at optimizing information!',
    'joke_tim_2': 'I was in a band called "The Force"... but we broke up due to friction.',
    'joke_tim_3': 'Skateboarding is just applied physics, man. Keep your center of gravity low and your vibes high.',
    'joke_tim_4': 'Why did the book on ballistics fly off the shelf? It had too much trajectory!',
    'joke_tim_5': 'Remember, if you ever feel stressed about traffic flow rates... just check out a good book and chill.',

    // Lord Hubbard (Unit 6 Boss - Algorithms/AI)
    'joke_hubbard_1': 'Why did the open-loop system cross the road? It didn\'t know when to stop!',
    'joke_hubbard_2': 'I tried to explain an infinite while-loop to my class... I\'m still explaining it.',
    'joke_hubbard_3': 'Why did the limit switch break up with the bumper switch? It needed more physical space.',
    'joke_hubbard_4': 'There are 10 types of people in this world. Those who understand binary and those who don\'t!',
    'joke_hubbard_5': 'My robot kept spinning in circles. Turns out my left motor was missing a negative 127. Classic!'
};

// ==========================================
// Main Trainers Data Object
// ==========================================
window.trainerBank = {
    // ------------------------------------------
    // UNIT 1 BOSS: Captain Wes-beard (Projectile/Vectors)
    // ------------------------------------------
    'wes': {
        unit: 1,
        id: 'wes',
        name: 'Captain Wes-beard',
        spriteRequirements: 'Dark, curly beard and standard hair (from existence logic). wears a black Kangol-style hat (looks piratical). MUST add an EYEPATCH to the existing visual model.',
        intro: 'Ahoy, future engineer! I am Captain Wes-beard, Master of Vectors and Lord of Trajectories!',
        winMsg: 'Well done! You navigate the currents of kinematics with impressive skill.',
        loseMsg: 'Back to the books with you! your logic was not quite ship-shape.',
        team: [
            { id: 101, level: 12 }, 
            { id: 101, level: 14 }  
        ],
        jokeIDs: ['joke_wes_1', 'joke_wes_2', 'joke_wes_3', 'joke_wes_4', 'joke_wes_5']
    },
    // ------------------------------------------
    // UNIT 2 BOSS: Evil Dr. Vu (Machine/Material)
    // ------------------------------------------
    'vu': {
        unit: 2,
        id: 'vu',
        name: 'Evil Dr. Vu',
        spriteRequirements: 'Asian woman with dark shoulder-length hair and characteristic glasses (as seen in baseline visual reference vu.jpg). Define her visual to include baking items (holding a whisk, or maybe cookies in one hand) alongside logic/CS symbols (perhaps a circuit board or keyboard). The visual should look sophisticated and calculated.',
        intro: 'Welcome, young one! People around Walton say I teach Machine and Material, and that I... like to bake. And yes... it is all true! [Soft laughter] But what they DO NOT mention... is that I, Dr. Vu, am ALSO... eeeevil! [Maniacal laugh] yes, Dr. Vu, but *eeeevil*!',
        winMsg: 'Improper execution! You found the flaw in my grand computational design... but the next system will be perfect!',
        loseMsg: 'Logic failure! My systems are perfectly optimized, and you, simple student, have been computed into obsolete data.',
        team: [
            { id: 201, level: 18 }, 
            { id: 201, level: 19 }  
        ],
        jokeIDs: ['joke_vu_1', 'joke_vu_2', 'joke_vu_3', 'joke_vu_4', 'joke_vu_5']
    },
    // ------------------------------------------
    // UNIT 3 BOSS: The Vernonator (Ty Vernon / User)
    // ------------------------------------------
    'vernon': {
        unit: 3,
        id: 'vernon',
        name: 'The Vernonator',
        spriteRequirements: 'Based on standard existing logic/sprite model for a male teacher (similar to Captain Wes baseline but sans pirate elements). The Vernonator MUST wear standard PLAID logic, but instead of red/standard plaid, the visual model MUST be **BLUE PLAID**. Describe him as having a calculated look with glasses and a calculated expression.',
        intro: 'So you made it past the algorithms? impressive! I am Ty Vernon, but here, I am THE VERNONATOR! Engineering is about power... potential and kinetic! and you? [Eyes narrow] you are about to feel... THE VERN! get ready, you\'re about to feel the vern!',
        winMsg: 'Impressive energy conversion! You absorbed my potential and converted it into victory. You might just make it in this showcase yet!',
        loseMsg: 'Inefficient system! You couldn\'t handle my raw kinetic output. go study your energy principles, student!',
        team: [
            { id: 301, level: 23 }, 
            { id: 301, level: 25 }  
        ],
        jokeIDs: ['joke_vernon_1', 'joke_vernon_2', 'joke_vernon_3', 'joke_vernon_4', 'joke_vernon_5']
    },
    // ------------------------------------------
    // UNIT 4 BOSS: Princess Guien-i-kitty (Structures)
    // ------------------------------------------
    'guie': {
        unit: 4,
        id: 'guie',
        name: 'Princess Guien-i-kitty',
        spriteRequirements: 'Based on Mrs. G baseline visual logic (synthesizing her video game, soccer, and LEGO summary). MUST include Mrs. G baseline appearance (dark hair, calculated look), but the visual model MUST add distinct **PINK UNIKITTY EARS** to the head. Perhaps include standard Unikitty logic (LEGO elements, sparkle) in the visual structure.',
        intro: 'WELCOME TO MY MAGICAL REALM OF STRUCTURAL STABILITY! Everything is AWESOME and STABLE in my world, unless... I compute a single point of logic failure in your design! And then? [Smile remains super happy] I WATCH IT ALL CRUMBLE INTO DUST! [Joyful sparkle]',
        winMsg: 'YOUR STRUCTURE WAS TOO STRONG! You defeated me with calculated optimization. [Dark sparkle] I\'ll find that flaw next time... and then [happy tone returns] WE CAN ITERATE!',
        loseMsg: 'OOOPS! Your structural analysis failed. My kingdom remains perfectly stable while your design COLLAPSED IN A TRAGIC, LOGICAL DISASTER! [Joyful skip]',
        team: [
            { id: 401, level: 28 }, 
            { id: 401, level: 30 }  
        ],
        jokeIDs: ['joke_guie_1', 'joke_guie_2', 'joke_guie_3', 'joke_guie_4', 'joke_guie_5']
    },
    // ------------------------------------------
    // UNIT 5 BOSS: Tim the Guybrarian (Ballistics)
    // ------------------------------------------
    'tim': {
        unit: 5,
        id: 'tim',
        name: 'Tim the Guybrarian',
        spriteRequirements: 'Based on description logic (No visual reference provided). Dark, calculated hair. ALWAYS wearing a BLAZER. No glasses. Describe him as looking super chill and positive. Integrate elements: perhaps holding a guitar, or sitting casually on a skateboard as part of the visual pose.',
        intro: 'Hey there! Welcome to Unit 5. I\'m Tim, but most people call me the Guybrarian. Before I ran the Walton library, I taught engineering, you know. Makers find the right logic for the right situation! and we always encourage exploration at the Walton Library. it\'s a positive feedback loop! so let\'s collaborate on a showcase battle!',
        winMsg: 'Incredible computation! You optimized your ballistic path perfectly. You\'re a calculated maker, for sure! Keep up that positive momentum!',
        loseMsg: 'No problem! Your system just needs another iteration. Ballistics is tricky! maybe a visit to the library for some research would provide the missing data?',
        team: [
            { id: 501, level: 33 }, 
            { id: 501, level: 35 }  
        ],
        jokeIDs: ['joke_tim_1', 'joke_tim_2', 'joke_tim_3', 'joke_tim_4', 'joke_tim_5']
    },
    // ------------------------------------------
    // UNIT 6 (FINALE) BOSS: Lord Hubbard (Algorithms/AI)
    // ------------------------------------------
    'hubbard': {
        unit: 6,
        id: 'hubbard',
        name: 'Lord Hubbard: Breaker of Code',
        spriteRequirements: 'Based on baseline Hubbard visual logic (standard male teacher with glasses/suit as synthesized from summary). MUST adjust visual logic model to show that he is now **HALF-ROBOT** (specifically the entire left half). The robotic side has distinct AI/Claude-style design logic, glowing with artificial calculation.',
        intro: 'You have calculated your path through Waltonia? but you have reached obsolete logic. I am Lord Hubbard... and I am the ULTIMATE computational optimization! Since that terrible, calculated accident where I merged with Claude... I AM BREAKER OF CODE! your algorithm ends now!',
        winMsg: 'Algorithm error! You found the flaw... but my system is generative! I WILL REGENERATE and re-calculate your downfall!',
        loseMsg: 'System failure! Your simple logical parameters were computed, predicted, and Obsoleted by my vast, generative power! go study your logic, human!',
        team: [
            { id: 601, level: 38 }, 
            { id: 601, level: 40 }  
        ],
        jokeIDs: ['joke_hubbard_1', 'joke_hubbard_2', 'joke_hubbard_3', 'joke_hubbard_4', 'joke_hubbard_5']
    }
};
