import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainTitle from '../ui/main-title';
import {ButtonContain} from '../ui/buttons';
import Paragraph from '../ui/paragraph';
import TextLink from '../ui/text-link';
import PhoneInput from '../phone-input';

const stepOne = () => {
  return (
    <View>
      <MainTitle>Welcome Back!</MainTitle>
      <MainTitle containerStyle={styles.mb32}>
        Glad to see you, Again!
      </MainTitle>
      <PhoneInput />
      <Paragraph containerStyle={styles.mb40}>
        By clicking the "LogIn or SignUp" button you are accepting the terms of
        the <TextLink inline={true}>User Agreement (EULA)</TextLink>.
      </Paragraph>

      <ButtonContain disabled={true} title="Login or Sign Up" />
    </View>
  );
};

export default stepOne;

const styles = StyleSheet.create({
  mb32: {
    marginBottom: 32,
  },
  mb40: {
    marginBottom: 40,
  },
});
