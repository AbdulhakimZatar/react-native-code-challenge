import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import Navigator from '../components/Navigator';
import DashboardScreen from '../screens/Dashboard';
import MoreScreen from '../screens/More';
import {SCREENS} from '../constants/screens';

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
      <Tab.Screen name={SCREENS.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen name={SCREENS.MORE} component={MoreScreen} />
    </Tab.Navigator>
  );
}

export default MainStack;
