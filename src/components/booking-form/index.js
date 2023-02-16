import React, { useEffect, useMemo, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, HelperText, Button, } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { formatDate } from '../../utils/dates';
import useBookingForm from '../../hooks/useBookingForm';
import ModaLayout from '../../layout/modal-layout';
import Tables from '../tables-modal';
import { useSelector } from 'react-redux';

const MIN_NAME_LENGTH = 1;
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 12;
const MAX_COMMENT_LENGTH = 250;
const MIN_TIME_LENGTH = 5

const REGEX = {
  name: /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/,
  email:
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  phone: /^[0-9]*$/,
};

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
  NAME_TOO_LONG: 'The name is too long',
  EMAIL_INVALID: 'Invalid email',
  PHONE_INVALID: 'The phone number is incorrect',
  COMMENT_TOO_LONG: `Comment must be less than ${MAX_COMMENT_LENGTH} characters`,
  TIME_INVALID: 'Invalid time'
};

const BookingForm = ({ route }) => {
  const [isOpenTableModal, setIsOpenTableModal] = useState(false)
  const { colors, bookingState, isDatePickerOpen, findRoom, onSubmitWithMode, setIsDatePickerOpen, onCancelPressHandler, } = useBookingForm(route)
  const [selectedTable, setSelectedTable] = useState({})


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,

  } = useForm({
    defaultValues: useMemo(() => {
      return route?.params ? { ...route.params } : { ...bookingState }
    }, [bookingState]),
    mode: 'onChange',
  });

  useEffect(() => {
    setSelectedTable(getValues().table)
  }, [getValues])

  return (
    <View style={styles.mb150}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          // pattern: {message: ERROR_MESSAGES.NAME_INVALID, value: REGEX.name},
          minLength: {
            value: MIN_NAME_LENGTH,
            message: ERROR_MESSAGES.NAME_INVALID,
          },
          // maxLength: {
          //   value: MAX_NAME_LENGTH,
          //   message: ERROR_MESSAGES.NAME_TOO_LONG,
          // },
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
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCorrect={false}
              mode="outlined"
              label="date"
              style={styles.mv5p}
              value={formatDate(new Date(value))}
              onTouchStart={() => {
                setIsDatePickerOpen(true);
              }}
              showSoftInputOnFocus={false}
              focusable={false}
              caretHidden={true}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              error={errors.date && true}
            />
            {isDatePickerOpen && (
              <DateTimePicker
                minimumDate={new Date()}
                value={new Date(value)}
                mode="date"
                onChange={(_, selectedDate) => {
                  setIsDatePickerOpen(false);
                  onChange(moment(selectedDate).format('DD MMM YYYY'));
                }}
              />
            )}
          </>
        )}
        name="date"
      />
      <HelperText type="error">{errors.date?.message}</HelperText>

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          minLength: {
            value: MIN_TIME_LENGTH,
            message: ERROR_MESSAGES.TIME_INVALID,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <TextInput
                autoCorrect={false}
                mode="outlined"
                label="start time"
                style={styles.mv5p}
                value={value}
                focusable={false}
                caretHidden={true}
                onBlur={onBlur}
                // keyboardType="numeric"
                onChangeText={value => onChange(value)}
                error={errors.startTime && true}
                render={props => (
                  <MaskInput
                    {...props}
                    mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                  />
                )}
              />
            </>
          )
        }}
        name="startTime"
      />
      <HelperText type="error">{errors.startTime?.message}</HelperText>

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          minLength: {
            value: MIN_TIME_LENGTH,
            message: ERROR_MESSAGES.TIME_INVALID,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              autoCorrect={false}
              mode="outlined"
              label="end time"
              style={styles.mv5p}
              value={value}
              focusable={false}
              caretHidden={true}
              onBlur={onBlur}
              // keyboardType="numeric"
              onChangeText={value => onChange(value)}
              error={errors.endTime && true}
              render={props => (
                <MaskInput
                  {...props}
                  mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                />
              )}
            />
          </>
        )}
        name="endTime"
      />
      <HelperText type="error">{errors.endTime?.message}</HelperText>

      {/* TABLE MODAL */}

      <Controller
        control={control}
        rules={{
          required: { value: true },
          validate: (value) => {
            return (
              value[0] !== ""
            )
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          const roomName = findRoom(value.id)
          const newValue = value?.name ? `${roomName} ${value?.name}` : ""
          return (
            <>
              <TextInput
                autoCorrect={false}
                mode="outlined"
                label="tables"
                style={styles.mv5p}
                value={newValue}
                onTouchStart={() => {
                  setIsOpenTableModal(true);
                }}
                showSoftInputOnFocus={false}
                focusable={false}
                caretHidden={true}
              />

              <ModaLayout
                visible={isOpenTableModal}
                onCancel={() => setIsOpenTableModal(false)}
                title={'Select desk'}
                onSave={() => {
                  onChange(selectedTable)
                  setIsOpenTableModal(false)
                }}
              >
                <Tables selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
              </ModaLayout>
            </>
          )
        }}
        name="table"
      />


      <HelperText type="error"></HelperText>

      {/* TABLE MODAL */}

      <Controller
        control={control}
        rules={{
          required: { value: false, message: ERROR_MESSAGES.REQUIRED },
          pattern: {
            message: ERROR_MESSAGES.PHONE_INVALID,
            value: REGEX.phone,
          },
          minLength: {
            value: PHONE_MIN_LENGTH,
            message: ERROR_MESSAGES.PHONE_INVALID,
          },
          maxLength: {
            value: PHONE_MAX_LENGTH,
            message: ERROR_MESSAGES.PHONE_INVALID,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="phone"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            keyboardType="numeric"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.phone && true}
          />
        )}
        name="phone"
      />
      <HelperText type="error">{errors.phone?.message}</HelperText>

      <Controller
        control={control}
        rules={{
          pattern: {
            message: ERROR_MESSAGES.EMAIL_INVALID,
            value: REGEX.email,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="email"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            value={value || ''}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.email && true}
          />
        )}
        name="email"
      />
      <HelperText type="error">{errors.email?.message}</HelperText>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="number of adult"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            value={value?.toString()}
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={value => onChange(Number(value))}
            error={errors.numberOfGuestsAdult && true}
          />
        )
        }
        name="numberOfGuestsAdult"
      />
      <HelperText type="error"></HelperText>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="number of child"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            value={value?.toString()}
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={value => onChange(Number(value))}
            error={errors.numberOfGuestsChild && true}
          />
        )}
        name="numberOfGuestsChild"
      />
      <HelperText type="error"></HelperText>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="number of baby"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            value={value?.toString()}
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={value => onChange(Number(value))}
            error={errors.numberOfGuestsBaby && true}
          />
        )}
        name="numberOfGuestsBaby"
      />
      <HelperText type="error"></HelperText>


      <Controller
        control={control}
        rules={{
          maxLength: {
            value: MAX_COMMENT_LENGTH,
            message: ERROR_MESSAGES.COMMENT_TOO_LONG,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="commentByGuest"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            // editable={mode === modes.VIEW ? false : true}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.commentByGuest && true}
          />
        )}
        name="commentByGuest"
      />
      <HelperText type="error">
        {errors.commentByGuest?.message}
      </HelperText>

      <Controller
        control={control}
        rules={{
          maxLength: {
            value: MAX_COMMENT_LENGTH,
            message: ERROR_MESSAGES.COMMENT_TOO_LONG,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="commentByAdminForGuest"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            // editable={mode === modes.VIEW ? false : true}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.commentByAdminForGuest && true}
          />
        )}
        name="commentByAdminForGuest"
      />
      <HelperText type="error">
        {errors.commentByAdminForGuest?.message}
      </HelperText>

      <Controller
        control={control}
        rules={{
          maxLength: {
            value: MAX_COMMENT_LENGTH,
            message: ERROR_MESSAGES.COMMENT_TOO_LONG,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="commentByAdminForAdmin"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
            // editable={mode === modes.VIEW ? false : true}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            error={errors.commentByAdminForAdmin && true}
          />
        )}
        name="commentByAdminForAdmin"
      />
      <HelperText type="error">
        {errors.commentByAdminForAdmin?.message}
      </HelperText>


      <View>
        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={handleSubmit(onSubmitWithMode)}
          disabled={!isValid}>
          {/* {mode === modes.CREATE ? 'Save' : 'Edit'} */}
          {route?.params ? 'Edit' : 'Save'}
        </Button>

        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={onCancelPressHandler}
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

export default BookingForm;
