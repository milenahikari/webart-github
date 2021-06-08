import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppBottomRoutes } from './appbottom.routes';
import { Repositories } from '../screens/Repositories';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {

  return (
    <Navigator>
      <Screen 
        name="Home"
        component={AppBottomRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      
      <Screen 
        name="Repositories"
        component={Repositories}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Navigator>
  );
}