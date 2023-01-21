import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {theme} from './theme';
import MainNavigation from './navigation/MainNavigator';

import './i18n';

function App(): JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <MainNavigation />
      </ApplicationProvider>
    </>
  );
}

export default App;
