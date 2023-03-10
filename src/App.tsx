import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';

import {theme} from './theme';
import MainNavigation from './navigation/MainNavigator';

import './i18n';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <MainNavigation />
      </ApplicationProvider>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ebebf7',
    flex: 1,
  },
});
