import React, { useEffect, useRef } from 'react';
import { Timer } from '../components/Timer';
import { playSound } from '../engine/soundEngine';

export const GameScreen = ({ state, dispatch }) => {
  const { status, round, score, timeLeft, content, confidence, correctIndex } = state;

  useEffect(() => {
    if (status === 'LOADING') {
      playSound('paper'); // or when playing
    }
  }, [status]);

  useEffect(() => {
    if (status === 'PLAYING' && timeLeft <= 5 && timeLeft > 0) {
      playSound('heartbeat');
    }
  }, [timeLeft, status]);

  const handleSelect = (idx) => {
    if (status !== 'PLAYING') return;
    
    if (idx === correctIndex) {
        playSound('correct');
    } else {
        playSound('wrong');
    }

    dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: idx } });
  };

  const isPressure = timeLeft <= 5 && status === 'PLAYING';

  return (
    <div className={status === 'PLAYING' ? 'paper-flip-enter' : ''}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem' }}>
        <strong>Round {round}</strong>
        <strong className={isPressure ? 'pressure-blur' : ''} style={{ fontSize: '1.4rem' }}>Score {score}</strong>
      </div>
      
      {status === 'LOADING' && <div style={{ textAlign: 'center', padding: '40px' }}><p>Fetching Quantum Scenario...</p></div>}
      
      {(status === 'PLAYING' || status === 'ANSWERED' || status === 'NEXT') && (
        <>
          <Timer timeLeft={timeLeft} status={status} dispatch={dispatch} />

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {content.map((text, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSelect(idx)}
                className={`game-card ${status !== 'PLAYING' ? 'disabled' : ''}`}
                style={{ opacity: status === 'ANSWERED' && correctIndex !== idx ? 0.3 : 1 }}
              >
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold' }}>
              Confidence Slider: {confidence}% 
              <span style={{ fontSize: '0.9em', fontWeight: 'normal', color: 'var(--action-orange)', marginLeft: '10px' }}>
                (High risk = High reward)
              </span>
            </label>
            <input 
              type="range" 
              min="0" max="100" 
              value={confidence}
              disabled={status !== 'PLAYING'}
              onChange={(e) => dispatch({ type: 'SET_CONFIDENCE', payload: parseInt(e.target.value) })}
            />
          </div>

          {status === 'ANSWERED' && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(93, 103, 80, 0.1)', borderRadius: '4px', borderLeft: `4px solid ${state.history[state.history.length-1]?.isCorrect ? 'var(--hover-olive)' : 'var(--action-orange)'}` }}>
              <h3>{state.history[state.history.length-1]?.isCorrect ? 'Correct! AI detected.' : 'Fooled. That was human.'}</h3>
              
              {state.round >= 5 ? (
                <button style={{ marginTop: '10px' }} onClick={() => dispatch({ type: 'END_GAME' })}>Generate Intelligence Report</button>
              ) : (
                <button style={{ marginTop: '10px' }} onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Scenario</button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
