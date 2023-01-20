import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Navigator from '../components/Navigator';
import {SCREENS} from '../constants/screens';
import DashboardScreen from '../screens/Dashboard';
import MoreScreen from '../screens/More';
import RegistrationScreen from '../screens/Registration';
import SplashScreen from '../screens/Splash';

const Tab = createBottomTabNavigator<any>();

function MainNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={Navigator} initialRouteName={SCREENS.SPLASH}>
        <Tab.Screen name={SCREENS.DASHBOARD} component={DashboardScreen} />
        <Tab.Screen name={SCREENS.MORE} component={MoreScreen} />
        <Tab.Screen
          name={SCREENS.REGISTRATION}
          component={RegistrationScreen}
        />
        <Tab.Screen
          name={SCREENS.SPLASH}
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
