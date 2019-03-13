export function reduceActions(reducer, actions, actionIndex) {
  return actions
    .slice(0, actionIndex + 1)
    .reduce((state, action) => reducer(state, action), undefined);
}
