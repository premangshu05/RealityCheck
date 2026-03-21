const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { getDiverseAITexts } = require('../ai/generateText');
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
    const aiTexts = await getDiverseAITexts(category, level, config, 3); // Fix repetition bug!

    const options = [
      { text: humanText, isHuman: true },
      { text: aiTexts[0], isHuman: false },
      { text: aiTexts[1], isHuman: false },
      { text: aiTexts[2], isHuman: false }
    ];

    // Shuffle options entirely
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    res.json({
      roundId: Date.now(),
      options: options.map(opt => opt.text),
      correctIndex: options.findIndex(opt => opt.isHuman), 
      timer: config.timer,
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
