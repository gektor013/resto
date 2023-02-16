import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';
import useUserForm from '../../hooks/useUserForm';

const MIN_NAME_LENGTH = 1;

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
};

const initialUserState = {
  roles: [
    "ROLE_ADMIN"
  ],
  password: "",
  username: ""
};



const UserForm = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { addLoading, putLoading, deleteLoading, sendUserData, userDelete } = useUserForm(route)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },

  } = useForm({
    defaultValues: useMemo(() => {
      return route?.params ? { ...route.params } : { ...initialUserState }
    }, [initialUserState, route]),
    mode: 'onChange',
  });


  return (
    <View style={styles.mb150}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          minLength: {
            value: MIN_NAME_LENGTH,
            message: ERROR_MESSAGES.NAME_INVALID,
          },

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="name"
            style={styles.mv5p}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.name && true}
          />
        )
        }
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
            style={styles.mv5p}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.seatQuantity && true}
          />
        )}
        name="password"
      />
      <HelperText type="error">{errors.password?.message}</HelperText>


      <View>
        <Button
          style={styles.mv25p}
          mode="contained"
          loading={addLoading || putLoading}
          onPress={handleSubmit(sendUserData)}
          disabled={!isValid}>
          Save
        </Button>

        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>

        {route?.params && (
          <Button
            style={styles.mv25p}
            mode="contained"
            loading={deleteLoading}
            onPress={() => userDelete(route?.params.id)}
          >
            Delete
          </Button>
        )}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  mv5p: {
    marginVertical: 5,
  },
  mv25p: {
    marginVertical: 25,
  },
  mb150: {
    marginBottom: 150,
  },
});

export default UserForm;
