import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import { Home } from '../screens/Home';
import { Favorites } from '../screens/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.text,
        showLabel: false,
        style: {
          backgroundColor: theme.colors.shape,
          borderTopColor: theme.colors.shape,
        }
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (({ size, color }) => (
            <FontAwesome 
              name="search"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: (({ size, color }) => (
            <FontAwesome 
              name="heart"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  );
}