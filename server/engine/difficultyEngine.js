function getDifficultyConfig(level){
  return {
    timer: 15,
    aiRealism: level * 0.2,
    textLength: 20 + level * 10,
    trickRoundChance: level * 0.08
  }
}

module.exports = { getDifficultyConfig };
