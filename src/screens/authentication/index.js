import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  TextInput,
  HelperText,
  Button,
  useTheme,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useSigninUserMutation } from '../../store/api/authenticationApi';
import { login } from '../../store/slice/authenticationSlice';
import { useForm, Controller } from 'react-hook-form';
import { useNetInfo } from '@react-native-community/netinfo';

const initialInputData = {
  username: '',
  password: '',
};

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
};

const AuthenticationScreen = () => {
  const [signinUser, { data, isLoading, isError, isSuccess }] =
    useSigninUserMutation();
  const {
    control,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: initialInputData,
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const { isConnected } = useNetInfo();
  const { colors } = useTheme();

  const onSubmitPressHandler = data => {
    signinUser(data);
  };

  useEffect(() => {
    if (isSuccess && data?.token) dispatch(login(data));
  }, [isSuccess]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.title}>
          Authorization
        </Text>
        <Text
          variant="bodyLarge"
          style={{
            ...styles.helper,
            color: isError ? colors.error : colors.inverseSurface,
          }}>
          {isConnected
            ? isError
              ? 'incorrect username or password'
              : 'please enter your credentials'
            : 'no internet connection'}
        </Text>
        <View>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: ERROR_MESSAGES.REQUIRED },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="username"
                disabled={isLoading || !isConnected}
                style={styles.mv5p}
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.username && true}
              />
            )}
            name="username"
          />
          <HelperText type="error">{errors.username?.message}</HelperText>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: ERROR_MESSAGES.REQUIRED },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                label="password"
                disabled={isLoading || !isConnected}
                style={styles.mv5p}
                value={value}
                onChangeText={value => onChange(value)}
                error={errors.password && true}
              />
            )}
            name="password"
          />
          <HelperText type="error">{errors.password?.message}</HelperText>
        </View>
        <Button
          mode="contained"
          style={styles.mv25p}
          onPress={handleSubmit(onSubmitPressHandler)}
          disabled={!formState.isValid || isLoading || !isConnected}>
          {isLoading ? 'Loading' : 'Submit'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: '10%',
    paddingHorizontal: '5%',
  },
  title: {
    textAlign: 'center',
  },
  helper: {
    textAlign: 'center',
    marginVertical: '2%',
  },
  mv5p: {
    marginVertical: 5,
  },
  mv25p: {
    marginVertical: 25,
  },
});

export default AuthenticationScreen;
