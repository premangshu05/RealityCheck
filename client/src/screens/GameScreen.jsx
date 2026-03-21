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
          <span className="stat-val" style={{color: 'var(--accent-blue)'}}>{score}</span>
        </div>
      </div>
      
      {status === 'LOADING' && (
        <div className="glass-panel splash-content" style={{ marginTop: '2rem' }}>
          <h2>Intercepting Transmissions...</h2>
        </div>
      )}
      
      {(status === 'PLAYING' || isAnswered || status === 'NEXT') && (
        <>
          <div className="cards-grid">
            {content.map((text, idx) => {
              let classes = 'game-card';
              if (status !== 'PLAYING') classes += ' disabled';
              if (isAnswered && correctIndex === idx) classes += ' selected-correct';
              if (isAnswered && lastHistory && !lastHistory.isCorrect && lastHistory.selectedIndex === idx) classes += ' selected-wrong';
              // Actually lastHistory doesn't store selectedIndex natively, we can use a workaround:
              // if it's not correctIndex and the user got it wrong, it means they clicked the OTHER one.
              if (isAnswered && correctIndex !== idx && lastHistory && !lastHistory.isCorrect) classes += ' selected-wrong';

              return (
                <div key={idx} onClick={() => handleSelect(idx)} className={classes}>
                  {text}
                </div>
              );
            })}
          </div>

          <div className="confidence-module">
            <div className="confidence-header">
              <span>Confidence Overlay</span>
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
              <h3>{lastHistory?.isCorrect ? 'SYNTHETIC DETECTION CONFIRMED' : 'HUMAN FALSE POSITIVE'}</h3>
              
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
