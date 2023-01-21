import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SCREENS} from '../constants/screens';
import RegistrationScreen from '../screens/Registration';
import SplashScreen from '../screens/Splash';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

function MainNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.SPLASH}>
        <Stack.Screen
          name={SCREENS.REGISTRATION}
          component={RegistrationScreen}
          options={{
            headerTitle: 'React Native Code Challenge',
            headerStyle: {
              backgroundColor: '#5B31B2',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#F5F5F5',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={SCREENS.SPLASH}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.MAIN}
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
