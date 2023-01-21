import React from 'react';
import RNRestart from 'react-native-restart';
import {I18nManager, StyleSheet} from 'react-native';
import {Input, Layout, Button} from '@ui-kitten/components';
import {useAuthStore} from '../authStore';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_LANGUAGE_KEY} from '../constants';

function MoreScreen(): JSX.Element {
  const {state, handleLogout} = useAuthStore();
  const {t} = useTranslation();

  const handleSwitchLanguage = async () => {
    const newLanguage = I18nManager.isRTL ? 'en' : 'ar';
    await AsyncStorage.setItem(STORE_LANGUAGE_KEY, newLanguage);
    I18nManager.forceRTL(!I18nManager.isRTL);
    RNRestart.Restart();
  };

  return (
    <Layout style={styles.container}>
      <>
        <Input
          textStyle={styles.input}
          value={state.user.id}
          label={t('id')}
          status="primary"
          disabled
        />
        <Input
          textStyle={styles.input}
          value={state.user.email}
          label={t('email')}
          status="primary"
          disabled
        />
        <Input
          textStyle={styles.input}
          value={state.user.phone}
          label={t('phone')}
          status="primary"
          disabled
        />
        <Input
          textStyle={styles.input}
          value={state.user.dateBirth?.slice(4)}
          label={t('dateBirth')}
          status="primary"
          disabled
        />
        <Button
          style={styles.button}
          size="large"
          onPress={handleSwitchLanguage}>
          {t('changeLanguage')}
        </Button>
        <Button
          style={styles.button}
          status="danger"
          size="large"
          onPress={handleLogout}>
          {t('logout')}
        </Button>
      </>
    </Layout>
  );
}

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    padding: '10%',
  },
  datePickcker: {
    width: '100%',
    color: '#322F3F',
  },
  input: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: '#322F3F',
  },
  button: {
    width: '90%',
  },
  secondaryButton: {
    width: '90%',
    backgroundColor: '#8F73C5',
  },
});
