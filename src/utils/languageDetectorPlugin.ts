import EncryptedStorage from 'react-native-encrypted-storage';
import {LanguageDetectorAsyncModule} from 'i18next';
import {NativeModules, Platform, I18nManager} from 'react-native';
import {STORE_LANGUAGE_KEY} from '../constants';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  // @ts-ignore
  detect: async function (callback) {
    try {
      //get stored language from Async storage
      await EncryptedStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          return callback(deviceLanguage.split('_')[0]);
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      I18nManager.forceRTL(language === 'ar');

      await EncryptedStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};
