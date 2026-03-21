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
    
    const isCorrect = idx === correctIndex;
    if (isCorrect) {
      playSound('correct');
      document.body.classList.add('blink-correct');
      setTimeout(() => document.body.classList.remove('blink-correct'), 600);
    } else {
      playSound('wrong');
      document.body.classList.add('blink-wrong');
      setTimeout(() => document.body.classList.remove('blink-wrong'), 600);
    }
    
    dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: idx } });
  };

  const isAnswered = status === 'ANSWERED';
  const lastHistory = state.history[state.history.length-1];

  return (
    <div style={{ animation: status === 'PLAYING' ? 'fadeIn 0.5s ease-out' : 'none' }}>
      
      <div className="game-header">
        <div className="stat-group">
          <span className="stat-label">Phase</span>
          <span className="stat-val">0{round}</span>
        </div>
        
        {(status === 'PLAYING' || isAnswered || status === 'NEXT') && (
          <Timer timeLeft={timeLeft} status={status} dispatch={dispatch} />
        )}

        <div className="stat-group" style={{ alignItems: 'flex-end' }}>
          <span className="stat-label">Score</span>
          <span className="stat-val">{score}</span>
        </div>
      </div>
      
      {status === 'LOADING' && (
        <div className="splash-content" style={{ marginTop: '4rem' }}>
          <h2 style={{color: 'var(--accent)'}}>Intercepting Transmissions...</h2>
        </div>
      )}
      
      {(status === 'PLAYING' || isAnswered || status === 'NEXT') && (
        <>
          <div className="cards-grid">
            {content.map((text, idx) => {
              let classes = 'game-card';
              if (status !== 'PLAYING') classes += ' disabled';
              if (isAnswered && correctIndex === idx) classes += ' selected-correct';
              if (isAnswered && correctIndex !== idx && lastHistory && !lastHistory.isCorrect && lastHistory.selectedIndex === idx) classes += ' selected-wrong';

              return (
                <div key={idx} onClick={() => handleSelect(idx)} className={classes}>
                  {text}
                </div>
              );
            })}
          </div>

          <div className="confidence-module">
            <div className="confidence-header">
              <span style={{color: 'var(--accent)', fontWeight: 600}}>Confidence Overlay</span>
              <span className="stat-val" style={{fontSize: '1.2rem'}}>{confidence}%</span>
            </div>
            <input 
              type="range" min="0" max="100" 
              value={confidence}
              disabled={status !== 'PLAYING'}
              onChange={(e) => dispatch({ type: 'SET_CONFIDENCE', payload: parseInt(e.target.value) })}
            />
          </div>

          {isAnswered && (
            <div className={`result-banner ${lastHistory?.isCorrect ? 'correct' : 'wrong'}`}>
              <h3>{lastHistory?.isCorrect ? 'HUMAN DETECTED successfully.' : 'WRONG. THAT WAS AN AI.'}</h3>
              
              {state.round >= 5 ? (
                <button className="primary" onClick={() => dispatch({ type: 'END_GAME' })}>COMPILE REPORT</button>
              ) : (
                <button className="primary" onClick={() => dispatch({ type: 'NEXT_ROUND' })}>PROCEED TO NEXT PHASE</button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
