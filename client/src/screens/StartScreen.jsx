import React from 'react';

export const StartScreen = ({ dispatch }) => {
  return (
    <div>
      <h1>RealityCheck</h1>
      <h2>Test Your AI Awareness</h2>
      <button onClick={() => dispatch({ type: 'START_GAME' })}>
        START
      </button>
    </div>
  );
};
