import React, { useEffect } from 'react';

export const Timer = ({ timeLeft, status, dispatch }) => {
  useEffect(() => {
    if (status !== 'PLAYING') return;
    
    if (timeLeft <= 0) {
      dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: -1 } }); 
      return;
    }

    const timer = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status, dispatch]);

  const isPressure = timeLeft <= 5;

  return (
    <div className={`timer-container ${isPressure ? 'pressure-blur' : ''}`}>
      <div className="timer-ring"></div>
      <strong style={{ color: isPressure ? 'var(--action-orange)' : 'inherit' }}>{timeLeft}s remaining</strong>
    </div>
  );
};
