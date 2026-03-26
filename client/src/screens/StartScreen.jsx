import React, { useState } from 'react';

export const StartScreen = ({ dispatch, state }) => {
  const [level, setLevel] = useState(1);

  const handleStart = () => {
    dispatch({ type: 'SET_LEVEL', payload: level });
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="glass-panel splash-content">
      <img src="/logo.png" alt="RealityCheck Logo" className="app-logo" style={{ width: '120px', marginBottom: '20px' }} />
      <h1>RealityCheck</h1>
      <h2>Simulate human detection parameters.</h2>
      
      <div className="difficulty-selector">
        <label>Select Threat Level:</label>
        <div className="level-buttons">
          {[1, 2, 3, 4, 5].map(lvl => (
            <button 
              key={lvl} 
              className={`level-btn ${level === lvl ? 'active' : ''}`}
              onClick={() => setLevel(lvl)}
            >
              Lvl {lvl}
            </button>
          ))}
        </div>
        <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px'}}>
          Levels 3+ introduce adversarial AI manipulation (trick rounds, linguistic obfuscation).
        </p>
      </div>

      <button className="primary" onClick={handleStart} style={{width: '100%', padding: '18px', fontSize: '1.2rem'}}>
        INITIALIZE SEQUENCE
      </button>
    </div>
  );
};
