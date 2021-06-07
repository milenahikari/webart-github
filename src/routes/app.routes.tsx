import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { Favorites } from '../screens/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="Favorites"
        component={Favorites}
      />
    </Navigator>
  );
}