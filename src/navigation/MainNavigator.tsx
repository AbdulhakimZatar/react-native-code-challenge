import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Navigator from '../components/Navigator';
import {SCREENS} from '../constants/screens';
import DashboardScreen from '../screens/Dashboard';
import MoreScreen from '../screens/More';
import RegistrationScreen from '../screens/Registration';
import SplashScreen from '../screens/Splash';

const Tab = createBottomTabNavigator<any>();

function MainNavigation(): JSX.Element {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props): JSX.Element => <Navigator {...props} t={t} />}
        initialRouteName={SCREENS.SPLASH}
        screenOptions={({route}) => ({
          title: t('screen.' + route.name.toLowerCase()),
        })}>
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
