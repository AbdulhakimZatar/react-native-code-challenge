import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/core';
import {SCREENS} from '../constants/screens';
import splashyLoader from '../assets/splashy-loader.json';
import {Layout} from '@ui-kitten/components';

function SplashScreen(): JSX.Element {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const navigation: any = useNavigation();

  const ref = useRef(null);

  useEffect(() => {
    if (animationLoaded) {
      // TODO: Add auth logic here
      navigation.navigate(SCREENS.DASHBOARD);
    }
  }, [animationLoaded, navigation]);

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
