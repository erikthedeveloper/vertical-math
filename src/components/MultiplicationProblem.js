import * as React from 'react';
import {autoSolveActions, reducer} from '../state/multiplication';
import {ActionsState} from './ActionsState';
import {AdditionProblem} from './AdditionProblem';
import {ProblemScreen} from './ProblemScreen';
import {MultiplicationEquation} from './MultiplicationEquation/MultiplicationEquation';

export function MultiplicationProblem({factors, onPressRefresh}) {
  const multiplicationActions = autoSolveActions(factors);

  return (
    <ActionsState
      key={String(factors)}
      reducer={reducer}
      actions={multiplicationActions}
    >
      {({actionsState, prevAction, nextAction, actionIndex}) => {
        if (actionsState.additionMode) {
          return (
            <AdditionProblem
              addends={actionsState.productRows}
              onPressPrev={prevAction}
              onPressRefresh={onPressRefresh}
            />
          );
        }

        return (
          <ProblemScreen
            onPressPrev={actionIndex >= 1 ? prevAction : null}
            onPressRefresh={onPressRefresh}
            onPressNext={
              actionIndex < multiplicationActions.length - 1 ? nextAction : null
            }
          >
            <MultiplicationEquation {...actionsState} />
          </ProblemScreen>
        );
      }}
    </ActionsState>
  );
}
