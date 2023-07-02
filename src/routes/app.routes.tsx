import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsPage } from '@screens/NewsPage';
import { TabRoutes } from './tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="TabRoutes"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >

      <Screen
        name="tab"
        component={TabRoutes}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="newsPage"
        component={NewsPage}
        options={{
          headerShown: true,
          title: 'Notícias'
        }}
      />

    </Navigator>
  );
}
