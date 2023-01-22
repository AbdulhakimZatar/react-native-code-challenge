import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SCREENS} from '../constants/screens';
import RegistrationScreen from '../screens/Registration';
import SplashScreen from '../screens/Splash';
import MainStack from './MainStack';
import {headerStyleOptions} from '../constants';
import AuthStore from '../store/auth';

const Stack = createNativeStackNavigator();

function MainNavigation(): JSX.Element {
  return (
    <NavigationContainer>
      <AuthStore>
        <Stack.Navigator initialRouteName={SCREENS.SPLASH}>
          <Stack.Screen
            name={SCREENS.REGISTRATION}
            component={RegistrationScreen}
            options={{
              ...(headerStyleOptions as NativeStackNavigationOptions),
              headerTitle: 'React Native Code Challenge',
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
      </AuthStore>
    </NavigationContainer>
  );
}

export default MainNavigation;
