import { useEffect } from 'react'
import { setUnsyncEmployeeToUnsyncCreated } from '../store/slice/bookingsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery } from '../store/api/employeeApi';
import { deletedEmployeesCS, unsyncEmployeesDataCS, removeUnsyncEmployee, setAllEmployeesData, clearDeletedEmployee, } from '../store/slice/employeesSlice';

const useEmployees = (isConnected) => {
  const dispatch = useDispatch()

  const unsyncEmployees = useSelector(unsyncEmployeesDataCS);
  const deletedEmployees = useSelector(deletedEmployeesCS);


  const [createEmployee] = useCreateEmployeeMutation()
  const [deleteEmployee] = useDeleteEmployeeMutation()


  const sendUnsyncCreatedEmployees = async () => {
    await createEmployee(unsyncEmployees[0]).unwrap()
      .then(res => {
        dispatch(removeUnsyncEmployee(unsyncEmployees[0]))
        dispatch(setUnsyncEmployeeToUnsyncCreated({ id: res.id, ...unsyncEmployees[0] }))
      })
      .catch(e => {
        console.log(e, 'sendUnsyncCreatedEmployees ERROR')
      })
  }

  const onDeleteEmployees = async () => {
    Array.from(deletedEmployees, (employee) => {
      deleteEmployee(employee.id).unwrap()
        .then(() => dispatch(clearDeletedEmployee()))
        .catch((e) => console.log(e, 'onDeleteEmployees ERROR'))
    })
  }

  useEffect(() => {
    if (deletedEmployees?.length && isConnected) {
      onDeleteEmployees()
    }
  }, [deletedEmployees, isConnected])

  return {
    unsyncEmployees, sendUnsyncCreatedEmployees
  }
}


export default useEmployees;