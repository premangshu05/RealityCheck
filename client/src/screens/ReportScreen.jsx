import React from 'react';
import { calculateIntelligenceReport } from '../engine/scoringSystem';

export const ReportScreen = ({ state, dispatch }) => {
  const report = calculateIntelligenceReport(state.history);

  if (!report) return <div>No data available</div>;

  return (
    <div>
      <h1>Intelligence Report</h1>
      <h2 style={{ color: 'olive' }}>"{report.label}"</h2>
      
      <div style={{ marginTop: '2rem', background: '#f5f5f5', padding: '2rem', color: '#333' }}>
        <p><strong>Final Score:</strong> {state.score}</p>
        <p><strong>Accuracy:</strong> {report.accuracy}%</p>
        <p><strong>Avg Reaction Time:</strong> {report.avgReactionTime}s</p>
        <p><strong>Risk Appetite Score:</strong> {report.riskAppetiteScore}/100</p>
        <p><strong>Rounds Played:</strong> {state.history.length}</p>
      </div>
      
      <button 
        style={{ marginTop: '2rem', padding: '15px 30px', cursor: 'pointer', background: '#c85a17', color: 'white', border: 'none' }} 
        onClick={() => dispatch({ type: 'START_GAME' })}
      >
        Play Again
      </button>
    </div>
  );
};
