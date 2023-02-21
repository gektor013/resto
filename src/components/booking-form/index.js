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
import Employees from '../employee-modal';
import { useNavigation } from '@react-navigation/native';

const MIN_NAME_LENGTH = 1;
const PHONE_MIN_LENGTH = 10;
const MAX_COMMENT_LENGTH = 250;
const MIN_TIME_LENGTH = 5

const REGEX = {
  phone: /^[0-9]*$/,
};

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_INVALID: 'Invalid name',
  PHONE_INVALID: 'The phone number is incorrect',
  COMMENT_TOO_LONG: `Comment must be less than ${MAX_COMMENT_LENGTH} characters`,
  TIME_INVALID: 'Invalid time'
};

const BookingForm = ({ route }) => {
  const navigation = useNavigation()
  const [isOpenTableModal, setIsOpenTableModal] = useState(false)
  const [isOpenEmploeeModal, setIsOpenEmploeeModal] = useState(false)
  const [isShowInput, setIsShowInput] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const { colors, bookingState, isDatePickerOpen, findRoom, onSubmitWithMode, setIsDatePickerOpen, onCancelPressHandler, } = useBookingForm(route)
  const isParamsTable = route?.params?.table

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({
    defaultValues: useMemo(() => {
      return route?.params.edit ? { ...route.params } : { ...bookingState }
    }, [bookingState, route]),
    mode: 'onChange',
  });

  useEffect(() => {
    isParamsTable && setValue('table', isParamsTable)
    route?.params?.employee && setSelectedEmployee(route?.params?.employee)
  }, [getValues, route])

  useEffect(() => {
    isOpenTableModal && navigation.navigate('tablesScreen',
      { ...route.params, selectTable: isParamsTable ? isParamsTable : null, editTable: true })

    return () => setIsOpenTableModal(false)
  }, [isOpenTableModal, navigation])

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
            label="Name"
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
              label="Date"
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

      <View style={{ flexDirection: 'row' }}>
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
                  label="Start time"
                  style={{ ...styles.mv5p, flex: 1 }}
                  value={value}
                  focusable={false}
                  caretHidden={true}
                  onBlur={onBlur}
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
                label="End time"
                style={styles.mv5p}
                value={value}
                focusable={false}
                caretHidden={true}
                onBlur={onBlur}
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
      </View>
      <HelperText type="error">{errors.endTime?.message}</HelperText>

      {/* TABLE MODAL */}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          const roomName = findRoom(value?.id)
          const newValue = value?.name ? `${roomName.name} ${value?.name}` : ""
          return (
            <>
              <TextInput
                autoCorrect={false}
                mode="outlined"
                label=" Select tables"
                style={styles.mv5p}
                value={newValue}
                onTouchStart={() => {
                  setIsOpenTableModal(true);
                }}
                showSoftInputOnFocus={false}
                focusable={false}
                caretHidden={true}
              />
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
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Inser phone number"
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

      <View style={{ flexDirection: 'row' }}>
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

      </View>
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
            label="Add comment"
            style={styles.mv5p}
            selectionColor={colors.white}
            underlineColor={colors.white}
            activeUnderlineColor={colors.white}
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

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <TextInput
                autoCorrect={false}
                mode="outlined"
                label="emploee"
                style={styles.mv5p}
                value={selectedEmployee?.name || ""}
                onTouchStart={() => {
                  setIsOpenEmploeeModal(true);
                }}
                showSoftInputOnFocus={false}
                focusable={false}
                caretHidden={true}
              />

              <ModaLayout
                visible={isOpenEmploeeModal}
                onCancel={() => setIsOpenEmploeeModal(false)}
                title={'Select employee'}
                addBtn={true}
                addCallBack={() => setIsShowInput(true)}
                onSave={() => {
                  onChange(selectedEmployee)
                  setIsOpenEmploeeModal(false)
                }}
              >
                <Employees
                  isShowInput={isShowInput}
                  onCancel={() => {
                    setSelectedEmployee(null)
                    setIsShowInput(false)
                  }}
                  setIsShowInput={setIsShowInput}
                  setSelectedEmployee={setSelectedEmployee}
                />
              </ModaLayout>
            </>
          )
        }}
        name="employee"
      />


      <View>
        <Button
          style={styles.mv25p}
          mode="contained"
          onPress={handleSubmit(onSubmitWithMode)}
          disabled={!isValid}>
          {route?.params?.edit ? 'Edit' : 'Save'}
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
    flex: 1
  },
  mv25p: {
    marginVertical: 25,
  },
  mb150: {
    marginBottom: 150,
  },
});

export default BookingForm;
