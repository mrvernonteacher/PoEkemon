// ==========================================
// POEKEDEX DATA (66 Creatures) - EVOLUTION UPDATE
// ==========================================

const poekedex = [
    // ------------------------------------------
    // UNIT 1: Mechanisms (Simple Machines & Gear Trains)
    // ------------------------------------------
    { 
        id: 1, name: "Fulcru", unit: 1, type: "Simple Machine", 
        desc: "A see-saw creature that easily gains Mechanical Advantage.", 
        hp: 20, baseAtk: 5, specialAtk: "Effort Strike", specialAtkPower: 15,
        evolutions: [
            { reqXP: 3, name: "Megacru", desc: "Its fulcrum shifted closer to the load, giving it massive striking power.", hpBonus: 10, atkBonus: 2, spAtkBonus: 8 }
        ]
    },
    { 
        id: 2, name: "Spurite", unit: 1, type: "Gear Train", 
        desc: "A small gear that interlocks with others to increase torque.", 
        hp: 25, baseAtk: 6, specialAtk: "Mesh Crunch", specialAtkPower: 12,
        evolutions: [
            { reqXP: 4, name: "Spur-Master", desc: "Grew an idler gear to reverse its attack direction.", hpBonus: 12, atkBonus: 4, spAtkBonus: 5 },
            { reqXP: 8, name: "Torque-Rex", desc: "A massive gear train capable of crushing steel.", hpBonus: 15, atkBonus: 5, spAtkBonus: 10 }
        ]
    },
    { 
        id: 3, name: "Pulle-pup", unit: 1, type: "Simple Machine", 
        desc: "Uses rope-like vines to lift objects heavier than itself.", 
        hp: 22, baseAtk: 5, specialAtk: "Block and Tackle", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Pulle-Hound", desc: "Added more strands to its block, increasing lifting power exponentially.", hpBonus: 15, atkBonus: 3, spAtkBonus: 7 }
        ]
    },
    { 
        id: 4, name: "Incling", unit: 1, type: "Simple Machine", 
        desc: "A sloped, armored creature that reduces effort force.", 
        hp: 28, baseAtk: 4, specialAtk: "Rampage", specialAtkPower: 16,
        evolutions: [
            { reqXP: 5, name: "Decline", desc: "Steepened its slope to maximize its gravitational strikes.", hpBonus: 18, atkBonus: 4, spAtkBonus: 9 }
        ]
    },
    { 
        id: 5, name: "Torq-shell", unit: 1, type: "Simple Machine", 
        desc: "A slow turtle that possesses massive rotational force.", 
        hp: 35, baseAtk: 3, specialAtk: "Axle Spin", specialAtkPower: 18,
        evolutions: [
            { reqXP: 3, name: "Wheel-Beast", desc: "Increased its wheel radius, making its attacks unblockable.", hpBonus: 20, atkBonus: 5, spAtkBonus: 6 }
        ]
    },
    { 
        id: 6, name: "Cam-my", unit: 1, type: "Gear Train", 
        desc: "Changes rotary motion into linear motion to jump high.", 
        hp: 24, baseAtk: 5, specialAtk: "Follower Strike", specialAtkPower: 13,
        evolutions: [
            { reqXP: 3, name: "Cam-Shaft", desc: "Linked multiple cams together for rapid-fire attacks.", hpBonus: 10, atkBonus: 3, spAtkBonus: 10 }
        ]
    },
    { 
        id: 7, name: "Sprock-it", unit: 1, type: "Gear Train", 
        desc: "A fast, metallic dog that runs on a bike-chain tread.", 
        hp: 30, baseAtk: 7, specialAtk: "Chain Whip", specialAtkPower: 15,
        evolutions: [
            { reqXP: 5, name: "Sprocket-Prime", desc: "Its chain drive never slips, granting perfect accuracy.", hpBonus: 15, atkBonus: 4, spAtkBonus: 8 }
        ]
    },
    { 
        id: 8, name: "Wedge-ling", unit: 1, type: "Simple Machine", 
        desc: "A sharp-headed bird used for separating materials.", 
        hp: 20, baseAtk: 6, specialAtk: "Splitter Peck", specialAtkPower: 17,
        evolutions: [
            { reqXP: 3, name: "Axe-Beak", desc: "Evolved a steel wedge head that pierces heavy armor.", hpBonus: 8, atkBonus: 6, spAtkBonus: 12 }
        ]
    },
    { 
        id: 9, name: "Work-bee", unit: 1, type: "Simple Machine", 
        desc: "A high-energy bee that calculates Work as Force x Distance.", 
        hp: 26, baseAtk: 5, specialAtk: "Distance Dash", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Joule-Hornet", desc: "Maximizes energy output across vast distances.", hpBonus: 14, atkBonus: 3, spAtkBonus: 9 }
        ]
    },
    { 
        id: 10, name: "Maw-ment", unit: 1, type: "Gear Train", 
        desc: "Boss: Manipulates the Moment of any object to freeze it.", 
        hp: 80, baseAtk: 12, specialAtk: "Torque Lock", specialAtkPower: 25,
        evolutions: [] // Bosses don't evolve
    },

    // ------------------------------------------
    // UNIT 2: Machine Control (Logic Loops & Sensors)
    // ------------------------------------------
    { 
        id: 11, name: "Vex-el", unit: 2, type: "Logic Loop", 
        desc: "A small brain-chip creature with logic-wire limbs.", 
        hp: 25, baseAtk: 4, specialAtk: "If-Then Blast", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "Cortex-Prime", desc: "Upgraded its processor to handle nested if-statements.", hpBonus: 12, atkBonus: 3, spAtkBonus: 8 }
        ]
    },
    { 
        id: 12, name: "Bump-urr", unit: 2, type: "Sensor", 
        desc: "A sensory Pokémon that only reacts to direct physical touch.", 
        hp: 22, baseAtk: 5, specialAtk: "Digital Bash", specialAtkPower: 14,
        evolutions: [
            { reqXP: 3, name: "Limit-Switch", desc: "Gained an extended arm for long-range touch detection.", hpBonus: 10, atkBonus: 4, spAtkBonus: 6 }
        ]
    },
    { 
        id: 13, name: "Phot-on", unit: 2, type: "Sensor", 
        desc: "Uses light sensors to navigate through 'dark' code.", 
        hp: 28, baseAtk: 5, specialAtk: "Lumen Beam", specialAtkPower: 16,
        evolutions: [
            { reqXP: 4, name: "Optic-Core", desc: "Can blind opponents with intense light-sensor feedback.", hpBonus: 15, atkBonus: 2, spAtkBonus: 9 }
        ]
    },
    { 
        id: 14, name: "Loop-a", unit: 2, type: "Logic Loop", 
        desc: "A snake that bites its tail; trapped forever in a While loop.", 
        hp: 30, baseAtk: 4, specialAtk: "Infinite Constrict", specialAtkPower: 18,
        evolutions: [
            { reqXP: 5, name: "For-Loopa", desc: "Controls exactly how many times it strikes its opponent.", hpBonus: 12, atkBonus: 5, spAtkBonus: 8 }
        ]
    },
    { 
        id: 15, name: "Vari-bit", unit: 2, type: "Logic Loop", 
        desc: "Changes colors based on True or False Boolean conditions.", 
        hp: 24, baseAtk: 5, specialAtk: "Boolean Strike", specialAtkPower: 13,
        evolutions: [
            { reqXP: 3, name: "Integer-Bite", desc: "Expanded its memory to hold complex number attacks.", hpBonus: 10, atkBonus: 3, spAtkBonus: 7 },
            { reqXP: 7, name: "Float-Fang", desc: "Attacks with deadly precision using decimal placement.", hpBonus: 14, atkBonus: 4, spAtkBonus: 12 }
        ]
    },
    { 
        id: 16, name: "Mot-o", unit: 2, type: "Sensor", 
        desc: "Spins wildly out of control if not given a wait command.", 
        hp: 35, baseAtk: 6, specialAtk: "PWM Spin", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "Servo-Max", desc: "Gained the ability to stop at exact degree angles.", hpBonus: 15, atkBonus: 3, spAtkBonus: 8 }
        ]
    },
    { 
        id: 17, name: "Pote-ohm", unit: 2, type: "Sensor", 
        desc: "Uses a potentiometer to control the 'volume' of its attacks.", 
        hp: 26, baseAtk: 4, specialAtk: "Analog Wave", specialAtkPower: 16,
        evolutions: [
            { reqXP: 4, name: "Dial-Ohm", desc: "Can fine-tune its energy output to bypass defenses.", hpBonus: 12, atkBonus: 3, spAtkBonus: 9 }
        ]
    },
    { 
        id: 18, name: "Wait-er", unit: 2, type: "Logic Loop", 
        desc: "Freezes time in the battle for a specific number of milliseconds.", 
        hp: 20, baseAtk: 3, specialAtk: "Delay Halt", specialAtkPower: 17,
        evolutions: [
            { reqXP: 3, name: "Timer-Bot", desc: "Uses background timers to attack while defending.", hpBonus: 10, atkBonus: 2, spAtkBonus: 10 }
        ]
    },
    { 
        id: 19, name: "Encod-er", unit: 2, type: "Sensor", 
        desc: "Tracks exactly how many degrees the player has moved.", 
        hp: 32, baseAtk: 5, specialAtk: "Quad-Pulse", specialAtkPower: 15,
        evolutions: [
            { reqXP: 5, name: "Odom-Eter", desc: "Calculates perfect attack trajectories using wheel rotations.", hpBonus: 18, atkBonus: 4, spAtkBonus: 7 }
        ]
    },
    { 
        id: 20, name: "The Kernel", unit: 2, type: "Logic Loop", 
        desc: "Boss: Can rewrite the opponent's moveset using raw Logic.", 
        hp: 85, baseAtk: 10, specialAtk: "Syntax Error", specialAtkPower: 30,
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 3: Energy (Renewable & Thermodynamics)
    // ------------------------------------------
    { 
        id: 21, name: "Sola-ray", unit: 3, type: "Renewable", 
        desc: "Absorbs sunlight to charge its internal photovoltaic battery.", 
        hp: 28, baseAtk: 5, specialAtk: "Photon Flare", specialAtkPower: 16,
        evolutions: [
            { reqXP: 4, name: "Array-Z", desc: "Wired in series to double its voltage output.", hpBonus: 15, atkBonus: 2, spAtkBonus: 10 }
        ]
    },
    { 
        id: 22, name: "Hyd-ron", unit: 3, type: "Renewable", 
        desc: "Combines Hydrogen and Oxygen to create a pure water blast.", 
        hp: 35, baseAtk: 6, specialAtk: "Fuel Cell Blast", specialAtkPower: 15,
        evolutions: [
            { reqXP: 5, name: "Electrolyze", desc: "Separates water into volatile, explosive gasses.", hpBonus: 18, atkBonus: 4, spAtkBonus: 8 }
        ]
    },
    { 
        id: 23, name: "Therm-o", unit: 3, type: "Thermodynamics", 
        desc: "A heat-shifting blob that changes form based on Delta T.", 
        hp: 30, baseAtk: 5, specialAtk: "Convection Current", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Equilibrium", desc: "Forces the opponent to share its damage state equally.", hpBonus: 15, atkBonus: 3, spAtkBonus: 9 }
        ]
    },
    { 
        id: 24, name: "Turb-ine", unit: 3, type: "Renewable", 
        desc: "A spinning fan creature that creates electrical potential.", 
        hp: 26, baseAtk: 5, specialAtk: "Wind Generator", specialAtkPower: 16,
        evolutions: [
            { reqXP: 3, name: "Off-Shore", desc: "Grew massive blades capable of harnessing sea winds.", hpBonus: 12, atkBonus: 3, spAtkBonus: 8 }
        ]
    },
    { 
        id: 25, name: "R-Valu", unit: 3, type: "Thermodynamics", 
        desc: "A fluffy Pokémon that resists all thermal conduction attacks.", 
        hp: 45, baseAtk: 3, specialAtk: "Insulator Block", specialAtkPower: 12,
        evolutions: [
            { reqXP: 4, name: "Poly-Urethane", desc: "An impenetrable foam shield that blocks all heat transfer.", hpBonus: 25, atkBonus: 2, spAtkBonus: 5 }
        ]
    },
    { 
        id: 26, name: "Con-duct", unit: 3, type: "Thermodynamics", 
        desc: "Shifts heat energy quickly through direct physical touch.", 
        hp: 22, baseAtk: 6, specialAtk: "Thermal Transfer", specialAtkPower: 17,
        evolutions: [
            { reqXP: 3, name: "Copper-Core", desc: "Upgraded its body to a high-conductivity metal.", hpBonus: 10, atkBonus: 5, spAtkBonus: 10 }
        ]
    },
    { 
        id: 27, name: "Volt-mouse", unit: 3, type: "Renewable", 
        desc: "A high-pressure electric type with a shockingly high voltage.", 
        hp: 24, baseAtk: 6, specialAtk: "Circuit Shock", specialAtkPower: 18,
        evolutions: [
            { reqXP: 4, name: "Amp-Rat", desc: "Increased its current flow, making its shocks lethal.", hpBonus: 12, atkBonus: 3, spAtkBonus: 9 }
        ]
    },
    { 
        id: 28, name: "Resist-o", unit: 3, type: "Renewable", 
        desc: "Slows down the flow of current.", 
        hp: 40, baseAtk: 4, specialAtk: "Ohmic Drop", specialAtkPower: 14,
        evolutions: [
            { reqXP: 3, name: "Multi-Meter", desc: "Calculates and perfectly counters incoming electrical attacks.", hpBonus: 20, atkBonus: 3, spAtkBonus: 7 }
        ]
    },
    { 
        id: 29, name: "Bio-mass", unit: 3, type: "Renewable", 
        desc: "A plant-based Pokémon that can be 'burned' for a stat boost.", 
        hp: 32, baseAtk: 5, specialAtk: "Ethanol Burn", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "Fermenta", desc: "Refined its internal sugars to produce explosive power.", hpBonus: 15, atkBonus: 4, spAtkBonus: 8 }
        ]
    },
    { 
        id: 30, name: "Entropy", unit: 3, type: "Thermodynamics", 
        desc: "Boss: A ghost type that represents the inevitable loss of all energy.", 
        hp: 90, baseAtk: 10, specialAtk: "Heat Death", specialAtkPower: 28,
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 4: Statics (Structure & Material Property)
    // ------------------------------------------
    { 
        id: 31, name: "Truss-tle", unit: 4, type: "Structure", 
        desc: "A turtle whose shell is made of perfectly balanced steel members.", 
        hp: 45, baseAtk: 4, specialAtk: "Gusset Plate Smash", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Bridge-Back", desc: "Evolved a Warren truss shell capable of handling infinite load.", hpBonus: 25, atkBonus: 3, spAtkBonus: 6 }
        ]
    },
    { 
        id: 32, name: "Cent-roid", unit: 4, type: "Structure", 
        desc: "A floating rock that never tips over due to its perfect center.", 
        hp: 30, baseAtk: 5, specialAtk: "Axis Align", specialAtkPower: 15,
        evolutions: [
            { reqXP: 3, name: "Inertia", desc: "Uses its massive moment of inertia to resist all changes in motion.", hpBonus: 15, atkBonus: 3, spAtkBonus: 9 }
        ]
    },
    { 
        id: 33, name: "Stres-sa", unit: 4, type: "Material Property", 
        desc: "Gets stronger as it takes damage along the Stress-Strain curve.", 
        hp: 35, baseAtk: 6, specialAtk: "Deformation", specialAtkPower: 16,
        evolutions: [
            { reqXP: 5, name: "Strain-Harden", desc: "Passed its yield point and permanently locked in its strength.", hpBonus: 18, atkBonus: 5, spAtkBonus: 8 }
        ]
    },
    { 
        id: 34, name: "Tens-ile", unit: 4, type: "Material Property", 
        desc: "Very elastic until it is pulled past its Yield Point.", 
        hp: 25, baseAtk: 5, specialAtk: "Elastic Snap", specialAtkPower: 17,
        evolutions: [
            { reqXP: 3, name: "Ductile-Whip", desc: "Can stretch to incredible lengths without breaking.", hpBonus: 12, atkBonus: 4, spAtkBonus: 10 }
        ]
    },
    { 
        id: 35, name: "Compre-ssor", unit: 4, type: "Structure", 
        desc: "A heavy concrete block that specializes in crushing attacks.", 
        hp: 50, baseAtk: 5, specialAtk: "Column Crush", specialAtkPower: 18,
        evolutions: [
            { reqXP: 4, name: "Rebar-Beast", desc: "Reinforced with steel to prevent tension cracking.", hpBonus: 20, atkBonus: 5, spAtkBonus: 8 }
        ]
    },
    { 
        id: 36, name: "Joint-y", unit: 4, type: "Structure", 
        desc: "Small pins that desperately try to hold larger structures together.", 
        hp: 20, baseAtk: 4, specialAtk: "Pin Support", specialAtkPower: 12,
        evolutions: [
            { reqXP: 3, name: "Roller-Joint", desc: "Allowed to move horizontally, avoiding shear forces.", hpBonus: 10, atkBonus: 2, spAtkBonus: 7 },
            { reqXP: 7, name: "Fixed-Mount", desc: "Locked in place. Cannot be moved by any force.", hpBonus: 25, atkBonus: 3, spAtkBonus: 10 }
        ]
    },
    { 
        id: 37, name: "Vect-or", unit: 4, type: "Structure", 
        desc: "An arrow-shaped bird that always knows its magnitude and direction.", 
        hp: 28, baseAtk: 6, specialAtk: "Component Strike", specialAtkPower: 16,
        evolutions: [
            { reqXP: 4, name: "Resultant", desc: "Combines the forces of all its allies into one massive blow.", hpBonus: 14, atkBonus: 4, spAtkBonus: 11 }
        ]
    },
    { 
        id: 38, name: "Beam-er", unit: 4, type: "Structure", 
        desc: "A long, slender snake that deflects heavily under pressure.", 
        hp: 32, baseAtk: 5, specialAtk: "Bending Moment", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "I-Beam", desc: "Reconfigured its shape to maximize strength while minimizing weight.", hpBonus: 16, atkBonus: 4, spAtkBonus: 9 }
        ]
    },
    { 
        id: 39, name: "Modu-lus", unit: 4, type: "Material Property", 
        desc: "A stiff crystal creature that is incredibly hard to bend or break.", 
        hp: 40, baseAtk: 5, specialAtk: "Young's Smash", specialAtkPower: 14,
        evolutions: [
            { reqXP: 5, name: "Titanium-Core", desc: "Achieved the ultimate stiffness-to-weight ratio.", hpBonus: 20, atkBonus: 5, spAtkBonus: 8 }
        ]
    },
    { 
        id: 40, name: "Stati-cat", unit: 4, type: "Structure", 
        desc: "Boss: Forces the sum of all moments to be zero, freezing the turn.", 
        hp: 95, baseAtk: 9, specialAtk: "Zero Sum", specialAtkPower: 26,
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 5: Transportation (Traffic Flow & Infrastructure)
    // ------------------------------------------
    { 
        id: 41, name: "Sign-al", unit: 5, type: "Traffic Flow", 
        desc: "Changes colors to abruptly stop or start the opponent's moves.", 
        hp: 25, baseAtk: 4, specialAtk: "Red Light Halt", specialAtkPower: 15,
        evolutions: [
            { reqXP: 3, name: "Actuated-Node", desc: "Senses approaching opponents and changes flow dynamically.", hpBonus: 12, atkBonus: 3, spAtkBonus: 8 }
        ]
    },
    { 
        id: 42, name: "Flow-ey", unit: 5, type: "Traffic Flow", 
        desc: "A fluid creature that moves significantly faster in a platoon.", 
        hp: 30, baseAtk: 5, specialAtk: "Platoon Surge", specialAtkPower: 16,
        evolutions: [
            { reqXP: 4, name: "Headway-Dash", desc: "Maintains perfect following distance to maximize speed.", hpBonus: 15, atkBonus: 4, spAtkBonus: 9 }
        ]
    },
    { 
        id: 43, name: "Roun-about", unit: 5, type: "Infrastructure", 
        desc: "A spinning top that keeps traffic moving smoothly without stopping.", 
        hp: 35, baseAtk: 4, specialAtk: "Yield Spin", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Rotary-Prime", desc: "An endless circle that traps opponents in infinite delay.", hpBonus: 18, atkBonus: 3, spAtkBonus: 8 }
        ]
    },
    { 
        id: 44, name: "Grid-lock", unit: 5, type: "Traffic Flow", 
        desc: "A heavy, slow beast that clogs up the entire battlefield.", 
        hp: 55, baseAtk: 6, specialAtk: "Jam Crush", specialAtkPower: 18,
        evolutions: [
            { reqXP: 5, name: "Bottleneck", desc: "Forces the opponent's capacity down to a mere crawl.", hpBonus: 25, atkBonus: 5, spAtkBonus: 7 }
        ]
    },
    { 
        id: 45, name: "Opti-m", unit: 5, type: "Infrastructure", 
        desc: "An algorithmic bug that always finds the shortest path to the goal.", 
        hp: 22, baseAtk: 5, specialAtk: "Route Plan", specialAtkPower: 16,
        evolutions: [
            { reqXP: 3, name: "Dijkstra-Bug", desc: "Calculates the exact lowest-cost path for its attacks.", hpBonus: 10, atkBonus: 4, spAtkBonus: 10 }
        ]
    },
    { 
        id: 46, name: "Lane-y", unit: 5, type: "Infrastructure", 
        desc: "A long, flat Pokémon that speeds up any allies on its team.", 
        hp: 28, baseAtk: 5, specialAtk: "HOV Boost", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "Express-Way", desc: "Bypasses all defenses to strike the target directly.", hpBonus: 14, atkBonus: 5, spAtkBonus: 8 }
        ]
    },
    { 
        id: 47, name: "Clear-Zone", unit: 5, type: "Infrastructure", 
        desc: "A wide, empty field that absorbs runaway vehicles.", 
        hp: 40, baseAtk: 3, specialAtk: "Shoulder Check", specialAtkPower: 14,
        evolutions: [
            { reqXP: 3, name: "Guard-Rail", desc: "Deflects incoming kinetic energy safely away.", hpBonus: 20, atkBonus: 2, spAtkBonus: 6 }
        ]
    },
    { 
        id: 48, name: "Sync-ro", unit: 5, type: "Traffic Flow", 
        desc: "Mimics the exact timing and speed of the opponent's attacks.", 
        hp: 32, baseAtk: 5, specialAtk: "Green Wave", specialAtkPower: 16,
        evolutions: [
            { reqXP: 4, name: "Progression", desc: "Links multiple attacks together with perfect offset timing.", hpBonus: 15, atkBonus: 4, spAtkBonus: 9 }
        ]
    },
    { 
        id: 49, name: "Diver-ge", unit: 5, type: "Infrastructure", 
        desc: "Can split its body into two separate, weaker entities.", 
        hp: 26, baseAtk: 5, specialAtk: "Off-Ramp", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "Interchange", desc: "A massive, complex structure that disorients the enemy.", hpBonus: 16, atkBonus: 3, spAtkBonus: 10 }
        ]
    },
    { 
        id: 50, name: "Apex", unit: 5, type: "Traffic Flow", 
        desc: "Boss: An autonomous vehicle that predicts the opponent's move flawlessly.", 
        hp: 85, baseAtk: 11, specialAtk: "Lidar Lock", specialAtkPower: 26,
        evolutions: []
    },

    // ------------------------------------------
    // UNIT 6: Kinematics & AI (Ballistics & Algorithm)
    // ------------------------------------------
    { 
        id: 51, name: "Proj-ec", unit: 6, type: "Ballistics", 
        desc: "Launches itself at a precise angle and initial velocity.", 
        hp: 35, baseAtk: 6, specialAtk: "Launch Angle", specialAtkPower: 18,
        evolutions: [
            { reqXP: 4, name: "Artillery-X", desc: "Calculates wind resistance to land critical hits.", hpBonus: 15, atkBonus: 5, spAtkBonus: 10 }
        ]
    },
    { 
        id: 52, name: "Parab-ola", unit: 6, type: "Ballistics", 
        desc: "A majestic bird that only flies in perfectly symmetrical curves.", 
        hp: 30, baseAtk: 5, specialAtk: "Vertex Dive", specialAtkPower: 17,
        evolutions: [
            { reqXP: 3, name: "Trajecto", desc: "Can trace its exact path of motion before striking.", hpBonus: 12, atkBonus: 4, spAtkBonus: 9 }
        ]
    },
    { 
        id: 53, name: "Neu-ro", unit: 6, type: "Algorithm", 
        desc: "A floating brain node that 'learns' from every turn it survives.", 
        hp: 28, baseAtk: 4, specialAtk: "Weight Adjust", specialAtkPower: 15,
        evolutions: [
            { reqXP: 4, name: "Deep-Node", desc: "Hidden layers of logic allow it to bypass enemy logic.", hpBonus: 14, atkBonus: 3, spAtkBonus: 11 }
        ]
    },
    { 
        id: 54, name: "Dat-a", unit: 6, type: "Algorithm", 
        desc: "A cloud of pixels that grows more complex and noisy over time.", 
        hp: 45, baseAtk: 5, specialAtk: "Big Data Flood", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Clean-Set", desc: "Removed all outliers to focus its attack power perfectly.", hpBonus: 20, atkBonus: 4, spAtkBonus: 8 }
        ]
    },
    { 
        id: 55, name: "Train-er", unit: 6, type: "Algorithm", 
        desc: "Starts very weak but gets smarter every single round.", 
        hp: 20, baseAtk: 4, specialAtk: "Epoch Loop", specialAtkPower: 15,
        evolutions: [
            { reqXP: 3, name: "Model-Fit", desc: "A highly accurate creature that rarely misses its target.", hpBonus: 10, atkBonus: 3, spAtkBonus: 9 },
            { reqXP: 7, name: "Over-Fit", desc: "Memorized the battle so perfectly it predicts the future.", hpBonus: 15, atkBonus: 5, spAtkBonus: 15 }
        ]
    },
    { 
        id: 56, name: "Bi-as", unit: 6, type: "Algorithm", 
        desc: "A crooked creature that hits extremely hard but misses frequently.", 
        hp: 40, baseAtk: 6, specialAtk: "Skewed Strike", specialAtkPower: 19,
        evolutions: [
            { reqXP: 4, name: "Variance", desc: "Wildly unpredictable attack power spread across a wide area.", hpBonus: 15, atkBonus: 5, spAtkBonus: 12 }
        ]
    },
    { 
        id: 57, name: "Ethic-o", unit: 6, type: "Algorithm", 
        desc: "A paladin-like creature that prevents 'unfair' AI generation.", 
        hp: 50, baseAtk: 5, specialAtk: "Moral Constraint", specialAtkPower: 14,
        evolutions: [
            { reqXP: 4, name: "Turing-Guard", desc: "Ensures no machine logic harms the user's data.", hpBonus: 25, atkBonus: 4, spAtkBonus: 8 }
        ]
    },
    { 
        id: 58, name: "Gen-AI", unit: 6, type: "Algorithm", 
        desc: "Transforms into a perfect, but slightly flawed, copy of the opponent.", 
        hp: 32, baseAtk: 5, specialAtk: "Prompt Inject", specialAtkPower: 16,
        evolutions: [
            { reqXP: 5, name: "Deep-Fake", desc: "Creates convincing illusions to confuse the enemy.", hpBonus: 15, atkBonus: 4, spAtkBonus: 10 }
        ]
    },
    { 
        id: 59, name: "Algo-rith", unit: 6, type: "Algorithm", 
        desc: "Automatically sorts and organizes its attacks for maximum efficiency.", 
        hp: 26, baseAtk: 5, specialAtk: "Bubble Sort", specialAtkPower: 15,
        evolutions: [
            { reqXP: 3, name: "Quick-Sort", desc: "Divides and conquers its opponent with blazing speed.", hpBonus: 12, atkBonus: 6, spAtkBonus: 11 }
        ]
    },
    { 
        id: 60, name: "Singularity", unit: 6, type: "Algorithm", 
        desc: "Boss: An omniscient AI that can use any move from any Unit.", 
        hp: 120, baseAtk: 12, specialAtk: "Neural Wipe", specialAtkPower: 30,
        evolutions: []
    },

    // ------------------------------------------
    // STARTERS: Digital Electronics (Mr. V)
    // ------------------------------------------
    { 
        id: 61, name: "Gatesaur", unit: 0, type: "Digital Logic", 
        desc: "Emits logical signals (AND, OR, NOT) to process information.", 
        hp: 30, baseAtk: 6, specialAtk: "NAND Blast", specialAtkPower: 18,
        evolutions: [
            { reqXP: 5, name: "Ivysaur-Gate", desc: "Grew a massive universal gate on its back.", hpBonus: 15, atkBonus: 4, spAtkBonus: 10 },
            { reqXP: 10, name: "Venugate", desc: "Can process millions of logic combinations instantly.", hpBonus: 20, atkBonus: 6, spAtkBonus: 15 }
        ]
    },
    { 
        id: 62, name: "Countertle", unit: 0, type: "Timing", 
        desc: "Increments its internal counter building up power for a massive discharge.", 
        hp: 35, baseAtk: 5, specialAtk: "Flip-Flop Splash", specialAtkPower: 16,
        evolutions: [
            { reqXP: 5, name: "Wartortle-Clock", desc: "Its shell vibrates at exactly 1Hz.", hpBonus: 18, atkBonus: 3, spAtkBonus: 9 },
            { reqXP: 10, name: "Blast-Clock", desc: "Fires massive synchronous timing blasts from its cannons.", hpBonus: 25, atkBonus: 5, spAtkBonus: 12 }
        ]
    },
    { 
        id: 63, name: "Latchander", unit: 0, type: "Digital Logic", 
        desc: "Capable of storing a temporary state to replicate its last attack.", 
        hp: 28, baseAtk: 7, specialAtk: "Memory Burn", specialAtkPower: 20,
        evolutions: [
            { reqXP: 5, name: "Char-Register", desc: "Can store 8-bits of fiery data.", hpBonus: 12, atkBonus: 5, spAtkBonus: 12 },
            { reqXP: 10, name: "Char-RAM", desc: "Unleashes randomized memory addresses as pure fire.", hpBonus: 15, atkBonus: 8, spAtkBonus: 18 }
        ]
    },

    // ------------------------------------------
    // STARTERS: Aerospace Engineering (Mrs. G)
    // ------------------------------------------
    { 
        id: 64, name: "Liftander", unit: 0, type: "Aerodynamics", 
        desc: "Uses its specialized wings to generate powerful wind currents.", 
        hp: 28, baseAtk: 6, specialAtk: "Airfoil Slice", specialAtkPower: 18,
        evolutions: [
            { reqXP: 5, name: "Camber-Zard", desc: "Adjusted its wing camber for maximum lift coefficient.", hpBonus: 14, atkBonus: 5, spAtkBonus: 11 },
            { reqXP: 10, name: "Mach-Zard", desc: "Breaks the sound barrier with every strike.", hpBonus: 18, atkBonus: 7, spAtkBonus: 16 }
        ]
    },
    { 
        id: 65, name: "Propellite", unit: 0, type: "Propulsion", 
        desc: "Launches high-speed energy blasts powered by its jet engine.", 
        hp: 30, baseAtk: 5, specialAtk: "Thrust Vector", specialAtkPower: 17,
        evolutions: [
            { reqXP: 5, name: "Turbofan", desc: "A highly efficient creature that never runs out of energy.", hpBonus: 16, atkBonus: 4, spAtkBonus: 10 },
            { reqXP: 10, name: "Scramjet", desc: "Achieves hypersonic speeds before the opponent can blink.", hpBonus: 22, atkBonus: 6, spAtkBonus: 15 }
        ]
    },
    { 
        id: 66, name: "Turburtle", unit: 0, type: "Aerodynamics", 
        desc: "Rotates at incredible speeds to create a powerful vortex.", 
        hp: 35, baseAtk: 4, specialAtk: "Drag Reduction", specialAtkPower: 15,
        evolutions: [
            { reqXP: 5, name: "Slip-Stream", desc: "Creates a low-pressure zone to pull enemies in.", hpBonus: 20, atkBonus: 3, spAtkBonus: 8 },
            { reqXP: 10, name: "Aero-Shell", desc: "A perfectly streamlined tank that takes zero drag damage.", hpBonus: 30, atkBonus: 4, spAtkBonus: 12 }
        ]
    }
];
