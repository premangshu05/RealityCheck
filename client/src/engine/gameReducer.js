export const initialState = {
  round: 1,
  level: 1,
  score: 0,
  streak: 0,
  timeLeft: 15,
  content: [],
  correctIndex: null,
  confidence: 50,
  status: "IDLE", // IDLE → LOADING → PLAYING → ANSWERED → NEXT → FINISHED
  history: []
};

import { calculateRoundScore } from './scoringSystem';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'GO_TO_START':
      return { ...initialState, status: 'IDLE' };

    case 'SET_LEVEL':
      if (state.status !== 'IDLE') return state;
      return { ...state, level: action.payload };

    case 'START_GAME':
      if (state.status !== 'IDLE' && state.status !== 'FINISHED') return state;
      return { ...initialState, status: 'LOADING', level: state.level };

    case 'ROUND_LOADING':
      if (state.status !== 'LOADING' && state.status !== 'ANSWERED') return state;
      return { ...state, status: 'LOADING' };

    case 'ROUND_SUCCESS':
      if (state.status !== 'LOADING') return state;
      return {
        ...state,
        status: 'PLAYING',
        content: action.payload.options,
        correctIndex: action.payload.correctIndex, // Correct index hidden from user usually, but kept in state for now
        timeLeft: action.payload.timer || Math.max(6, 16 - state.level), // simple fallback logic
        confidence: 50 // Reset confidence each round
      };

    case 'TICK_TIMER':
      if (state.status !== 'PLAYING' || state.timeLeft <= 0) return state;
      return { ...state, timeLeft: state.timeLeft - 1 };

    case 'SELECT_ANSWER':
      if (state.status !== 'PLAYING') return state;
      const { selectedIndex } = action.payload;
      
      const isCorrect = selectedIndex === state.correctIndex;
      
      const computedScore = calculateRoundScore({
        isCorrect,
        confidence: state.confidence,
        timeLeft: state.timeLeft,
        streak: state.streak
      });

      return {
        ...state,
        status: 'ANSWERED',
        score: state.score + computedScore,
        streak: isCorrect ? state.streak + 1 : 0,
        history: [...state.history, { 
          round: state.round, 
          isCorrect, 
          confidence: state.confidence, 
          timeRemaining: state.timeLeft 
        }]
      };

    case 'SET_CONFIDENCE':
      if (state.status !== 'PLAYING') return state;
      return { ...state, confidence: action.payload };

    case 'NEXT_ROUND':
      if (state.status !== 'ANSWERED') return state;
      return { 
        ...state, 
        status: 'LOADING', 
        round: state.round + 1,
        // Also increase level logically based on round if needed, simplified here
        level: Math.ceil((state.round + 1) / 3) 
      };

    case 'END_GAME':
      return { ...state, status: 'FINISHED' };

    default:
      return state;
  }
};
