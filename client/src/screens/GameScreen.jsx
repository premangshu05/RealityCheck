import React from 'react';
import { Timer } from '../components/Timer';

export const GameScreen = ({ state, dispatch }) => {
  const { status, round, score, timeLeft, content, confidence } = state;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <strong>Round {round}</strong>
        <strong>Score {score}</strong>
      </div>
      
      {status === 'LOADING' && <div><p>Loading psychological scenario...</p></div>}
      
      {(status === 'PLAYING' || status === 'ANSWERED' || status === 'NEXT') && (
        <>
          <Timer timeLeft={timeLeft} status={status} dispatch={dispatch} />

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {content.map((text, idx) => (
              <div 
                key={idx} 
                onClick={() => status === 'PLAYING' && dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: idx } })}
                style={{ 
                  flex: 1, 
                  padding: '2rem', 
                  border: '1px solid #ccc', 
                  cursor: status === 'PLAYING' ? 'pointer' : 'default',
                  opacity: status === 'ANSWERED' && state.correctIndex !== idx ? 0.5 : 1
                }}
              >
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              Confidence Slider: {confidence}% (Risk/Reward multiplier)
            </label>
            <input 
              type="range" 
              min="0" max="100" 
              value={confidence}
              disabled={status !== 'PLAYING'}
              onChange={(e) => dispatch({ type: 'SET_CONFIDENCE', payload: parseInt(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>

          {status === 'ANSWERED' && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#eee' }}>
              <h3>{state.history[state.history.length-1]?.isCorrect ? 'Correct! + Points Addictive Loop' : 'Wrong! Heavy Penalty'}</h3>
              
              {state.round >= 5 ? (
                <button onClick={() => dispatch({ type: 'END_GAME' })}>Finish & View Report</button>
              ) : (
                <button onClick={() => dispatch({ type: 'NEXT_ROUND' })}>Next Round</button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
