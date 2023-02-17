import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import { Button, Surface, TextInput, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateEmployeeMutation, useDeleteEmployeeMutation } from '../../store/api/employeeApi'
import { createEmployeeData, deleteEmployeesData } from '../../store/slice/employeesSlice'

const initialState = {
  name: ''
}
const useEmployees = () => {
  const [employeeName, setEmployeeName] = useState(initialState)

  const dispatch = useDispatch()
  const [deleteEmployee] = useDeleteEmployeeMutation()
  const [createEmployee, { isLoading: createEmployeeLoading }] = useCreateEmployeeMutation()

  const changeValue = (value) => {
    setEmployeeName({ name: value })
  }

  const handleDeleteEmployee = async (id) => {
    dispatch(deleteEmployeesData(id))
    await deleteEmployee(id).unwrap()
      .catch(e => console.log(e, 'handleDeleteEmployee ERROR'))
  }

  const handleCreateEmployee = async (name) => {
    await createEmployee(name).unwrap()
      .then(res => {
        if (res) {
          dispatch(createEmployeeData(res))
          setEmployeeName(initialState)
        }
      })
  }
  return {
    employeeName, createEmployeeLoading, handleDeleteEmployee, handleCreateEmployee, changeValue
  }
}



const Employees = ({ isShowInput, onCancel, onSave, selectedEmployee, setSelectedEmployee }) => {
  // const [value, setValue] = useState(selectedTable?.room?.id || 1);
  const { employees } = useSelector(state => state.employees)
  const { colors } = useTheme();
  const { employeeName, createEmployeeLoading, handleDeleteEmployee, handleCreateEmployee, } = useEmployees()



  return (
    <SafeAreaView style={styles.container}>
      {
        <>
          {
            isShowInput ? (
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  mode="outlined"
                  label="Name"
                  style={styles.mv5p}
                  selectionColor={colors.white}
                  underlineColor={colors.white}
                  activeUnderlineColor={colors.white}
                  value={employeeName.name || ''}
                  // onBlur={onBlur}
                  onChangeText={value => changeValue(value)}
                // error={errors.name && true}
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
                    loading={createEmployeeLoading}
                    onPress={() => handleCreateEmployee(employeeName)}
                  // disabled={disabled}
                  // disabled={errors?.startTime || errors?.endTime}
                  >
                    Save
                  </Button>
                </View>
              </View>
            ) : null
          }
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            {
              employees?.map(employee => (
                <TouchableOpacity key={employee.id}
                  onLongPress={() => handleDeleteEmployee(employee.id)}
                  onPress={() => setSelectedEmployee(employee)}>
                  <Surface style={{ ...styles.surface, backgroundColor: '#3fab1a' }} elevation={4}>
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
    // flex: 1,
    alignItems: 'flex-start',
  },
  mv5p: {
    marginVertical: 5,
    flex: 1,
    marginRight: 10
    // height: 50
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
    // minWidth: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    height: 40
  }
})