import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, useTheme, } from 'react-native-paper';

import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import useRoomForm from '../../hooks/useRoomForm';
import { useGetAllRoomsQuery, useLazyGetAllRoomsQuery } from '../../store/api/roomsApi';
import { useCreateTableMutation } from '../../store/api/tablesApi';

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
  name: "",
  seatQuantity: "",
  room: ""
};


const useTableForm = () => {
  const { data: roomsData } = useGetAllRoomsQuery();
  const [createTable, { isLoading: createTableLoading }] = useCreateTableMutation();
  const [getAllRooms] = useLazyGetAllRoomsQuery()
  const [expanded, setExpanded] = useState(false);
  const handleOpenTableSelect = () => setExpanded(!expanded);

  const navigation = useNavigation();

  const handleCreateTable = async (data) => {
    const newData = { ...data, room: `/api/rooms/${data.room.id}` };

    await createTable(newData)
      .unwrap()
      .then((res) => {
        if (res) {
          getAllRooms()
          navigation.goBack()
        }
      })
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
  };



  return {
    roomsData, expanded, createTableLoading, handleOpenTableSelect, handleCreateTable
  }
}

const TableForm = () => {
  const { colors } = useTheme();
  const navigate = useNavigation()
  const { roomsData, expanded, createTableLoading, handleOpenTableSelect, handleCreateTable
  } = useTableForm()

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
    roomsData && setValue('room', roomsData[0]);
  }, [roomsData]);

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

      <List.Section style={{ borderWidth: 1, borderRadius: 3, borderColor: colors.outline }}>
        <List.Accordion
          expanded={expanded}
          title={getValues().room?.name || (roomsData && roomsData[0].name)}

          onPress={handleOpenTableSelect}>
          {roomsData?.map(room => (
            <List.Item key={room.id} title={room.name} onPress={() => {
              setValue('room', room)
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
          loading={createTableLoading}
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
