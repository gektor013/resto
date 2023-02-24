import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Surface, TextInput, useTheme } from 'react-native-paper'
import { setBookingData } from '../../store/slice/bookingDataSlice'
import { setToUnsynchronized, deleteEmployeesData } from '../../store/slice/employeesSlice'
import { useCreateEmployeeMutation, useDeleteEmployeeMutation } from '../../store/api/employeeApi'

const initialState = {
  name: ''
}
const useEmployees = () => {
  const [employeeName, setEmployeeName] = useState(initialState)
  const { allEmployees, unsyncEmployees } = useSelector(state => state.employees)

  const dispatch = useDispatch()
  const [deleteEmployee] = useDeleteEmployeeMutation()
  const [createEmployee, { isLoading: createEmployeeLoading, isSuccess: createEmployeeSuccess }] = useCreateEmployeeMutation()

  const changeValue = (value) => {
    setEmployeeName({ name: value })
  }

  const handleDeleteEmployee = async (employee) => {
    if (employee.id) {
      dispatch(deleteEmployeesData(employee.id))
    } else {
      dispatch(deleteEmployeesData(employee.internalID))
    }
    dispatch(deleteEmployeesData(id))
    // await deleteEmployee(employee).unwrap()
    //   .catch(e => console.log(e, 'handleDeleteEmployee ERROR'))
  }

  const setEmployeeToStorage = () => {
    dispatch(setToUnsynchronized({ ...employeeName, unsync: true, internalID: uuid.v4() }))
    setEmployeeName(initialState)
  }

  // const handleCreateEmployee = async () => {
  //   Array.from(unsyncEmployees, (employee) => {
  //     createEmployee(employee).unwrap()
  //       .then(res => {

  //       })
  //       .catch(e => console.log(e, 'handleCreateEmployee'))
  //   })
  // }



  return {
    allEmployees, unsyncEmployees, employeeName, createEmployeeLoading, createEmployeeSuccess, handleDeleteEmployee, setEmployeeToStorage, changeValue
  }
}



const Employees = ({ isShowInput, setIsShowInput, onCancel, selectedEmployee, setSelectedEmployee }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { allEmployees, unsyncEmployees, employeeName, createEmployeeLoading, createEmployeeSuccess, handleDeleteEmployee, setEmployeeToStorage, changeValue } = useEmployees()

  const onSelectedEmployee = (employee) => {
    setSelectedEmployee(employee)
    dispatch(setBookingData({ id: 'employee', data: employee }))
  }

  useEffect(() => {
    createEmployeeSuccess && setIsShowInput(!createEmployeeSuccess)
  }, [createEmployeeSuccess])


  return (
    <SafeAreaView style={styles.container}>
      {
        <>
          {
            isShowInput ? (
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
                    onPress={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    style={styles.btn}
                    // loading={createEmployeeLoading}
                    onPress={setEmployeeToStorage}
                    disabled={employeeName.name === ""}
                  >
                    Save
                  </Button>
                </View>
              </View>
            ) : null
          }
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            {
              [...allEmployees, ...unsyncEmployees]?.map(employee => (
                <TouchableOpacity key={employee.id || employee.internalID}
                  onLongPress={() => handleDeleteEmployee(employee)}
                  onPress={() => onSelectedEmployee(employee)}>
                  <Surface style={{ ...styles.surface, backgroundColor: employee.unsync && '#ebab3e' || (employee?.id === selectedEmployee?.id ? colors.onPrimaryContainer : '#3fab1a') }} elevation={4}>
                    <Text>{employee.name}</Text>
                  </Surface>
                </TouchableOpacity>
              ))
            }
          </View>
        </>
      }
    </SafeAreaView>
  )
}

export default Employees

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  createEmployeeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mv5p: {
    marginVertical: 5,
    flex: 1,
    marginRight: 10
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
    borderRadius: 10
  },
  btnContainer: {
    flexDirection: 'row',

    justifyContent: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    height: 40
  }
})