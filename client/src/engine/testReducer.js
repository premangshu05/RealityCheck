import { gameReducer, initialState } from './gameReducer.js';

let state = gameReducer(initialState, { type: 'START_GAME' });
console.log("✅ Started:", state.status);

for(let i=1; i<=5; i++) {
  state = gameReducer(state, { 
    type: 'ROUND_SUCCESS', 
    payload: { options: ["Option A", "Option B"], correctIndex: 1, timer: 10 } 
  });
  console.log(`✅ Round ${i} Loaded`, state.status, state.timeLeft);
  
  // Try illegal transition (e.g., loading while already playing)
  let badState = gameReducer(state, { type: 'ROUND_SUCCESS' });
  if (badState === state) console.log("   ✅ Illegal transition prevented.");

  // Simulate tick
  state = gameReducer(state, { type: 'TICK_TIMER' });
  console.log(`   Tick:`, state.timeLeft);

  // Set confidence
  state = gameReducer(state, { type: 'SET_CONFIDENCE', payload: 80 });

  // Answer correctly
  state = gameReducer(state, { 
    type: 'SELECT_ANSWER', 
    payload: { selectedIndex: 1 } 
  });
  console.log(`✅ Round ${i} Answered`, state.status, "Score:", state.score, "Streak:", state.streak);

  // Next round
  state = gameReducer(state, { type: 'NEXT_ROUND' });
}

state = gameReducer(state, { type: 'END_GAME' });
console.log("✅ Game Ended", state.status, "Final history:", state.history.length);
