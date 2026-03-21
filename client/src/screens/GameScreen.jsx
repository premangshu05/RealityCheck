import React, { useEffect } from 'react';
import { Timer } from '../components/Timer';
import { playSound } from '../engine/soundEngine';

export const GameScreen = ({ state, dispatch }) => {
  const { status, round, score, timeLeft, content, confidence, correctIndex } = state;

  useEffect(() => {
    if (status === 'LOADING') playSound('paper');
  }, [status]);

  useEffect(() => {
    if (status === 'PLAYING' && timeLeft <= 5 && timeLeft > 0) playSound('heartbeat');
  }, [timeLeft, status]);

  const handleSelect = (idx) => {
    if (status !== 'PLAYING') return;
    if (idx === correctIndex) playSound('correct');
    else playSound('wrong');
    dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: idx } });
  };

  const isAnswered = status === 'ANSWERED';
  const lastHistory = state.history[state.history.length-1];
  
  const cardColors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];

  return (
    <div style={{ animation: status === 'PLAYING' ? 'fadeIn 0.5s ease-out' : 'none' }}>
      
      <div className="game-header" style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '1.5rem 2rem'}}>
        <div className="stat-group">
          <span className="stat-label" style={{color: '#93c5fd'}}>Phase</span>
          <span className="stat-val">0{round}</span>
        </div>
        
        {(status === 'PLAYING' || isAnswered || status === 'NEXT') && (
          <Timer timeLeft={timeLeft} status={status} dispatch={dispatch} />
        )}

        <div className="stat-group" style={{ alignItems: 'flex-end' }}>
          <span className="stat-label" style={{color: '#93c5fd'}}>Score</span>
          <span className="stat-val" style={{color: '#60a5fa'}}>{score}</span>
        </div>
      </div>
      
      {status === 'LOADING' && (
        <div className="glass-panel splash-content" style={{ marginTop: '2rem' }}>
          <h2 style={{color: '#8b5cf6'}}>Intercepting Transmissions...</h2>
        </div>
      )}
      
      {(status === 'PLAYING' || isAnswered || status === 'NEXT') && (
        <>
          <h2 style={{textAlign: 'center', marginBottom: '1rem', color: '#f8fafc', letterSpacing: '2px', fontSize: '1.5rem', background: 'var(--glass-bg)', padding: '15px', borderRadius: '8px', border: '1px solid var(--glass-border)'}}>
            TARGET: SPOT THE HUMAN (3 AI, 1 HUMAN)
          </h2>
          <div className="cards-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
            {content.map((text, idx) => {
              let classes = 'game-card';
              if (status !== 'PLAYING') classes += ' disabled';
              if (isAnswered && correctIndex === idx) classes += ' selected-correct';
              if (isAnswered && correctIndex !== idx && lastHistory && !lastHistory.isCorrect) classes += ' selected-wrong';

              return (
                <div 
                  key={idx} 
                  onClick={() => handleSelect(idx)} 
                  className={classes}
                  style={{
                    borderLeft: `4px solid ${cardColors[idx]}`,
                    boxShadow: status === 'PLAYING' ? `0 4px 20px ${cardColors[idx]}15` : 'none'
                  }}
                >
                  {text}
                </div>
              );
            })}
          </div>

          <div className="confidence-module" style={{background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)'}}>
            <div className="confidence-header">
              <span style={{color: '#fbbf24'}}>Confidence Overlay</span>
              <span className="stat-val">{confidence}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={confidence}
              disabled={status !== 'PLAYING'}
              onChange={(e) => dispatch({ type: 'SET_CONFIDENCE', payload: parseInt(e.target.value) })}
            />
          </div>

          {isAnswered && (
            <div className={`round-result ${lastHistory?.isCorrect ? 'correct' : 'wrong'}`}>
              <h3>{lastHistory?.isCorrect ? 'HUMAN DETECTED successfully.' : 'WRONG. THAT WAS AN AI.'}</h3>
              
              {state.round >= 5 ? (
                <button className="primary" onClick={() => dispatch({ type: 'END_GAME' })}>Compile Report</button>
              ) : (
                <button className="primary" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Proceed to Next Phase</button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
