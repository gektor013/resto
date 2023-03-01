import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, useTheme, } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { createRoomSlice, deletedRoomsSlice, editedRoomsSlice } from '../../store/slice/roomsSlice';
import { createUnicId } from '../../utils/helpers';
import { useCallback } from 'react';

const MIN_NAME_LENGTH = 1;

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
};

const initialRoomState = {
  name: '',
  tables: [],
};

const RoomForm = () => {
  const { isConnected } = useNetInfo()
  const { colors } = useTheme();
  const route = useRoute()
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const handleGoBack = useCallback(() => navigate.goBack(), [])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: useMemo(() => {
      return route.params ? { ...route.params } : { ...initialRoomState }
    }, [initialRoomState, route.params]),
    mode: 'onChange',
  });

  const handleCreateRoom = (data) => {
    if (!route.params) {
      dispatch(createRoomSlice({ ...data, internalID: createUnicId() }))
      handleGoBack()
    } else {
      dispatch(editedRoomsSlice(data))
      handleGoBack()
    }
  };

  const handleDeleteRoom = () => {
    dispatch(deletedRoomsSlice(route.params))
    handleGoBack()
  }

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
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.name && true}
          />
        )
        }
        name="name"
      />
      <HelperText type="error">{errors.name?.message}</HelperText>

      <View>
        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={handleSubmit(handleCreateRoom)}
          disabled={!isValid}>
          Save
        </Button>

        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={() => navigate.goBack()}
        >
          Cancel
        </Button>

        {route.params && isConnected && (
          <Button
            style={styles.mv25p}
            mode="contained"
            disabled={route?.params?.tables?.length !== 0}
            onPress={handleDeleteRoom}
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

export default RoomForm;
