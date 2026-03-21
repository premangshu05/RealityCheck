import React from 'react';

export const ReportScreen = ({ state, dispatch }) => {
  const correctCount = state.history.filter(h => h.isCorrect).length;
  const accuracy = Math.round((correctCount / state.history.length) * 100) || 0;

  let label = "Average Human";
  if (accuracy > 80) label = "AI Resistant Mind";
  else if (accuracy < 40) label = "Easily Fooled Human";

  return (
    <div>
      <h1>Intelligence Report</h1>
      <h2 style={{ color: 'olive' }}>{label}</h2>
      
      <div style={{ marginTop: '2rem' }}>
        <p><strong>Final Score:</strong> {state.score}</p>
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Rounds Played:</strong> {state.history.length}</p>
      </div>
      
      <button style={{ marginTop: '2rem' }} onClick={() => dispatch({ type: 'START_GAME' })}>
        Play Again
      </button>
    </div>
  );
};
