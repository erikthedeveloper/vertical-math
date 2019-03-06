import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import MultiplicationProblem from '../screens/MultiplicationProblem';
import {SubtractionProblem} from '../screens/SubtractionProblem';
import {AdditionProblem} from '../screens/AdditionProblem';

const MultiplicationStack = createStackNavigator(
  {
    Multiplication: MultiplicationProblem,
  },
  {defaultNavigationOptions: {header: null}}
);

MultiplicationStack.navigationOptions = {
  tabBarLabel: 'Multiply',
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
  tabBarLabel: 'Add',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-add` : 'md-add'}
    />
  ),
};

const SubtractionStack = createStackNavigator(
  {
    Subtraction: SubtractionProblem,
  },
  {defaultNavigationOptions: {header: null}}
);

SubtractionStack.navigationOptions = {
  tabBarLabel: 'Subtract',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-remove' : 'md-remove'}
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
    initialRouteName: 'MultiplicationStack',
  }
);
