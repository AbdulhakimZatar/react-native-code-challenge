import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {SCREENS} from '../constants/screens';
import splashyLoader from '../assets/splashy-loader.json';
import {Layout} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen({navigation}): JSX.Element {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const ref = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('settings.user').then(user => {
      if (user) {
        setUser(JSON.parse(user));
      }
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (animationLoaded && !authLoading) {
      if (user) {
        navigation.replace(SCREENS.MAIN);
      } else {
        navigation.replace(SCREENS.REGISTRATION);
      }
    }
  }, [animationLoaded, navigation, authLoading, user]);

  const onAnimationFinish = () => {
    setAnimationLoaded(true);
  };

  return (
    <Layout style={styles.container}>
      <LottieView
        ref={animation => {
          ref.current = animation;
        }}
        style={styles.lottieView}
        source={splashyLoader}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </Layout>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: '100%',
  },
});
