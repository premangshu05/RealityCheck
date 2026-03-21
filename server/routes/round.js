const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { generateAIText } = require('../ai/generateText');
const { getDifficultyConfig } = require('../engine/difficultyEngine');

const CATEGORIES = ['reviews', 'tweets', 'jobs', 'headlines'];

router.get('/', async (req, res) => {
  try {
    const level = parseInt(req.query.level) || 1;
    const config = getDifficultyConfig(level);

    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    const dataPath = path.join(__dirname, '..', 'data', `${category}.json`);
    const humanData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Pick 1 Human
    const humanText = humanData[Math.floor(Math.random() * humanData.length)];

    // Generate 3 unique AI inputs by calling Promise multiple times
    const aiPromise1 = generateAIText(category, level, config);
    const aiPromise2 = generateAIText(category, level, config);
    const aiPromise3 = generateAIText(category, level, config);
    
    const [ai1, ai2, ai3] = await Promise.all([aiPromise1, aiPromise2, aiPromise3]);

    const options = [
      { text: humanText, isHuman: true },
      { text: ai1, isHuman: false },
      { text: ai2, isHuman: false },
      { text: ai3, isHuman: false }
    ];

    // Shuffle Array
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Objective is now: "Spot the Human"
    const correctIndex = options.findIndex(opt => opt.isHuman);

    res.json({
      roundId: Date.now(),
      options: options.map(opt => opt.text),
      correctIndex: correctIndex, 
      timer: config.timer,
      category
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
