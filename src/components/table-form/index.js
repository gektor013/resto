import React, { useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, useTheme } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
  deletedTableSlice,
  editTableSlice,
  setNewTableToRoomSlice,
} from '../../store/slice/roomsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createUnicId } from '../../utils/helpers';
import { updateBookingTable } from '../../store/slice/bookingsSlice';
import { bookingsDataCS } from '../../store/slice/bookingDataSlice';

const MIN_NAME_LENGTH = 1;

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
};

const TableForm = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bookingData = useSelector(bookingsDataCS)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: useMemo(() => {
      return { ...route.params };
    }, [route]),
    mode: 'onChange',
  });

  const handleCreateTable = async data => {
    if (!data?.id && !data?.internalID) {
      dispatch(setNewTableToRoomSlice({ ...data, internalID: createUnicId() }));
      navigation.goBack();
    } else {
      dispatch(editTableSlice(data));
      dispatch(updateBookingTable(data));
      navigation.goBack();
    }
  };

  const handleTableDelete = () => {
    const bookingTbaleIdOrInternalID = bookingData?.table?.internalID || bookingData?.table?.id
    const paramsIdOrInternalId = route?.params?.internalID || route?.params?.id

    if (bookingTbaleIdOrInternalID === paramsIdOrInternalId) {
      Alert.alert(
        "Attention!",
        "Can't delete the table because it's pinned to the current booking!")
    } else {
      dispatch(deletedTableSlice(route?.params));
      navigation.goBack();
    }
  };

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
        )}
        name="name"
      />
      <HelperText type="error">{errors.name?.message}</HelperText>

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="seat quantity"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            value={value}
            onBlur={onBlur}
            keyboardType={'numeric'}
            onChangeText={value => onChange(value)}
            error={errors.seatQuantity && true}
          />
        )}
        name="seatQuantity"
      />
      <HelperText type="error">{errors.seatQuantity?.message}</HelperText>
      <View>
        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={handleSubmit(handleCreateTable)}
          disabled={!isValid}>
          Save
        </Button>

        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={() => navigate.goBack()}>
          Cancel
        </Button>

        {/* {route?.params?.id && ( */}
        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={handleTableDelete}>
          Delete
        </Button>
        {/* )} */}
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

export default TableForm;
