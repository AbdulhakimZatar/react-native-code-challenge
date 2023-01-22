import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const STORE_LANGUAGE_KEY = 'settings.lang';

export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const headerStyleOptions:
  | BottomTabNavigationOptions
  | NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#5B31B2',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
  headerTitleAlign: 'center',
};
