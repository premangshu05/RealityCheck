export const calculateRoundScore = ({ isCorrect, confidence, timeLeft, streak }) => {
  const baseScore = isCorrect ? 100 : -40;
  
  let confidenceBonus = 0;
  if (isCorrect) {
      confidenceBonus = confidence * 0.6;
  } else {
      let wrongPenalty = confidence * 0.5;
      confidenceBonus = -wrongPenalty;
  }
  
  const speedBonus = timeLeft * 4;
  const multiplier = 1 + (streak * 0.15);

  return Math.floor((baseScore + confidenceBonus + speedBonus) * multiplier);
};

export const calculateIntelligenceReport = (history) => {
  if (!history || history.length === 0) return null;

  const correctCount = history.filter(h => h.isCorrect).length;
  const accuracy = Math.round((correctCount / history.length) * 100);
  
  const avgReactionTime = history.reduce((acc, h) => acc + (15 - h.timeRemaining), 0) / history.length;
  const avgConfidence = history.reduce((acc, h) => acc + h.confidence, 0) / history.length;
  
  const riskAppetiteScore = Math.round(avgConfidence);
  
  let label = "Average Human";
  if (accuracy > 80 && avgConfidence < 70) label = "Intuitive Skeptic";
  else if (accuracy < 50 && avgConfidence > 70) label = "Overconfident Guesser";
  else if (accuracy > 80 && avgConfidence >= 70) label = "Pattern Analyzer";
  else if (accuracy < 40) label = "Easily Fooled Human";

  return {
    accuracy,
    avgReactionTime: Math.max(0, avgReactionTime).toFixed(1), // prevent negatives if timer bumped
    riskAppetiteScore,
    label
  };
};
