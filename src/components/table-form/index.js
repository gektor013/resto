import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, useTheme, } from 'react-native-paper';

import { List } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import useTableForm from '../../hooks/useTableForm';

const MIN_NAME_LENGTH = 1;

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
};

const initialRoomState = {
  name: "",
  seatQuantity: "",
  room: {}
};

const TableForm = () => {
  const { colors } = useTheme();
  const route = useRoute()
  const navigate = useNavigation()

  const { createTableLoading, patchTableLoading, daleteTableLoading, handleCreateTable, handleTableDelete
  } = useTableForm(route?.params)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: useMemo(() => {
      return { ...route.params }
    }, [initialRoomState]),
    mode: 'onChange',
  });

  // console.log(route.params, 'PARAMS');

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
          loading={createTableLoading || patchTableLoading}
          onPress={handleSubmit(handleCreateTable)}
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

        {route?.params?.id && (
          <Button
            style={styles.mv25p}
            mode="contained"
            loading={daleteTableLoading}
            onPress={handleTableDelete}
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

export default TableForm;
