import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Surface, TextInput, useTheme } from 'react-native-paper';
import { setBookingData } from '../../store/slice/bookingDataSlice';
import {
  setToUnsynchronized,
  deleteEmployeesData,
  unsyncEmployeesDataCS,
  allEmployeesCS,
} from '../../store/slice/employeesSlice';
import { createdUnsyncBookingCS } from '../../store/slice/bookingsSlice';

const initialState = {
  name: '',
};
const useEmployees = () => {
  const [employeeName, setEmployeeName] = useState(initialState);
  // const { allEmployees, unsyncEmployees } = useSelector(state => state.employees)
  const { created: createdUnsyncBooking, edited: editUnsyncBookings } =
    useSelector(createdUnsyncBookingCS);
  const unsyncEmployees = useSelector(unsyncEmployeesDataCS);
  const allEmployees = useSelector(allEmployeesCS);
  const dispatch = useDispatch();
  // const [deleteEmployee] = useDeleteEmployeeMutation()

  const changeValue = value => {
    setEmployeeName({ name: value });
  };

  const handleDeleteEmployee = async (employee, selectedEmployee) => {
    if (JSON.stringify(employee) === JSON.stringify(selectedEmployee)) {
      return;
    }

    const unsyncCreatedBookingWithEmployeeId = createdUnsyncBooking.find(
      booking => booking.employee.id && booking.employee.id === employee.id,
    );
    const unsyncCreatedBookingWithEmployeeInternalId =
      createdUnsyncBooking.find(
        booking =>
          booking.employee.internalID &&
          booking.employee.internalID === employee.internalID,
      );
    const unsyncEditedBookingWithEmployeeId = editUnsyncBookings.find(
      booking => booking.employee.id && booking.employee.id === employee.id,
    );
    const unsyncEditedBookingWithEmployeeInternalId = editUnsyncBookings.find(
      booking =>
        booking.employee.internalID &&
        booking.employee.internalID === employee.internalID,
    );

    if (
      unsyncCreatedBookingWithEmployeeId ||
      unsyncCreatedBookingWithEmployeeInternalId ||
      unsyncEditedBookingWithEmployeeId ||
      unsyncEditedBookingWithEmployeeInternalId
    ) {
      Alert.alert(
        'Attention!',
        'It is impossible to remove the employee because he is contained in non -synchronized booking!',
      );
    } else {
      if (employee.id) {
        dispatch(deleteEmployeesData(employee.id));
      } else {
        dispatch(deleteEmployeesData(employee.internalID));
      }
    }
  };

  const setEmployeeToStorage = () => {
    dispatch(
      setToUnsynchronized({
        ...employeeName,
        unsync: true,
        internalID: uuid.v4(),
      }),
    );
    setEmployeeName(initialState);
  };

  return {
    allEmployees,
    unsyncEmployees,
    employeeName,
    handleDeleteEmployee,
    setEmployeeToStorage,
    changeValue,
  };
};

const Employees = ({
  isShowInput,
  onCancel,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    allEmployees,
    unsyncEmployees,
    employeeName,
    handleDeleteEmployee,
    setEmployeeToStorage,
    changeValue,
  } = useEmployees();

  const onSelectedEmployee = employee => {
    setSelectedEmployee(employee);
    dispatch(setBookingData({ id: 'employee', data: employee }));
  };

  // useEffect(() => {
  //   createEmployeeSuccess && setIsShowInput(!createEmployeeSuccess)
  // }, [createEmployeeSuccess])

  return (
    <SafeAreaView style={styles.container}>
      {
        <>
          {isShowInput ? (
            <View style={styles.createEmployeeContainer}>
              <TextInput
                mode="outlined"
                label="Name"
                style={styles.mv5p}
                selectionColor={colors.white}
                underlineColor={colors.white}
                activeUnderlineColor={colors.white}
                value={employeeName.name || ''}
                onChangeText={value => changeValue(value)}
              />
              <View style={styles.btnContainer}>
                <Button
                  style={{ ...styles.btn, marginRight: 10 }}
                  mode="contained"
                  onPress={onCancel}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  style={styles.btn}
                  // loading={createEmployeeLoading}
                  onPress={setEmployeeToStorage}
                  disabled={employeeName.name === ''}>
                  Save
                </Button>
              </View>
            </View>
          ) : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            {[...allEmployees, ...unsyncEmployees]?.map(employee => (
              <TouchableOpacity
                key={employee.id || employee.internalID}
                onLongPress={() =>
                  handleDeleteEmployee(employee, selectedEmployee)
                }
                onPress={() => onSelectedEmployee(employee)}>
                <Surface
                  style={{
                    ...styles.surface,
                    backgroundColor:
                      (employee.unsync && '#ebab3e') ||
                      (employee?.id === selectedEmployee?.id
                        ? colors.onPrimaryContainer
                        : '#3fab1a'),
                  }}
                  elevation={4}>
                  <Text>{employee.name}</Text>
                </Surface>
              </TouchableOpacity>
            ))}
          </View>
        </>
      }
    </SafeAreaView>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  createEmployeeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mv5p: {
    marginVertical: 5,
    flex: 1,
    marginRight: 10,
  },
  surface: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3fab1a',
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: 'row',

    justifyContent: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    height: 40,
  },
});
