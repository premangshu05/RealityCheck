import React, { useReducer } from 'react';
import { gameReducer, initialState } from './engine/gameReducer';
import { useRoundLoader } from './hooks/useRoundLoader';
import { StartScreen } from './screens/StartScreen';
import { GameScreen } from './screens/GameScreen';
import { ReportScreen } from './screens/ReportScreen';
import './App.css';

const FloatingEmojis = () => {
    // Generate deterministic array for fun black background
    const emojis = React.useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        icon: i % 2 === 0 ? '🤖' : '🧑‍💻',
        left: `${(i * 4) + (Math.random()*2)}vw`,
        animationDuration: `${12 + Math.random() * 20}s`,
        animationDelay: `-${Math.random() * 25}s`,
        fontSize: `${2 + Math.random() * 2}rem`,
        opacity: 0.05 + (Math.random() * 0.1)
    })), []);
    return (
        <div className="bg-animation">
            {emojis.map(e => (
                <div key={e.id} className="floating-emoji" style={{
                    left: e.left, 
                    animationDuration: e.animationDuration, 
                    animationDelay: e.animationDelay,
                    fontSize: e.fontSize,
                    opacity: e.opacity
                }}>
                    {e.icon}
                </div>
            ))}
        </div>
    );
};

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  useRoundLoader(state, dispatch);

  return (
    <>
      <div className="feedback-overlay" id="feedback-overlay"></div>
      <FloatingEmojis />
      <div className="app-container" data-round={state.round} data-status={state.status}>
        {state.status === 'IDLE' && <StartScreen dispatch={dispatch} state={state} />}
        
        {(state.status === 'LOADING' || state.status === 'PLAYING' || state.status === 'ANSWERED' || state.status === 'NEXT') && (
          <GameScreen state={state} dispatch={dispatch} />
        )}
        
        {state.status === 'FINISHED' && <ReportScreen state={state} dispatch={dispatch} />}
      </div>
    </>
  );
}

export default App;
