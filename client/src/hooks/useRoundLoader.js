import { useEffect } from 'react';

export const useRoundLoader = (state, dispatch) => {
  useEffect(() => {
    if (state.status === 'LOADING') {
      fetch(`/round?level=${state.level}`)
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
             dispatch({
              type: 'ROUND_SUCCESS',
              payload: {
                options: data.options,
                correctIndex: data.correctIndex,
                timer: data.timer
              }
            });
          }, 300);
        })
        .catch(err => {
          console.error('Failed to fetch round', err);
          // Auto fallback if server is down during dev
          dispatch({
              type: 'ROUND_SUCCESS',
              payload: {
                options: ["Fallback server offline.", "Error connecting."],
                correctIndex: 1,
                timer: 10
              }
            });
        });
    }
  }, [state.status, state.round, state.level, dispatch]);
};
