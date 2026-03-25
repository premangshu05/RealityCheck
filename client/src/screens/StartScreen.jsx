import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export const StartScreen = ({ dispatch, state }) => {
  const [level, setLevel] = useState(1);
  const { isAuthenticated, user } = state;

  const handleStart = () => {
    if (!isAuthenticated) return;
    dispatch({ type: 'SET_LEVEL', payload: level });
    dispatch({ type: 'START_GAME' });
  };

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    dispatch({ type: 'LOGIN', payload: decoded });
  };

  return (
    <div className="glass-panel splash-content">
      <h1>RealityCheck</h1>
      <h2>Simulate human detection parameters.</h2>
      
      {!isAuthenticated ? (
        <div className="auth-barrier" style={{margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <p style={{color: 'var(--accent)', fontWeight: 800, letterSpacing: '2px'}}>IDENTITY VERIFICATION REQUIRED</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log('Login Failed')}
            theme="filled_black"
            shape="pill"
          />
        </div>
      ) : (
        <div className="user-profile" style={{margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 20px', background: 'rgba(0,255,170,0.05)', borderRadius: '12px', border: '1px solid var(--accent-soft)'}}>
           <img src={user.picture} alt="profile" style={{width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--accent)'}} />
           <div style={{textAlign: 'left'}}>
             <div style={{fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 700}}>OPERATOR: {user.name.toUpperCase()}</div>
             <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>STATUS: AUTHENTICATED</div>
           </div>
        </div>
      )}

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
      </div>

      <button 
        className={`primary ${!isAuthenticated ? 'disabled' : ''}`} 
        onClick={handleStart} 
        disabled={!isAuthenticated}
        style={{width: '100%', padding: '18px', fontSize: '1.2rem', marginTop: '20px', opacity: isAuthenticated ? 1 : 0.5}}
      >
        {isAuthenticated ? 'INITIALIZE SEQUENCE' : 'LOCKED: AWAITING CREDENTIALS'}
      </button>
    </div>
  );
};
