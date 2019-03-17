// @flow
/**
 * Create a reducer using the object/handler based API rather than a switch statement
 * Basically straight out of https://redux.js.org/recipes/reducingboilerplate#generating-reducers
 */
export function createReducer<State: Object, Action: Object>(
  initialState: State,
  handlers: {[string]: (State, Action) => State}
): (State | void, Action) => State {
  return function reducer(state: State = initialState, action: Action): State {
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
