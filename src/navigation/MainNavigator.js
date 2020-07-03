import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { roots } from '.';
import { strings } from '../core/constants';
import { WheelScreen } from '../screens/wheel';
import { mainNavigatorStyles } from './styles';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={roots.wheelScreen}>
      <Stack.Screen
        options={{
          title: strings.wheelOfFate,
          headerTitleStyle: mainNavigatorStyles.headerTitleStyle,
          headerStyle: mainNavigatorStyles.headerStyle,
        }}
        name={roots.wheelScreen}
        component={WheelScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStackNavigator;
