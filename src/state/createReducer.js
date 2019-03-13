/**
 * Create a reducer using the object/handler based API rather than a switch statement
 * Basically straight out of https://redux.js.org/recipes/reducingboilerplate#generating-reducers
 */
export function createReducer(initialState: State, handlers) {
  return function reducer(state = initialState, action): State {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      if (action.type === RESET) {
        return initialState;
      } else {
        return state;
      }
    }
  };
}

export const RESET = 'RESET';
