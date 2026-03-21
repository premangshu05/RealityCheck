import React from 'react';
import { calculateIntelligenceReport } from '../engine/scoringSystem';

export const ReportScreen = ({ state, dispatch }) => {
  const report = calculateIntelligenceReport(state.history);

  if (!report) return <div className="splash-content"><h2>Data Corrupted</h2></div>;

  return (
    <div className="report-panel">
      <h1>Intelligence Report Generated</h1>
      <h2>"{report.label}"</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="stat-label">Final Score</span>
          <span className="stat-val">{state.score}</span>
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
        style={{ padding: '15px 40px', fontSize: '1.2rem' }} 
        onClick={() => dispatch({ type: 'GO_TO_START' })}
      >
        START NEW SESSION
      </button>
    </div>
  );
};
