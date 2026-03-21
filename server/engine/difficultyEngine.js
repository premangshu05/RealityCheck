function getDifficultyConfig(level){
  return {
    timer: Math.max(6, 16 - level),
    aiRealism: level * 0.2,
    textLength: 20 + level * 10,
    trickRoundChance: level * 0.08
  }
}

module.exports = { getDifficultyConfig };
