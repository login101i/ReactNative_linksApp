import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: ''
  });

  const token = state && state.token ? state.token : '';
  const navigation = useNavigation();

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // expired token
  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        await AsyncStorage.removeItem('@auth');
        setState({ user: null, token: '' });
        navigation.navigate('SignIn');
      }
    }
  );

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem('@auth');
      const as = JSON.parse(data);

      setState({ ...state, user: as?.user || null, token: as?.token || null });
    };

    loadFromAsyncStorage();
  }, []);

  return <AuthContext.Provider value={[state, setState]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
