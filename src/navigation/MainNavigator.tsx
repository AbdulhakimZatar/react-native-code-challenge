import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREENS} from '../constants/screens';
import DashboardScreen from '../screens/Dashboard';
import MoreScreen from '../screens/More';
import RegistrationScreen from '../screens/Registration';
import SplashScreen from '../screens/Splash';

const Stack = createNativeStackNavigator();

function MainNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.SPLASH}>
        <Stack.Screen
          name={SCREENS.SPLASH}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.REGISTRATION}
          component={RegistrationScreen}
        />
        <Stack.Screen name={SCREENS.DASHBOARD} component={DashboardScreen} />
        <Stack.Screen name={SCREENS.MORE} component={MoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
