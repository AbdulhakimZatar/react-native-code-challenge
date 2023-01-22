import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {SCREENS} from '../constants/screens';

export interface GlobalStateInterface {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    phone: string;
    dateBirth: string;
  };
}

export const initialGlobalState: GlobalStateInterface = {
  isAuthLoading: true,
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    phone: null,
    dateBirth: null,
  },
};

export const AUTH_STORE_ACTIONS = {
  TOGGLE_AUTH_LOADING: 'toggle_auth_loading',
  TOGGLE_AUTHENTICATED: 'toggle_authenticated',
  SET_AUTH_USER: 'set_auth_user',
};

export const reducer = (
  state: GlobalStateInterface,
  action: {type: string; payload?},
) => {
  switch (action.type) {
    case AUTH_STORE_ACTIONS.TOGGLE_AUTH_LOADING:
      return {
        ...state,
        isAuthLoading: action.payload,
      };
    case AUTH_STORE_ACTIONS.TOGGLE_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case AUTH_STORE_ACTIONS.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  state: initialGlobalState,
  dispatch: value => value,
  handleLogout: () => {},
  handleLogin: user => user,
});

function AuthStore(props) {
  const [state, dispatch] = useReducer(reducer, initialGlobalState);
  const navigation: any = useNavigation();

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem('settings.user').then(user => {
        if (user) {
          handleLogin(user);
        }
        dispatch({
          type: AUTH_STORE_ACTIONS.TOGGLE_AUTH_LOADING,
          payload: false,
        });
      });
    })();
  }, []);

  const handleLogout = () => {
    dispatch({
      type: AUTH_STORE_ACTIONS.SET_AUTH_USER,
      payload: initialGlobalState.user,
    });
    dispatch({
      type: AUTH_STORE_ACTIONS.TOGGLE_AUTHENTICATED,
      payload: false,
    });
    AsyncStorage.removeItem('settings.user');
    // remove history and disable back button
    navigation.reset({
      index: 0,
      routes: [{name: SCREENS.SPLASH}],
    });
  };

  const handleLogin = user => {
    dispatch({
      type: AUTH_STORE_ACTIONS.SET_AUTH_USER,
      payload: JSON.parse(user),
    });
    dispatch({
      type: AUTH_STORE_ACTIONS.TOGGLE_AUTHENTICATED,
      payload: true,
    });
  };

  return (
    <AuthContext.Provider value={{state, dispatch, handleLogin, handleLogout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthStore = () => {
  return useContext(AuthContext);
};

export default AuthStore;
