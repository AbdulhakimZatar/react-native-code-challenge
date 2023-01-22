import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import Navigator from '../components/Navigator';
import DashboardScreen from '../screens/Dashboard';
import MoreScreen from '../screens/More';
import {SCREENS} from '../constants/screens';
import {headerStyleOptions} from '../constants';

const Tab = createBottomTabNavigator<any>();
function MainStack() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      tabBar={(props): JSX.Element => <Navigator {...props} t={t} />}
      initialRouteName={SCREENS.DASHBOARD}
      screenOptions={({route}) => ({
        title: t('screen.' + route.name.toLowerCase()),
        headerTitleAlign: 'center',
      })}>
      <Tab.Screen
        name={SCREENS.DASHBOARD}
        component={DashboardScreen}
        options={headerStyleOptions as BottomTabNavigationOptions}
      />
      <Tab.Screen
        name={SCREENS.MORE}
        component={MoreScreen}
        options={headerStyleOptions as BottomTabNavigationOptions}
      />
    </Tab.Navigator>
  );
}

export default MainStack;
