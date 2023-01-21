import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {SCREENS} from '../constants/screens';

function Navigator({navigation, state, t}): JSX.Element {
  const currentScreen = state.index;

  if (currentScreen > 2) {
    return null;
  }

  return (
    <BottomNavigation
      style={styles.bottomNavigation}
      selectedIndex={currentScreen}
      onSelect={index =>
        navigation.navigate(index === 0 ? SCREENS.DASHBOARD : SCREENS.MORE)
      }>
      <BottomNavigationTab
        title={t('screen.dashboard')}
        icon={<Icon name="home" />}
      />
      <BottomNavigationTab
        title={t('screen.more')}
        icon={<Icon name="more-horizontal" />}
      />
    </BottomNavigation>
  );
}

export default Navigator;

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
    position: 'absolute',
    bottom: 0,
  },
});
