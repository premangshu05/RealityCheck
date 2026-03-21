import React, { useReducer } from 'react';
import { gameReducer, initialState } from './engine/gameReducer';
import { useRoundLoader } from './hooks/useRoundLoader';
import { StartScreen } from './screens/StartScreen';
import { GameScreen } from './screens/GameScreen';
import { ReportScreen } from './screens/ReportScreen';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  useRoundLoader(state, dispatch);

  return (
    <div className="app-container" style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      {state.status === 'IDLE' && <StartScreen dispatch={dispatch} />}
      
      {(state.status === 'LOADING' || state.status === 'PLAYING' || state.status === 'ANSWERED' || state.status === 'NEXT') && (
        <GameScreen state={state} dispatch={dispatch} />
      )}
      
      {state.status === 'FINISHED' && <ReportScreen state={state} dispatch={dispatch} />}
    </div>
  );
}

export default App;
