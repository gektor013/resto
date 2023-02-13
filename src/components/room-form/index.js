import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, useTheme, } from 'react-native-paper';

import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useRoomForm from '../../hooks/useRoomForm';

const MIN_NAME_LENGTH = 1;
const MAX_COMMENT_LENGTH = 250;

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
  NAME_TOO_LONG: 'The name is too long',
  EMAIL_INVALID: 'Invalid email',
  PHONE_INVALID: 'The phone number is incorrect',
  COMMENT_TOO_LONG: `Comment must be less than ${MAX_COMMENT_LENGTH} characters`,
  TIME_INVALID: 'Invalid time'
};

const initialRoomState = {
  name: '',
  tables: {},
};

const RoomForm = () => {
  const { colors } = useTheme();
  const navigate = useNavigation()
  const { tablesData, expanded, createRoomLoading, handleOpenTableSelect, handleCreateRoom } = useRoomForm()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues: useMemo(() => {
      return { ...initialRoomState }
    }, [initialRoomState]),
    mode: 'onChange',
  });

  useEffect(() => {
    tablesData && setValue('tables', tablesData[0]);
  }, [tablesData]);

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

      <List.Section style={{ borderWidth: 1, borderRadius: 3, borderColor: colors.outline }}>
        <List.Accordion
          expanded={expanded}
          title={getValues().tables.name || (tablesData && tablesData[0].name)}

          onPress={handleOpenTableSelect}>
          {tablesData?.map(table => (
            <List.Item key={table.id} title={table.name} onPress={() => {
              setValue('tables', table)
              handleOpenTableSelect()
            }} />
          ))}
        </List.Accordion>
      </List.Section>

      <HelperText type="error">{errors.tables?.message}</HelperText>

      <View>
        <Button
          style={styles.mv25p}
          mode="contained"
          loading={createRoomLoading}
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
