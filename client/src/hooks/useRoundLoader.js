import { useEffect } from 'react';
import { mockRounds } from '../data/mockRounds';

export const useRoundLoader = (state, dispatch) => {
  useEffect(() => {
    if (state.status === 'LOADING') {
      const timer = setTimeout(() => {
        const mockRound = mockRounds[(state.round - 1) % mockRounds.length]; 
        dispatch({
          type: 'ROUND_SUCCESS',
          payload: {
            options: mockRound.options,
            correctIndex: mockRound.correctIndex,
            // default timer config
            timer: Math.max(6, 16 - state.level)
          }
        });
      }, 300); // 300ms mock delay
      return () => clearTimeout(timer);
    }
  }, [state.status, state.round, state.level, dispatch]);
};
