import React, {Component} from 'react';
import {generateAddends, sortAsc} from '../utils/math-utils';
import {animateNextLayout} from '../utils/animation';
import {randDelay} from '../utils/promise';
import {AdditionProblem as AdditionProblemComponent} from '../components/AdditionProblem';

export class AdditionProblem extends Component {
  state = {
    addends: [129, 12, 318, 2732].sort(sortAsc),
  };

  shuffleAddends = async () => {
    for (let i = 0; i < 5; i++) {
      await randDelay(100, 250);
      animateNextLayout();
      this.setState({
        addends: generateAddends(2, 5),
      });
    }
  };

  render() {
    return (
      <AdditionProblemComponent
        addends={this.state.addends}
        onPressRefresh={this.shuffleAddends}
      />
    );
  }
}
