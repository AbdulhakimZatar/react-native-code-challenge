import React from 'react';
import {Formik} from 'formik';
import {
  Button,
  CalendarViewModes,
  Datepicker,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import {
  I18nManager,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {phoneRegExp} from '../constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../constants/screens';
import {useAuthStore} from '../store/auth';

function RegistrationScreen(): JSX.Element {
  const {handleLogin} = useAuthStore();
  const {t} = useTranslation();
  const navigation: any = useNavigation();

  const handleSubmit = async values => {
    const user = JSON.stringify(values);
    await EncryptedStorage.setItem('settings.user', user);
    handleLogin(user);
    navigation.navigate(SCREENS.SPLASH);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.container}>
          <Text category="h1">{t('screen.registration')}</Text>
          <Formik
            initialValues={{
              id: '',
              email: '',
              phone: '',
              dateBirth: null,
            }}
            validationSchema={yup.object().shape({
              id: yup
                .number()
                .typeError('error.integer')
                .integer('error.integer')
                .required('error.required'),
              email: yup
                .string()
                .email('error.email')
                .required('error.required'),
              phone: yup
                .string()
                .typeError('error.phone')
                .required('error.required')
                .matches(phoneRegExp, 'error.phone'),
              dateBirth: yup
                .string()
                .typeError('error.date')
                .required('error.required'),
            })}
            onSubmit={handleSubmit}>
            {({
              setTouched,
              setValues,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Input
                  textStyle={styles.input}
                  onChangeText={handleChange('id')}
                  onBlur={handleBlur('id')}
                  value={values.id}
                  label={t('id')}
                  placeholder="123"
                  keyboardType="numeric"
                  returnKeyType="done"
                  status={touched.id && errors.id ? 'danger' : 'primary'}
                  caption={touched.id && t(errors.id as string)}
                />
                <Input
                  textStyle={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={t('email')}
                  placeholder="abdulhakim@gmail.com"
                  keyboardType="email-address"
                  status={touched.email && errors.email ? 'danger' : 'primary'}
                  caption={touched.email && t(errors.email as string)}
                />
                <Input
                  textStyle={styles.input}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  label={t('phone')}
                  placeholder="+96277777777"
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  status={touched.phone && errors.phone ? 'danger' : 'primary'}
                  caption={touched.phone && t(errors.phone as string)}
                />
                <Datepicker
                  style={styles.datePicker}
                  label={t('dateBirth')}
                  placeholder="24/02/1996"
                  date={
                    values.dateBirth === null
                      ? null
                      : new Date(values.dateBirth)
                  }
                  placement="top"
                  size="large"
                  startView={CalendarViewModes.YEAR}
                  min={new Date(1900, 1, 1)}
                  max={new Date()}
                  onSelect={nextDate =>
                    setValues({
                      ...values,
                      dateBirth: nextDate.toDateString(),
                    })
                  }
                  onBlur={() => {
                    setTimeout(() => {
                      setTouched({
                        dateBirth: true,
                      });
                    }, 0);
                  }}
                  status={
                    touched.dateBirth && errors.dateBirth ? 'danger' : 'primary'
                  }
                  caption={touched.dateBirth && t(errors.dateBirth as string)}
                />
                <Button
                  style={styles.button}
                  size="large"
                  onPress={handleSubmit}>
                  {t('register')}
                </Button>
              </>
            )}
          </Formik>
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    padding: '10%',
  },
  datePicker: {
    width: '100%',
  },
  input: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  button: {
    width: '50%',
  },
});
