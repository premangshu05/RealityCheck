import React from 'react';
import { calculateIntelligenceReport } from '../engine/scoringSystem';

export const ReportScreen = ({ state, dispatch }) => {
  const report = calculateIntelligenceReport(state.history);

  if (!report) return <div className="glass-panel splash-content"><h2>Data Corrupted</h2></div>;

  return (
    <div className="glass-panel report-panel">
      <h1>Intelligence Report Generated</h1>
      <h2>"{report.label}"</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="stat-label">Final Score</span>
          <span className="stat-val" style={{color: 'var(--accent-blue)'}}>{state.score}</span>
        </div>
        <div className="metric-card">
          <span className="stat-label">Accuracy Target</span>
          <span className="stat-val">{report.accuracy}%</span>
        </div>
        <div className="metric-card">
          <span className="stat-label">Avg Response Time</span>
          <span className="stat-val">{report.avgReactionTime}s</span>
        </div>
        <div className="metric-card">
          <span className="stat-label">Risk Appetite Ratio</span>
          <span className="stat-val">{report.riskAppetiteScore}/100</span>
        </div>
      </div>
      
      <button 
        className="primary" 
        style={{ padding: '15px 40px' }} 
        onClick={() => dispatch({ type: 'START_GAME' })}
      >
        RESTART SIMULATION
      </button>
    </div>
  );
};
