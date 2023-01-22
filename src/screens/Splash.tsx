import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {SCREENS} from '../constants/screens';
import splashyLoader from '../assets/splashy-loader.json';
import {Layout} from '@ui-kitten/components';
import {useAuthStore} from '../store/auth';

function SplashScreen({navigation}): JSX.Element {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const {state} = useAuthStore();

  const ref = useRef(null);

  useEffect(() => {
    if (animationLoaded && !state.isAuthLoading) {
      if (state.isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{name: SCREENS.MAIN}],
        });
      } else {
        navigation.replace(SCREENS.REGISTRATION);
      }
    }
  }, [animationLoaded, navigation, state.isAuthLoading, state.isAuthenticated]);

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
    backgroundColor: '#fff',
  },
  lottieView: {
    width: '100%',
  },
});
