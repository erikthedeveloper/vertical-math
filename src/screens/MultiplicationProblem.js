import * as React from 'react';
import {animateNextLayout} from '../utils/animation';
import {randDelay} from '../utils/promise';
import {sortDesc} from '../utils/math-utils';
import {MultiplicationProblem as MultiplicationProblemComponent} from '../components/MultiplicationProblem';

export default class MultiplicationProblem extends React.Component {
  state = {
    factors: [97, 17],
  };

  shuffleProducts = async () => {
    for (let i = 0; i < 5; i++) {
      await randDelay(100, 250);
      animateNextLayout();
      this.setState({
        factors: [Math.random() * 100, Math.random() * 100]
          .map(Math.round)
          .sort(sortDesc),
      });
    }
  };

  render() {
    return (
      <MultiplicationProblemComponent
        factors={this.state.factors}
        onPressRefresh={this.shuffleProducts}
      />
    );
  }
}
