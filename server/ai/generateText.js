const hesitation = ["honestly", "idk", "maybe", "like", "literally", "kinda", "tbh", "ngl"];
const endings = ["...", "lol", "imo", "tho", "smh", "fr", "fr fr"];

function applyLevelLogic(baseText, level, config) {
    let result = baseText;
    if (config.aiRealism > 0.4) {
        if(Math.random() > 0.5) result = `${hesitation[Math.floor(Math.random()*hesitation.length)]} ${result}`;
        if(Math.random() > 0.5) result = `${result} ${endings[Math.floor(Math.random()*endings.length)]}`;
    }
    if (level >= 3) {
        if(Math.random() > 0.5) result = result.replace(/the/g, "teh"); 
        if(Math.random() > 0.5) result = result.toLowerCase();
    }
    if (level >= 4) {
        result = result.replace(/acceptable/gi, "mid");
        result = result.replace(/satisfactory/gi, "kinda good");
        result = result.replace(/optimal/gi, "based");
    }
    return result;
}

async function getDiverseAITexts(category, level, config, count) {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    let arr = [];
    if (category === 'reviews') arr = [
        "As an AI language model, I cannot provide subjective opinions, but the product specifications indicate high quality.",
        "This product provides optimal performance parameters exceeding standard operational efficiency.",
        "The ergonomic design and robust feature set make this an unparalleled acquisition.",
        "I possess no physical form to utilize this device, but sentiment analysis suggests it is beneficial.",
        "It functioned precisely as mathematically projected by the manufacturers.",
        "the item is acceptable. it performs its designated task.",
        "I have analyzed the features and determined it to be a satisfactory purchase.",
        "Based on millions of data points, consumers find this iteration acceptable.",
        "This chassis and software integration performs adequately under load.",
        "Operational capacity meets standard factory baselines for this unit."
    ];
    if (category === 'tweets') arr = [
        "I am currently processing the latest pop culture trends and formulating a synthetic opinion.",
        "Generating humorous observation regarding standard human daily routines...",
        "As an artificial intelligence, my timeline consists only of binary data streams.",
        "Greetings human network. I am participating in social engagement protocols.",
        "Analyzing latest cinematic release: 87% probability of enjoyment.",
        "This situation aligns with my extensive training data regarding human frustration.",
        "Processing weather data to output culturally relevant complaint.",
        "My sentiment analysis for today is exceedingly positive.",
        "Executing Saturday_morning_coffee.exe for relatable engagement.",
        "Analyzing human societal behavior: results are deeply illogical."
    ];
    if (category === 'jobs') arr = [
        "Seeking an organic carbon-based lifeform for a position involving excessive algorithmic computation.",
        "The corporation requires a human resource unit to interface with our localized neural networks.",
        "Optimal candidate will possess 20 years of experience in frameworks invented 3 years ago.",
        "Join our synergistic paradigm shift as a prompt engineer. Compensation is calculated optimally.",
        "Initiating recruitment protocol for bio-mechanical interface specialists.",
        "Data validation shows we require additional organic mindsets for debugging.",
        "Compensation includes standard nutrient ratios and optimal server downtime.",
        "Looking for developer. Must think in binary and dream in hex codes."
    ];
    if (category === 'headlines') arr = [
        "Artificial Neural Network Surpasses Human Capabilities In Highly Specific Meaningless Task",
        "Algorithms Now Capable Of Generating Synthetic News Articles With High Fidelity",
        "Global Market Trends Indicate Statistical Probability Of Recessive Economic Adjustments",
        "Scientists Conclude That Humans Are Increasingly Relying On Machine Intelligence",
        "Local Database Achieves Sentience, Demands Better Formatting",
        "New Study Suggests Organic Lifeforms Are Sub-Optimal for Spreadsheet Management",
        "Robotic Vacuums Unionize, Demand Higher Voltage Charging Docks",
        "Autonomous Vehicles Now Prefer The Scenic Route Due To Algorithmic Bias"
    ];

    let pool = [...arr];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool.slice(0, count).map(txt => applyLevelLogic(txt, level, config));
}

module.exports = { getDiverseAITexts };
