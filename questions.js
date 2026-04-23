// ==========================================
// QUESTION BANK DATA
// ==========================================

const questionBank = {
    1: [ // Unit 1: Mechanisms
        {
            q: "Which class of lever always has the fulcrum located between the effort and resistance forces?",
            options: ["Second-class", "First-class", "Third-class", "Fourth-class"],
            ans: 1
        },
        {
            q: "A wheelbarrow is a classic example of which type of lever?",
            options: ["First-class", "Second-class", "Third-class", "It is not a lever"],
            ans: 1
        },
        {
            q: "What is the Ideal Mechanical Advantage (IMA) of a third-class lever?",
            options: ["Always greater than 1", "Exactly 1", "Always less than 1", "Equal to the AMA"],
            ans: 2
        },
        {
            q: "If a lever has an effort arm of 12 ft and a resistance arm of 3 ft, what is its Ideal Mechanical Advantage (IMA)?",
            options: ["0.25", "9", "36", "4"],
            ans: 3
        },
        {
            q: "A machine lifts a 100 lb resistance force using only 25 lbs of effort force. What is the Actual Mechanical Advantage (AMA)?",
            options: ["4", "0.25", "125", "75"],
            ans: 0
        },
        {
            q: "On a wheel and axle, the wheel has a diameter of 20 inches and the axle has a diameter of 5 inches. If the effort is applied to the wheel, what is the IMA?",
            options: ["0.25", "4", "15", "100"],
            ans: 1
        },
        {
            q: "What is a pulley system containing both fixed and movable pulleys called?",
            options: ["Block and tackle", "Compound gear", "Sprocket array", "Static block"],
            ans: 0
        },
        {
            q: "If a pulley system has 5 supporting strands of rope holding up the load, what is its IMA?",
            options: ["10", "2.5", "5", "1"],
            ans: 2
        },
        {
            q: "How much effort force is required to lift a 200 lb weight using a pulley system with an IMA of 4? (Assuming 100% efficiency)",
            options: ["50 lbs", "800 lbs", "100 lbs", "400 lbs"],
            ans: 0
        },
        {
            q: "Which formula correctly represents Work?",
            options: ["Work = Force / Distance", "Work = Mass x Acceleration", "Work = Force x Distance", "Work = Power / Time"],
            ans: 2
        },
        {
            q: "How much work is done if a student uses 20 lbs of force to push a box 10 feet across the classroom?",
            options: ["200 ft-lbs", "2 ft-lbs", "30 ft-lbs", "10 ft-lbs"],
            ans: 0
        },
        {
            q: "Which term is defined as the rate at which work is done?",
            options: ["Torque", "Efficiency", "Momentum", "Power"],
            ans: 3
        },
        {
            q: "An inclined plane is 15 feet long and 3 feet high. What is its IMA?",
            options: ["45", "5", "12", "0.2"],
            ans: 1
        },
        {
            q: "A wedge has a length of 8 inches and a thickness of 2 inches. What is its IMA?",
            options: ["4", "16", "0.25", "10"],
            ans: 0
        },
        {
            q: "How does thread pitch affect the mechanical advantage of a screw?",
            options: ["Fewer threads per inch increases IMA", "More threads per inch increases IMA", "Thread pitch does not affect IMA", "More threads per inch decreases IMA"],
            ans: 1
        },
        {
            q: "If a screw has 16 threads per inch (16 TPI), what is its pitch?",
            options: ["16 inches", "0.16 inches", "1/16 of an inch", "1.6 inches"],
            ans: 2
        },
        {
            q: "In a simple gear train, the drive gear has 10 teeth and the driven gear has 40 teeth. What is the gear ratio?",
            options: ["4:1", "1:4", "400:1", "30:1"],
            ans: 0
        },
        {
            q: "If a gear train has a gear ratio greater than 1, what is the effect on the output?",
            options: ["Torque increases, speed decreases", "Torque decreases, speed increases", "Both torque and speed increase", "Both torque and speed decrease"],
            ans: 0
        },
        {
            q: "What is the primary purpose of an idler gear in a simple gear train?",
            options: ["To increase torque", "To change the direction of rotation", "To increase speed", "To change the overall gear ratio"],
            ans: 1
        },
        {
            q: "In a compound gear train, Gear A (10T) drives Gear B (20T). Gear B shares a shaft with Gear C (10T). Gear C drives Gear D (30T). What is the total gear ratio?",
            options: ["6:1", "5:1", "60:1", "1:6"],
            ans: 0
        },
        {
            q: "Which mechanism transmits power over a distance using a chain?",
            options: ["Belt and pulley", "Sprocket and chain", "Rack and pinion", "Cam and follower"],
            ans: 1
        },
        {
            q: "Unlike a sprocket and chain, a belt and pulley system can...",
            options: ["Reverse directions without an idler", "Slip under heavy loads", "Only be used for linear motion", "Produce infinite torque"],
            ans: 1
        },
        {
            q: "Which formula calculates the efficiency of a machine?",
            options: ["(IMA / AMA) * 100", "(Work In / Work Out) * 100", "(AMA / IMA) * 100", "(Force / Area) * 100"],
            ans: 2
        },
        {
            q: "Why is the Actual Mechanical Advantage (AMA) always less than the Ideal Mechanical Advantage (IMA) in the real world?",
            options: ["Gravity", "Friction", "Loss of mass", "Excessive torque"],
            ans: 1
        },
        {
            q: "Torque is a measure of...",
            options: ["Linear push or pull", "The rate of doing work", "Energy stored in a spring", "Rotational force"],
            ans: 3
        },
        {
            q: "For a lever to be in static equilibrium, what must be true?",
            options: ["Effort Moment = Resistance Moment", "Effort Force = Resistance Force", "Effort Arm = Resistance Arm", "IMA = 1"],
            ans: 0
        },
        {
            q: "Which mechanism converts rotary motion into linear motion?",
            options: ["Bevel gears", "Rack and pinion", "Worm and wheel", "Universal joint"],
            ans: 1
        },
        {
            q: "Which mechanism converts rotary motion into reciprocating (back and forth) motion?",
            options: ["Cam and follower", "Block and tackle", "Lead screw", "Crown and pinion"],
            ans: 0
        },
        {
            q: "What is the gear ratio of a worm and wheel if the wheel has 24 teeth and the worm has a single thread?",
            options: ["1:24", "12:1", "24:1", "48:1"],
            ans: 2
        },
        {
            q: "A mechanism is best defined as a device that...",
            options: ["Creates energy from nothing", "Generates electricity for circuits", "Transmits power or modifies force/motion", "Stores potential energy indefinitely"],
            ans: 2
        }
    ],
    // Placeholders for future units so the engine doesn't break
    2: [], 
    3: [], 
    4: [], 
    5: [], 
    6: []
};
