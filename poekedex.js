// ==========================================
// POEKEDEX DATA (66 Creatures) - LEVEL 1-3 SYSTEM
// ==========================================

const poekedex = [
    // ------------------------------------------
    // UNIT 1: Mechanisms (Simple Machines & Gear Trains)
    // ------------------------------------------
    { 
        id: 1, name: "Fulcru", unit: 1, type: "Simple Machine", desc: "A see-saw creature that easily gains Mechanical Advantage.", 
        hp: 20, baseAtk: 5, basicAtkName: "Leverage Strike",
        evolutions: [ { reqXP: 18, name: "Megacru", desc: "Its fulcrum shifted closer to the load.", hpBonus: 22, atkBonus: 7, specialAtkName: "Effort Strike", specialAtkPower: 25 } ]
    },
    { 
        id: 2, name: "Spurite", unit: 1, type: "Gear Train", desc: "A small gear that interlocks with others to increase torque.", 
        hp: 25, baseAtk: 6, basicAtkName: "Gear Spin",
        evolutions: [
            { reqXP: 11, name: "Spur-Master", desc: "Grew an idler gear to reverse its attack direction.", hpBonus: 10, atkBonus: 3, specialAtkName: "Mesh Crunch", specialAtkPower: 16 },
            { reqXP: 48, name: "Torque-Rex", desc: "A massive gear train capable of crushing steel.", hpBonus: 25, atkBonus: 8, specialAtkName: "Torque Obliteration", specialAtkPower: 32 }
        ]
    },
    { 
        id: 3, name: "Pulle-pup", unit: 1, type: "Simple Machine", desc: "Uses rope-like vines to lift objects heavier than itself.", 
        hp: 22, baseAtk: 5, basicAtkName: "Leverage Strike",
        evolutions: [ { reqXP: 21, name: "Pulle-Hound", desc: "Added more strands to its block.", hpBonus: 24, atkBonus: 6, specialAtkName: "Block and Tackle", specialAtkPower: 24 } ]
    },
    { 
        id: 4, name: "Incling", unit: 1, type: "Simple Machine", desc: "A sloped, armored creature that reduces effort force.", 
        hp: 28, baseAtk: 4, basicAtkName: "Leverage Strike",
        evolutions: [ { reqXP: 19, name: "Decline", desc: "Steepened its slope for gravitational strikes.", hpBonus: 26, atkBonus: 8, specialAtkName: "Rampage", specialAtkPower: 26 } ]
    },
    { 
        id: 5, name: "Torq-shell", unit: 1, type: "Simple Machine", desc: "A slow turtle that possesses massive rotational force.", 
        hp: 35, baseAtk: 3, basicAtkName: "Leverage Strike",
        evolutions: [ { reqXP: 22, name: "Wheel-Beast", desc: "Increased its wheel radius.", hpBonus: 28, atkBonus: 9, specialAtkName: "Axle Spin", specialAtkPower: 28 } ]
    },
    { 
        id: 6, name: "Cam-my", unit: 1, type: "Gear Train", desc: "Changes rotary motion into linear motion to jump high.", 
        hp: 24, baseAtk: 5, basicAtkName: "Gear Spin",
        evolutions: [ { reqXP: 17, name: "Cam-Shaft", desc: "Linked multiple cams together.", hpBonus: 20, atkBonus: 7, specialAtkName: "Follower Strike", specialAtkPower: 23 } ]
    },
    { 
        id: 7, name: "Sprock-it", unit: 1, type: "Gear Train", desc: "A fast, metallic dog that runs on a bike-chain tread.", 
        hp: 30, baseAtk: 7, basicAtkName: "Gear Spin",
        evolutions: [ { reqXP: 20, name: "Sprocket-Prime", desc: "Its chain drive never slips.", hpBonus: 22, atkBonus: 8, specialAtkName: "Chain Whip", specialAtkPower: 27 } ]
    },
    { 
        id: 8, name: "Wedge-ling", unit: 1, type: "Simple Machine", desc: "A sharp-headed bird used for separating materials.", 
        hp: 20, baseAtk: 6, basicAtkName: "Leverage Strike",
        evolutions: [ { reqXP: 18, name: "Axe-Beak", desc: "Evolved a steel wedge head.", hpBonus: 18, atkBonus: 8, specialAtkName: "Splitter Peck", specialAtkPower: 25 } ]
    },
    { 
        id: 9, name: "Work-bee", unit: 1, type: "Simple Machine", desc: "A high-energy bee that calculates Work as Force x Distance.", 
        hp: 26, baseAtk: 5, basicAtkName: "Leverage Strike",
        evolutions: [ { reqXP: 19, name: "Joule-Hornet", desc: "Maximizes energy output across vast distances.", hpBonus: 22, atkBonus: 7, specialAtkName: "Distance Dash", specialAtkPower: 24 } ]
    },
    { 
        id: 10, name: "Maw-ment", unit: 1, type: "Gear Train", desc: "Boss: Manipulates the Moment of any object to freeze it.", 
        hp: 80, baseAtk: 12, basicAtkName: "Gear Spin",
        evolutions: [] 
    },

    // ------------------------------------------
    // UNIT 2: Machine Control (Logic Loops & Sensors)
    // ------------------------------------------
    { 
        id: 11, name: "Vex-el", unit: 2, type: "Logic Loop", desc: "A small brain-chip creature with logic-wire limbs.", 
        hp: 25, baseAtk: 4, basicAtkName: "Logic Pulse",
        evolutions: [ { reqXP: 19, name: "Cortex-Prime", desc: "Upgraded its processor to handle nested if-statements.", hpBonus: 24, atkBonus: 8, specialAtkName: "If-Then Blast", specialAtkPower: 25 } ]
    },
    { 
        id: 12, name: "Bump-urr", unit: 2, type: "Sensor", desc: "A sensory Pokémon that only reacts to direct physical touch.", 
        hp: 22, baseAtk: 5, basicAtkName: "Sensor Ping",
        evolutions: [ { reqXP: 18, name: "Limit-Switch", desc: "Gained an extended arm for long-range touch detection.", hpBonus: 20, atkBonus: 7, specialAtkName: "Digital Bash", specialAtkPower: 24 } ]
    },
    { 
        id: 13, name: "Phot-on", unit: 2, type: "Sensor", desc: "Uses light sensors to navigate through 'dark' code.", 
        hp: 28, baseAtk: 5, basicAtkName: "Sensor Ping",
        evolutions: [ { reqXP: 21, name: "Optic-Core", desc: "Can blind opponents with intense light-sensor feedback.", hpBonus: 25, atkBonus: 7, specialAtkName: "Lumen Beam", specialAtkPower: 26 } ]
    },
    { 
        id: 14, name: "Loop-a", unit: 2, type: "Logic Loop", desc: "A snake that bites its tail; trapped forever in a While loop.", 
        hp: 30, baseAtk: 4, basicAtkName: "Logic Pulse",
        evolutions: [ { reqXP: 22, name: "For-Loopa", desc: "Controls exactly how many times it strikes its opponent.", hpBonus: 24, atkBonus: 9, specialAtkName: "Infinite Constrict", specialAtkPower: 28 } ]
    },
    { 
        id: 15, name: "Vari-bit", unit: 2, type: "Logic Loop", desc: "Changes colors based on True or False Boolean conditions.", 
        hp: 24, baseAtk: 5, basicAtkName: "Logic Pulse",
        evolutions: [
            { reqXP: 9, name: "Integer-Bite", desc: "Expanded its memory to hold complex number attacks.", hpBonus: 10, atkBonus: 3, specialAtkName: "Boolean Strike", specialAtkPower: 16 },
            { reqXP: 49, name: "Float-Fang", desc: "Attacks with deadly precision using decimal placement.", hpBonus: 22, atkBonus: 9, specialAtkName: "Float Execution", specialAtkPower: 34 }
        ]
    },
    { 
        id: 16, name: "Mot-o", unit: 2, type: "Sensor", desc: "Spins wildly out of control if not given a wait command.", 
        hp: 35, baseAtk: 6, basicAtkName: "Sensor Ping",
        evolutions: [ { reqXP: 20, name: "Servo-Max", desc: "Gained the ability to stop at exact degree angles.", hpBonus: 26, atkBonus: 8, specialAtkName: "PWM Spin", specialAtkPower: 27 } ]
    },
    { 
        id: 17, name: "Pote-ohm", unit: 2, type: "Sensor", desc: "Uses a potentiometer to control the 'volume' of its attacks.", 
        hp: 26, baseAtk: 4, basicAtkName: "Sensor Ping",
        evolutions: [ { reqXP: 19, name: "Dial-Ohm", desc: "Can fine-tune its energy output to bypass defenses.", hpBonus: 22, atkBonus: 7, specialAtkName: "Analog Wave", specialAtkPower: 25 } ]
    },
    { 
        id: 18, name: "Wait-er", unit: 2, type: "Logic Loop", desc: "Freezes time in the battle for a specific number of milliseconds.", 
        hp: 20, baseAtk: 3, basicAtkName: "Logic Pulse",
        evolutions: [ { reqXP: 18, name: "Timer-Bot", desc: "Uses background timers to attack while defending.", hpBonus: 20, atkBonus: 6, specialAtkName: "Delay Halt", specialAtkPower: 24 } ]
    },
    { 
        id: 19, name: "Encod-er", unit: 2, type: "Sensor", desc: "Tracks exactly how many degrees the player has moved.", 
        hp: 32, baseAtk: 5, basicAtkName: "Sensor Ping",
        evolutions: [ { reqXP: 21, name: "Odom-Eter", desc: "Calculates perfect attack trajectories using wheel rotations.", hpBonus: 26, atkBonus: 8, specialAtkName: "Quad-Pulse", specialAtkPower: 27 } ]
    },
    { 
        id: 20, name: "The Kernel", unit: 2, type: "Logic Loop", desc: "Boss: Can rewrite the opponent's moveset using raw Logic.", 
        hp: 85, baseAtk: 10, basicAtkName: "Logic Pulse",
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 3: Energy (Renewable & Thermodynamics)
    // ------------------------------------------
    { 
        id: 21, name: "Sola-ray", unit: 3, type: "Renewable", desc: "Absorbs sunlight to charge its internal photovoltaic battery.", 
        hp: 28, baseAtk: 5, basicAtkName: "Energy Surge",
        evolutions: [ 
            { reqXP: 15, name: "Array-Z", desc: "Wired in series to double its voltage output.", hpBonus: 15, atkBonus: 4, specialAtkName: "Photon Flare", specialAtkPower: 18 },
            { reqXP: 45, name: "Dyson-Sphere", desc: "Harnesses the energy of an entire star.", hpBonus: 30, atkBonus: 9, specialAtkName: "Supernova", specialAtkPower: 35 }
        ]
    },
    { 
        id: 22, name: "Hyd-ron", unit: 3, type: "Renewable", desc: "Combines Hydrogen and Oxygen to create a pure water blast.", 
        hp: 35, baseAtk: 6, basicAtkName: "Energy Surge",
        evolutions: [ { reqXP: 21, name: "Electrolyze", desc: "Separates water into volatile, explosive gasses.", hpBonus: 28, atkBonus: 9, specialAtkName: "Fuel Cell Blast", specialAtkPower: 28 } ]
    },
    { 
        id: 23, name: "Therm-o", unit: 3, type: "Thermodynamics", desc: "A heat-shifting blob that changes form based on Delta T.", 
        hp: 30, baseAtk: 5, basicAtkName: "Thermal Shift",
        evolutions: [ { reqXP: 19, name: "Equilibrium", desc: "Forces the opponent to share its damage state equally.", hpBonus: 24, atkBonus: 7, specialAtkName: "Convection Current", specialAtkPower: 25 } ]
    },
    { 
        id: 24, name: "Turb-ine", unit: 3, type: "Renewable", desc: "A spinning fan creature that creates electrical potential.", 
        hp: 26, baseAtk: 5, basicAtkName: "Energy Surge",
        evolutions: [ { reqXP: 18, name: "Off-Shore", desc: "Grew massive blades capable of harnessing sea winds.", hpBonus: 22, atkBonus: 8, specialAtkName: "Wind Generator", specialAtkPower: 26 } ]
    },
    { 
        id: 25, name: "R-Valu", unit: 3, type: "Thermodynamics", desc: "A fluffy Pokémon that resists all thermal conduction attacks.", 
        hp: 45, baseAtk: 3, basicAtkName: "Thermal Shift",
        evolutions: [ { reqXP: 22, name: "Poly-Urethane", desc: "An impenetrable foam shield that blocks all heat transfer.", hpBonus: 35, atkBonus: 6, specialAtkName: "Insulator Block", specialAtkPower: 22 } ]
    },
    { 
        id: 26, name: "Con-duct", unit: 3, type: "Thermodynamics", desc: "Shifts heat energy quickly through direct physical touch.", 
        hp: 22, baseAtk: 6, basicAtkName: "Thermal Shift",
        evolutions: [ { reqXP: 17, name: "Copper-Core", desc: "Upgraded its body to a high-conductivity metal.", hpBonus: 18, atkBonus: 9, specialAtkName: "Thermal Transfer", specialAtkPower: 27 } ]
    },
    { 
        id: 27, name: "Volt-mouse", unit: 3, type: "Renewable", desc: "A high-pressure electric type with a shockingly high voltage.", 
        hp: 24, baseAtk: 6, basicAtkName: "Energy Surge",
        evolutions: [ { reqXP: 21, name: "Amp-Rat", desc: "Increased its current flow, making its shocks lethal.", hpBonus: 20, atkBonus: 8, specialAtkName: "Circuit Shock", specialAtkPower: 28 } ]
    },
    { 
        id: 28, name: "Resist-o", unit: 3, type: "Renewable", desc: "Slows down the flow of current.", 
        hp: 40, baseAtk: 4, basicAtkName: "Energy Surge",
        evolutions: [ { reqXP: 19, name: "Multi-Meter", desc: "Calculates and perfectly counters incoming electrical attacks.", hpBonus: 30, atkBonus: 7, specialAtkName: "Ohmic Drop", specialAtkPower: 24 } ]
    },
    { 
        id: 29, name: "Bio-mass", unit: 3, type: "Renewable", desc: "A plant-based Pokémon that can be 'burned' for a stat boost.", 
        hp: 32, baseAtk: 5, basicAtkName: "Energy Surge",
        evolutions: [ { reqXP: 20, name: "Fermenta", desc: "Refined its internal sugars to produce explosive power.", hpBonus: 26, atkBonus: 8, specialAtkName: "Ethanol Burn", specialAtkPower: 26 } ]
    },
    { 
        id: 30, name: "Entropy", unit: 3, type: "Thermodynamics", desc: "Boss: A ghost type that represents the inevitable loss of all energy.", 
        hp: 90, baseAtk: 10, basicAtkName: "Thermal Shift",
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 4: Statics (Structure & Material Property)
    // ------------------------------------------
    { 
        id: 31, name: "Truss-tle", unit: 4, type: "Structure", desc: "A turtle whose shell is made of perfectly balanced steel members.", 
        hp: 45, baseAtk: 4, basicAtkName: "Load Bear",
        evolutions: [ { reqXP: 21, name: "Bridge-Back", desc: "Evolved a Warren truss shell capable of handling infinite load.", hpBonus: 35, atkBonus: 7, specialAtkName: "Gusset Plate Smash", specialAtkPower: 25 } ]
    },
    { 
        id: 32, name: "Cent-roid", unit: 4, type: "Structure", desc: "A floating rock that never tips over due to its perfect center.", 
        hp: 30, baseAtk: 5, basicAtkName: "Load Bear",
        evolutions: [ { reqXP: 19, name: "Inertia", desc: "Uses its massive moment of inertia to resist all changes in motion.", hpBonus: 25, atkBonus: 8, specialAtkName: "Axis Align", specialAtkPower: 26 } ]
    },
    { 
        id: 33, name: "Stres-sa", unit: 4, type: "Material Property", desc: "Gets stronger as it takes damage along the Stress-Strain curve.", 
        hp: 35, baseAtk: 6, basicAtkName: "Stress Test",
        evolutions: [ { reqXP: 22, name: "Strain-Harden", desc: "Passed its yield point and permanently locked in its strength.", hpBonus: 28, atkBonus: 9, specialAtkName: "Deformation", specialAtkPower: 28 } ]
    },
    { 
        id: 34, name: "Tens-ile", unit: 4, type: "Material Property", desc: "Very elastic until it is pulled past its Yield Point.", 
        hp: 25, baseAtk: 5, basicAtkName: "Stress Test",
        evolutions: [ { reqXP: 18, name: "Ductile-Whip", desc: "Can stretch to incredible lengths without breaking.", hpBonus: 20, atkBonus: 8, specialAtkName: "Elastic Snap", specialAtkPower: 27 } ]
    },
    { 
        id: 35, name: "Compre-ssor", unit: 4, type: "Structure", desc: "A heavy concrete block that specializes in crushing attacks.", 
        hp: 50, baseAtk: 5, basicAtkName: "Load Bear",
        evolutions: [ { reqXP: 20, name: "Rebar-Beast", desc: "Reinforced with steel to prevent tension cracking.", hpBonus: 30, atkBonus: 8, specialAtkName: "Column Crush", specialAtkPower: 26 } ]
    },
    { 
        id: 36, name: "Joint-y", unit: 4, type: "Structure", desc: "Small pins that desperately try to hold larger structures together.", 
        hp: 20, baseAtk: 4, basicAtkName: "Load Bear",
        evolutions: [
            { reqXP: 10, name: "Roller-Joint", desc: "Allowed to move horizontally, avoiding shear forces.", hpBonus: 10, atkBonus: 3, specialAtkName: "Pin Support", specialAtkPower: 16 },
            { reqXP: 48, name: "Fixed-Mount", desc: "Locked in place. Cannot be moved by any force.", hpBonus: 35, atkBonus: 8, specialAtkName: "Moment Lock", specialAtkPower: 30 }
        ]
    },
    { 
        id: 37, name: "Vect-or", unit: 4, type: "Structure", desc: "An arrow-shaped bird that always knows its magnitude and direction.", 
        hp: 28, baseAtk: 6, basicAtkName: "Load Bear",
        evolutions: [ { reqXP: 19, name: "Resultant", desc: "Combines the forces of all its allies into one massive blow.", hpBonus: 22, atkBonus: 8, specialAtkName: "Component Strike", specialAtkPower: 26 } ]
    },
    { 
        id: 38, name: "Beam-er", unit: 4, type: "Structure", desc: "A long, slender snake that deflects heavily under pressure.", 
        hp: 32, baseAtk: 5, basicAtkName: "Load Bear",
        evolutions: [ { reqXP: 20, name: "I-Beam", desc: "Reconfigured its shape to maximize strength while minimizing weight.", hpBonus: 25, atkBonus: 8, specialAtkName: "Bending Moment", specialAtkPower: 25 } ]
    },
    { 
        id: 39, name: "Modu-lus", unit: 4, type: "Material Property", desc: "A stiff crystal creature that is incredibly hard to bend or break.", 
        hp: 40, baseAtk: 5, basicAtkName: "Stress Test",
        evolutions: [ { reqXP: 21, name: "Titanium-Core", desc: "Achieved the ultimate stiffness-to-weight ratio.", hpBonus: 30, atkBonus: 8, specialAtkName: "Young's Smash", specialAtkPower: 26 } ]
    },
    { 
        id: 40, name: "Stati-cat", unit: 4, type: "Structure", desc: "Boss: Forces the sum of all moments to be zero, freezing the turn.", 
        hp: 95, baseAtk: 9, basicAtkName: "Load Bear",
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 5: Transportation (Traffic Flow & Infrastructure)
    // ------------------------------------------
    { 
        id: 41, name: "Sign-al", unit: 5, type: "Traffic Flow", desc: "Changes colors to abruptly stop or start the opponent's moves.", 
        hp: 25, baseAtk: 4, basicAtkName: "Flow Control",
        evolutions: [ { reqXP: 18, name: "Actuated-Node", desc: "Senses approaching opponents and changes flow dynamically.", hpBonus: 20, atkBonus: 7, specialAtkName: "Red Light Halt", specialAtkPower: 24 } ]
    },
    { 
        id: 42, name: "Flow-ey", unit: 5, type: "Traffic Flow", desc: "A fluid creature that moves significantly faster in a platoon.", 
        hp: 30, baseAtk: 5, basicAtkName: "Flow Control",
        evolutions: [ 
            { reqXP: 15, name: "Headway-Dash", desc: "Maintains perfect following distance to maximize speed.", hpBonus: 15, atkBonus: 4, specialAtkName: "Platoon Surge", specialAtkPower: 18 },
            { reqXP: 45, name: "Shock-Wave", desc: "Moves as a unified, unstoppable traffic wave.", hpBonus: 30, atkBonus: 10, specialAtkName: "Tsunami Flow", specialAtkPower: 35 }
        ]
    },
    { 
        id: 43, name: "Roun-about", unit: 5, type: "Infrastructure", desc: "A spinning top that keeps traffic moving smoothly without stopping.", 
        hp: 35, baseAtk: 4, basicAtkName: "Pave Over",
        evolutions: [ 
            { reqXP: 16, name: "Rotary-Prime", desc: "An endless circle that traps opponents in infinite delay.", hpBonus: 18, atkBonus: 4, specialAtkName: "Yield Spin", specialAtkPower: 18 },
            { reqXP: 48, name: "DDI-Vortex", desc: "A diverging diamond that confuses all opponents.", hpBonus: 35, atkBonus: 9, specialAtkName: "Crossover Crush", specialAtkPower: 30 }
        ]
    },
    { 
        id: 44, name: "Grid-lock", unit: 5, type: "Traffic Flow", desc: "A heavy, slow beast that clogs up the entire battlefield.", 
        hp: 55, baseAtk: 6, basicAtkName: "Flow Control",
        evolutions: [ { reqXP: 22, name: "Bottleneck", desc: "Forces the opponent's capacity down to a mere crawl.", hpBonus: 35, atkBonus: 8, specialAtkName: "Jam Crush", specialAtkPower: 28 } ]
    },
    { 
        id: 45, name: "Opti-m", unit: 5, type: "Infrastructure", desc: "An algorithmic bug that always finds the shortest path to the goal.", 
        hp: 22, baseAtk: 5, basicAtkName: "Pave Over",
        evolutions: [ { reqXP: 19, name: "Dijkstra-Bug", desc: "Calculates the exact lowest-cost path for its attacks.", hpBonus: 18, atkBonus: 8, specialAtkName: "Route Plan", specialAtkPower: 26 } ]
    },
    { 
        id: 46, name: "Lane-y", unit: 5, type: "Infrastructure", desc: "A long, flat Pokémon that speeds up any allies on its team.", 
        hp: 28, baseAtk: 5, basicAtkName: "Pave Over",
        evolutions: [ { reqXP: 18, name: "Express-Way", desc: "Bypasses all defenses to strike the target directly.", hpBonus: 22, atkBonus: 8, specialAtkName: "HOV Boost", specialAtkPower: 25 } ]
    },
    { 
        id: 47, name: "Clear-Zone", unit: 5, type: "Infrastructure", desc: "A wide, empty field that absorbs runaway vehicles.", 
        hp: 40, baseAtk: 3, basicAtkName: "Pave Over",
        evolutions: [ { reqXP: 19, name: "Guard-Rail", desc: "Deflects incoming kinetic energy safely away.", hpBonus: 30, atkBonus: 6, specialAtkName: "Shoulder Check", specialAtkPower: 23 } ]
    },
    { 
        id: 48, name: "Sync-ro", unit: 5, type: "Traffic Flow", desc: "Mimics the exact timing and speed of the opponent's attacks.", 
        hp: 32, baseAtk: 5, basicAtkName: "Flow Control",
        evolutions: [ { reqXP: 20, name: "Progression", desc: "Links multiple attacks together with perfect offset timing.", hpBonus: 25, atkBonus: 8, specialAtkName: "Green Wave", specialAtkPower: 27 } ]
    },
    { 
        id: 49, name: "Diver-ge", unit: 5, type: "Infrastructure", desc: "Can split its body into two separate, weaker entities.", 
        hp: 26, baseAtk: 5, basicAtkName: "Pave Over",
        evolutions: [ { reqXP: 21, name: "Interchange", desc: "A massive, complex structure that disorients the enemy.", hpBonus: 22, atkBonus: 7, specialAtkName: "Off-Ramp", specialAtkPower: 26 } ]
    },
    { 
        id: 50, name: "Apex", unit: 5, type: "Traffic Flow", desc: "Boss: An autonomous vehicle that predicts the opponent's move flawlessly.", 
        hp: 85, baseAtk: 11, basicAtkName: "Flow Control",
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 6: Kinematics & AI (Ballistics & Algorithm)
    // ------------------------------------------
    { 
        id: 51, name: "Proj-ec", unit: 6, type: "Ballistics", desc: "Launches itself at a precise angle and initial velocity.", 
        hp: 35, baseAtk: 6, basicAtkName: "Trajectory Launch",
        evolutions: [ { reqXP: 20, name: "Artillery-X", desc: "Calculates wind resistance to land critical hits.", hpBonus: 26, atkBonus: 9, specialAtkName: "Launch Angle", specialAtkPower: 28 } ]
    },
    { 
        id: 52, name: "Parab-ola", unit: 6, type: "Ballistics", desc: "A majestic bird that only flies in perfectly symmetrical curves.", 
        hp: 30, baseAtk: 5, basicAtkName: "Trajectory Launch",
        evolutions: [ { reqXP: 19, name: "Trajecto", desc: "Can trace its exact path of motion before striking.", hpBonus: 24, atkBonus: 8, specialAtkName: "Vertex Dive", specialAtkPower: 26 } ]
    },
    { 
        id: 53, name: "Neu-ro", unit: 6, type: "Algorithm", desc: "A floating brain node that 'learns' from every turn it survives.", 
        hp: 28, baseAtk: 4, basicAtkName: "Data Process",
        evolutions: [ { reqXP: 21, name: "Deep-Node", desc: "Hidden layers of logic allow it to bypass enemy logic.", hpBonus: 24, atkBonus: 8, specialAtkName: "Weight Adjust", specialAtkPower: 26 } ]
    },
    { 
        id: 54, name: "Dat-a", unit: 6, type: "Algorithm", desc: "A cloud of pixels that grows more complex and noisy over time.", 
        hp: 45, baseAtk: 5, basicAtkName: "Data Process",
        evolutions: [ 
            { reqXP: 18, name: "Clean-Set", desc: "Removed all outliers to focus its attack power perfectly.", hpBonus: 18, atkBonus: 4, specialAtkName: "Big Data Flood", specialAtkPower: 18 },
            { reqXP: 45, name: "Data-Lake", desc: "An ocean of perfect, optimized data.", hpBonus: 45, atkBonus: 10, specialAtkName: "Tsunami Sort", specialAtkPower: 35 }
        ]
    },
    { 
        id: 55, name: "Train-er", unit: 6, type: "Algorithm", desc: "Starts very weak but gets smarter every single round.", 
        hp: 20, baseAtk: 4, basicAtkName: "Data Process",
        evolutions: [
            { reqXP: 9, name: "Model-Fit", desc: "A highly accurate creature that rarely misses its target.", hpBonus: 10, atkBonus: 3, specialAtkName: "Epoch Loop", specialAtkPower: 16 },
            { reqXP: 47, name: "Over-Fit", desc: "Memorized the battle so perfectly it predicts the future.", hpBonus: 25, atkBonus: 8, specialAtkName: "Neural Net", specialAtkPower: 32 }
        ]
    },
    { 
        id: 56, name: "Bi-as", unit: 6, type: "Algorithm", desc: "A crooked creature that hits extremely hard but misses frequently.", 
        hp: 40, baseAtk: 6, basicAtkName: "Data Process",
        evolutions: [ { reqXP: 19, name: "Variance", desc: "Wildly unpredictable attack power spread across a wide area.", hpBonus: 28, atkBonus: 8, specialAtkName: "Skewed Strike", specialAtkPower: 28 } ]
    },
    { 
        id: 57, name: "Ethic-o", unit: 6, type: "Algorithm", desc: "A paladin-like creature that prevents 'unfair' AI generation.", 
        hp: 50, baseAtk: 5, basicAtkName: "Data Process",
        evolutions: [ { reqXP: 21, name: "Turing-Guard", desc: "Ensures no machine logic harms the user's data.", hpBonus: 35, atkBonus: 7, specialAtkName: "Moral Constraint", specialAtkPower: 24 } ]
    },
    { 
        id: 58, name: "Gen-AI", unit: 6, type: "Algorithm", desc: "Transforms into a perfect, but slightly flawed, copy of the opponent.", 
        hp: 32, baseAtk: 5, basicAtkName: "Data Process",
        evolutions: [ { reqXP: 18, name: "Deep-Fake", desc: "Creates convincing illusions to confuse the enemy.", hpBonus: 24, atkBonus: 8, specialAtkName: "Prompt Inject", specialAtkPower: 27 } ]
    },
    { 
        id: 59, name: "Algo-rith", unit: 6, type: "Algorithm", desc: "Automatically sorts and organizes its attacks for maximum efficiency.", 
        hp: 26, baseAtk: 5, basicAtkName: "Data Process",
        evolutions: [ { reqXP: 19, name: "Quick-Sort", desc: "Divides and conquers its opponent with blazing speed.", hpBonus: 20, atkBonus: 9, specialAtkName: "Bubble Sort", specialAtkPower: 26 } ]
    },
    { 
        id: 60, name: "Singularity", unit: 6, type: "Algorithm", desc: "Boss: An omniscient AI that can use any move from any Unit.", 
        hp: 120, baseAtk: 12, basicAtkName: "Data Process",
        evolutions: []
    },

    // ------------------------------------------
    // STARTERS: Digital Electronics (Mr. V)
    // ------------------------------------------
    { 
        id: 61, name: "ArchaeopXORyx", unit: 0, type: "Digital Logic", desc: "Emits logical signals (XOR, OR, NAND) to process information.", 
        hp: 30, baseAtk: 6, basicAtkName: "Bit Shift",
        evolutions: [
            { reqXP: 10, name: "PterORdactyl", desc: "Its wings span wide like an OR gate.", hpBonus: 12, atkBonus: 4, specialAtkName: "OR Sweep", specialAtkPower: 18 },
            { reqXP: 50, name: "NANDragon", desc: "The ultimate universal logic beast.", hpBonus: 25, atkBonus: 9, specialAtkName: "NAND Breath", specialAtkPower: 34 }
        ]
    },
    { 
        id: 62, name: "Countertle", unit: 0, type: "Timing", desc: "Increments its internal counter building up power for a massive discharge.", 
        hp: 35, baseAtk: 5, basicAtkName: "Clock Tick",
        evolutions: [
            { reqXP: 11, name: "Wartortle-Clock", desc: "Its shell vibrates at exactly 1Hz.", hpBonus: 15, atkBonus: 3, specialAtkName: "Flip-Flop Splash", specialAtkPower: 16 },
            { reqXP: 52, name: "Blast-Clock", desc: "Fires massive synchronous timing blasts from its cannons.", hpBonus: 30, atkBonus: 8, specialAtkName: "Synchronous Wave", specialAtkPower: 30 }
        ]
    },
    { 
        id: 63, name: "Latchander", unit: 0, type: "Digital Logic", desc: "Capable of storing a temporary state to replicate its last attack.", 
        hp: 28, baseAtk: 7, basicAtkName: "Bit Shift",
        evolutions: [
            { reqXP: 9, name: "Char-Register", desc: "Can store 8-bits of fiery data.", hpBonus: 10, atkBonus: 5, specialAtkName: "Memory Burn", specialAtkPower: 20 },
            { reqXP: 49, name: "Char-RAM", desc: "Unleashes randomized memory addresses as pure fire.", hpBonus: 22, atkBonus: 11, specialAtkName: "Volatile Burst", specialAtkPower: 36 }
        ]
    },

    // ------------------------------------------
    // STARTERS: Aerospace Engineering (Mrs. G)
    // ------------------------------------------
    { 
        id: 64, name: "Liftander", unit: 0, type: "Aerodynamics", desc: "Uses its specialized wings to generate powerful wind currents.", 
        hp: 28, baseAtk: 6, basicAtkName: "Aero Slash",
        evolutions: [
            { reqXP: 10, name: "Camber-Zard", desc: "Adjusted its wing camber for maximum lift coefficient.", hpBonus: 12, atkBonus: 5, specialAtkName: "Airfoil Slice", specialAtkPower: 18 },
            { reqXP: 51, name: "Mach-Zard", desc: "Breaks the sound barrier with every strike.", hpBonus: 24, atkBonus: 10, specialAtkName: "Sonic Boom", specialAtkPower: 35 }
        ]
    },
    { 
        id: 65, name: "Propellite", unit: 0, type: "Propulsion", desc: "Launches high-speed energy blasts powered by its jet engine.", 
        hp: 30, baseAtk: 5, basicAtkName: "Thrust Burn",
        evolutions: [
            { reqXP: 11, name: "Turbofan", desc: "A highly efficient creature that never runs out of energy.", hpBonus: 14, atkBonus: 4, specialAtkName: "Thrust Vector", specialAtkPower: 17 },
            { reqXP: 48, name: "Scramjet", desc: "Achieves hypersonic speeds before the opponent can blink.", hpBonus: 28, atkBonus: 9, specialAtkName: "Hypersonic Jet", specialAtkPower: 32 }
        ]
    },
    { 
        id: 66, name: "Turburtle", unit: 0, type: "Aerodynamics", desc: "Rotates at incredible speeds to create a powerful vortex.", 
        hp: 35, baseAtk: 4, basicAtkName: "Aero Slash",
        evolutions: [
            { reqXP: 10, name: "Slip-Stream", desc: "Creates a low-pressure zone to pull enemies in.", hpBonus: 18, atkBonus: 3, specialAtkName: "Drag Reduction", specialAtkPower: 15 },
            { reqXP: 52, name: "Aero-Shell", desc: "A perfectly streamlined tank that takes zero drag damage.", hpBonus: 35, atkBonus: 7, specialAtkName: "Vortex Crush", specialAtkPower: 28 }
        ]
    }
];
