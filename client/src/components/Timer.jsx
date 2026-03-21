import React, { useEffect } from 'react';

export const Timer = ({ timeLeft, status, dispatch }) => {
  useEffect(() => {
    if (status !== 'PLAYING') return;
    
    // Auto fail if timer hits 0
    if (timeLeft <= 0) {
      dispatch({ type: 'SELECT_ANSWER', payload: { selectedIndex: -1 } }); 
      return;
    }

    const timer = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status, dispatch]);

  return (
    <div>
      <strong>Timer ◉ {timeLeft}s</strong>
    </div>
  );
};
