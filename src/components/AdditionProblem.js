import * as React from 'react';
import {Alert} from 'react-native';
import {autoSolveActions, reducer} from '../state/addition';
import {ActionsState} from './ActionsState';
import {ProblemScreen} from './ProblemScreen';
import {AdditionEquation} from './AdditionEquation/AdditionEquation';

export function AdditionProblem({addends, onPressPrev, onPressRefresh}) {
  const actions = autoSolveActions(addends);
  return (
    <ActionsState key={String(addends)} reducer={reducer} actions={actions}>
      {({actionsState, actionIndex, prevAction, nextAction}) => (
        <ProblemScreen
          onPressPrev={actionIndex === 0 ? onPressPrev : prevAction}
          onPressRefresh={onPressRefresh}
          onPressNext={
            actionIndex < actions.length - 1
              ? () => {
                  nextAction();
                  if (actionIndex === actions.length - 2) {
                    Alert.alert('Correct!', '💯 You solved the equation! 💯');
                  }
                }
              : null
          }
        >
          <AdditionEquation {...actionsState} />
        </ProblemScreen>
      )}
    </ActionsState>
  );
}
