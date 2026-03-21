import React, { useEffect } from 'react';

export const Timer = ({ timeLeft, status, dispatch }) => {
  useEffect(() => {
    if (status !== 'PLAYING') return;
    if (timeLeft <= 0) {
      dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: -1 } }); 
      return;
    }
    const timer = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, status, dispatch]);

  const isPressure = timeLeft <= 5;

  return (
    <div className={`timer-container ${isPressure ? 'timer-urgent' : ''}`}>
      <div className="timer-ring"></div>
      <div className="stat-value">{timeLeft}s</div>
      <div className="stat-label" style={{marginLeft: '-5px'}}>Remaining</div>
    </div>
  );
};
