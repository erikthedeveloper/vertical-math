import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import MultiplicationProblem from '../screens/MultiplicationProblem';
import {AdditionProblem} from '../screens/AdditionProblem';
import {FibonacciProblem} from '../screens/FibonacciProblem';

const MultiplicationStack = createStackNavigator(
  {
    Multiplication: MultiplicationProblem,
  },
  {defaultNavigationOptions: {header: null}}
);

MultiplicationStack.navigationOptions = {
  tabBarLabel: 'Multiplication',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
    />
  ),
};

const AdditionStack = createStackNavigator(
  {
    Addition: AdditionProblem,
  },
  {defaultNavigationOptions: {header: null}}
);

AdditionStack.navigationOptions = {
  tabBarLabel: 'Addition',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-add` : 'md-add'}
    />
  ),
};

const SubtractionStack = createStackNavigator(
  {
    Subtraction: FibonacciProblem,
  },
  {defaultNavigationOptions: {header: null}}
);

SubtractionStack.navigationOptions = {
  tabBarLabel: 'Fibonacci',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flower' : 'md-flower'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    AdditionStack,
    SubtractionStack,
    MultiplicationStack,
  },
  {
    initialRouteName: 'AdditionStack',
  }
);
