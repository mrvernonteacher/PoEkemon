// ==========================================
// POEKEDEX DATA (60 Creatures)
// ==========================================

const poekedex = [
    // ------------------------------------------
    // UNIT 1: Mechanisms & Mechanical Design
    // ------------------------------------------
    { id: 1, name: "Fulcru", unit: 1, type: "Lever", desc: "A see-saw creature that easily gains Mechanical Advantage.", hp: 20 },
    { id: 2, name: "Spurite", unit: 1, type: "Gear", desc: "A small gear that interlocks with others to increase torque.", hp: 25 },
    { id: 3, name: "Pulle-pup", unit: 1, type: "Pulley", desc: "Uses rope-like vines to lift objects heavier than itself.", hp: 22 },
    { id: 4, name: "Incling", unit: 1, type: "Incline", desc: "A sloped, armored creature that reduces effort force.", hp: 28 },
    { id: 5, name: "Torq-shell", unit: 1, type: "Wheel/Axle", desc: "A slow turtle that possesses massive rotational force.", hp: 35 },
    { id: 6, name: "Cam-my", unit: 1, type: "Cam", desc: "Changes rotary motion into linear motion to jump high.", hp: 24 },
    { id: 7, name: "Sprock-it", unit: 1, type: "Sprocket", desc: "A fast, metallic dog that runs on a bike-chain tread.", hp: 30 },
    { id: 8, name: "Wedge-ling", unit: 1, type: "Wedge", desc: "A sharp-headed bird used for separating materials.", hp: 20 },
    { id: 9, name: "Work-bee", unit: 1, type: "Energy", desc: "A high-energy bee that calculates Work as Force x Distance.", hp: 26 },
    { id: 10, name: "Maw-ment", unit: 1, type: "Rare / Boss", desc: "OP: Manipulates the Moment of any object to freeze it in place.", hp: 80 },

    // ------------------------------------------
    // UNIT 2: Machine Control / VEX
    // ------------------------------------------
    { id: 11, name: "Vex-el", unit: 2, type: "Cortex", desc: "A small brain-chip creature with logic-wire limbs.", hp: 25 },
    { id: 12, name: "Bump-urr", unit: 2, type: "Digital Sensor", desc: "A sensory Pokémon that only reacts to direct physical touch.", hp: 22 },
    { id: 13, name: "Phot-on", unit: 2, type: "Analog Sensor", desc: "Uses light sensors to navigate through 'dark' code.", hp: 28 },
    { id: 14, name: "Loop-a", unit: 2, type: "Logic", desc: "A snake that bites its tail; trapped forever in a While loop.", hp: 30 },
    { id: 15, name: "Vari-bit", unit: 2, type: "Variable", desc: "Changes colors based on True or False Boolean conditions.", hp: 24 },
    { id: 16, name: "Mot-o", unit: 2, type: "Motor", desc: "Spins wildly out of control if not given a wait command.", hp: 35 },
    { id: 17, name: "Pote-ohm", unit: 2, type: "Analog Sensor", desc: "Uses a potentiometer to control the 'volume' of its attacks.", hp: 26 },
    { id: 18, name: "Wait-er", unit: 2, type: "Logic", desc: "Freezes time in the battle for a specific number of milliseconds.", hp: 20 },
    { id: 19, name: "Encod-er", unit: 2, type: "Sensor", desc: "Tracks exactly how many degrees the player has moved.", hp: 32 },
    { id: 20, name: "The Kernel", unit: 2, type: "Rare / Boss", desc: "OP: Can rewrite the opponent's moveset using raw Logic.", hp: 85 },

    // ------------------------------------------
    // UNIT 3: Energy Sources / Energy
    // ------------------------------------------
    { id: 21, name: "Sola-ray", unit: 3, type: "Renewable", desc: "Absorbs sunlight to charge its internal photovoltaic battery.", hp: 28 },
    { id: 22, name: "Hyd-ron", unit: 3, type: "Fuel Cell", desc: "Combines Hydrogen and Oxygen to create a pure water blast.", hp: 35 },
    { id: 23, name: "Therm-o", unit: 3, type: "Thermodynamics", desc: "A heat-shifting blob that changes form based on Delta T.", hp: 30 },
    { id: 24, name: "Turb-ine", unit: 3, type: "Generator", desc: "A spinning fan creature that creates electrical potential.", hp: 26 },
    { id: 25, name: "R-Valu", unit: 3, type: "Insulation", desc: "A fluffy Pokémon that resists all thermal conduction attacks.", hp: 45 },
    { id: 26, name: "Con-duct", unit: 3, type: "Transfer", desc: "Shifts heat energy quickly through direct physical touch.", hp: 22 },
    { id: 27, name: "Volt-mouse", unit: 3, type: "Electricity", desc: "A high-pressure electric type with a shockingly high voltage.", hp: 24 },
    { id: 28, name: "Resist-o", unit: 3, type: "Electricity", desc: "Slows down the flow of current (and the speed of the game).", hp: 40 },
    { id: 29, name: "Bio-mass", unit: 3, type: "Renewable", desc: "A plant-based Pokémon that can be 'burned' for a stat boost.", hp: 32 },
    { id: 30, name: "Entropy", unit: 3, type: "Rare / Boss", desc: "OP: A ghost type that represents the inevitable loss of all energy.", hp: 90 },

    // ------------------------------------------
    // UNIT 4: Materials & Statics
    // ------------------------------------------
    { id: 31, name: "Truss-tle", unit: 4, type: "Structure", desc: "A turtle whose shell is made of perfectly balanced steel members.", hp: 45 },
    { id: 32, name: "Cent-roid", unit: 4, type: "Geometry", desc: "A floating rock that never tips over due to its perfect center.", hp: 30 },
    { id: 33, name: "Stres-sa", unit: 4, type: "Material", desc: "Gets stronger as it takes damage along the Stress-Strain curve.", hp: 35 },
    { id: 34, name: "Tens-ile", unit: 4, type: "Force", desc: "Very elastic until it is pulled past its Yield Point.", hp: 25 },
    { id: 35, name: "Compre-ssor", unit: 4, type: "Force", desc: "A heavy concrete block that specializes in crushing attacks.", hp: 50 },
    { id: 36, name: "Joint-y", unit: 4, type: "Structure", desc: "Small pins that desperately try to hold larger structures together.", hp: 20 },
    { id: 37, name: "Vect-or", unit: 4, type: "Math", desc: "An arrow-shaped bird that always knows its magnitude and direction.", hp: 28 },
    { id: 38, name: "Beam-er", unit: 4, type: "Structure", desc: "A long, slender snake that deflects heavily under pressure.", hp: 32 },
    { id: 39, name: "Modu-lus", unit: 4, type: "Material", desc: "A stiff crystal creature that is incredibly hard to bend or break.", hp: 40 },
    { id: 40, name: "Stati-cat", unit: 4, type: "Rare / Boss", desc: "OP: Forces the sum of all moments to be zero, freezing the turn.", hp: 95 },

    // ------------------------------------------
    // UNIT 5: Transportation
    // ------------------------------------------
    { id: 41, name: "Sign-al", unit: 5, type: "Control", desc: "Changes colors to abruptly stop or start the opponent's moves.", hp: 25 },
    { id: 42, name: "Flow-ey", unit: 5, type: "Traffic", desc: "A fluid creature that moves significantly faster in a platoon.", hp: 30 },
    { id: 43, name: "Roun-about", unit: 5, type: "Intersection", desc: "A spinning top that keeps traffic moving smoothly without stopping.", hp: 35 },
    { id: 44, name: "Grid-lock", unit: 5, type: "Traffic", desc: "A heavy, slow beast that clogs up the entire battlefield.", hp: 55 },
    { id: 45, name: "Opti-m", unit: 5, type: "Efficiency", desc: "An algorithmic bug that always finds the shortest path to the goal.", hp: 22 },
    { id: 46, name: "Lane-y", unit: 5, type: "Infrastructure", desc: "A long, flat Pokémon that speeds up any allies on its team.", hp: 28 },
    { id: 47, name: "Botto-neck", unit: 5, type: "Traffic", desc: "Forces the opponent to use only one narrow, restricted move.", hp: 40 },
    { id: 48, name: "Sync-ro", unit: 5, type: "Control", desc: "Mimics the exact timing and speed of the opponent's attacks.", hp: 32 },
    { id: 49, name: "Diver-ge", unit: 5, type: "Infrastructure", desc: "Can split its body into two separate, weaker entities.", hp: 26 },
    { id: 50, name: "Apex", unit: 5, type: "Rare / Boss", desc: "OP: An autonomous vehicle that predicts the opponent's move flawlessly.", hp: 85 },

    // ------------------------------------------
    // UNIT 6: Kinematics & AI
    // ------------------------------------------
    { id: 51, name: "Proj-ec", unit: 6, type: "Ballistics", desc: "Launches itself at a precise angle and initial velocity.", hp: 35 },
    { id: 52, name: "Parab-ola", unit: 6, type: "Trajectory", desc: "A majestic bird that only flies in perfectly symmetrical curves.", hp: 30 },
    { id: 53, name: "Neu-ro", unit: 6, type: "Machine Learning", desc: "A floating brain node that 'learns' from every turn it survives.", hp: 28 },
    { id: 54, name: "Dat-a", unit: 6, type: "Dataset", desc: "A cloud of pixels that grows more complex and noisy over time.", hp: 45 },
    { id: 55, name: "Train-er", unit: 6, type: "Algorithm", desc: "Starts very weak but gets a +10% stat boost every single round.", hp: 20 },
    { id: 56, name: "Bi-as", unit: 6, type: "Ethics", desc: "A crooked creature that hits extremely hard but misses frequently.", hp: 40 },
    { id: 57, name: "Ethic-o", unit: 6, type: "Ethics", desc: "A paladin-like creature that prevents 'unfair' moves from being used.", hp: 50 },
    { id: 58, name: "Deep-Fake", unit: 6, type: "Generative", desc: "Transforms into a perfect, but slightly flawed, copy of the opponent.", hp: 32 },
    { id: 59, name: "Algo-rith", unit: 6, type: "Logic", desc: "Automatically sorts and organizes its attacks for maximum efficiency.", hp: 26 },
    { id: 60, name: "Singularity", unit: 6, type: "Rare / Boss", desc: "OP: An omniscient AI that can use any move from any Unit in the game.", hp: 120 }
];
