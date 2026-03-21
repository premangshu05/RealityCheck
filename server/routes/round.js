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
    const humanText = humanData[Math.floor(Math.random() * humanData.length)];

    const aiText = await generateAIText(category, level, config);

    let isTrickRound = Math.random() < config.trickRoundChance;
    let optionA, optionB;
    
    if (isTrickRound) {
        const humanText2 = humanData[Math.floor(Math.random() * humanData.length)];
        optionA = { text: humanText, isAI: false };
        optionB = { text: humanText2, isAI: false };
    } else {
        optionA = { text: humanText, isAI: false };
        optionB = { text: aiText, isAI: true };
    }

    const options = Math.random() < 0.5 ? [optionA, optionB] : [optionB, optionA];
    
    const correctIndex = options.findIndex(opt => opt.isAI);

    res.json({
      roundId: Date.now(),
      options: options.map(opt => opt.text),
      correctIndex: correctIndex !== -1 ? correctIndex : 0, 
      timer: config.timer,
      category
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
