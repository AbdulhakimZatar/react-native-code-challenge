import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useReducer} from 'react';

export interface GlobalStateInterface {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  user: {
    id: number;
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
        isAuthLoading: !state.isAuthLoading,
      };
    case AUTH_STORE_ACTIONS.TOGGLE_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
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
});

function AuthStore(props) {
  const [state, dispatch] = useReducer(reducer, initialGlobalState);

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem('settings.user').then(user => {
        if (user) {
          dispatch({
            type: AUTH_STORE_ACTIONS.SET_AUTH_USER,
            payload: JSON.parse(user),
          });
          dispatch({
            type: AUTH_STORE_ACTIONS.TOGGLE_AUTHENTICATED,
          });
        }
        dispatch({
          type: AUTH_STORE_ACTIONS.TOGGLE_AUTH_LOADING,
        });
      });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthStore = () => {
  return useContext(AuthContext);
};

export default AuthStore;
