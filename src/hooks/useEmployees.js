import { useEffect, useState } from 'react'
import { createdUnsyncBookingCS, setUnsyncEmployeeToUnsyncCreated } from '../store/slice/bookingsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery } from '../store/api/employeeApi';
import { deletedEmployeesCS, unsyncEmployeesDataCS, removeUnsyncEmployee, setAllEmployeesData, clearDeletedEmployee, } from '../store/slice/employeesSlice';
import { isNeedUpdateCS } from '../store/slice/controlSlice';

const useEmployees = (isConnected) => {
  const [isEmployeeSynchronaized, setIsEmployeeSynchronaized] = useState(false)
  const dispatch = useDispatch()

  const { created: createdUnsyncBooking, edited: editUnsyncBookings } = useSelector(createdUnsyncBookingCS)
  const isNeedUpdate = useSelector(isNeedUpdateCS)

  const unsyncEmployees = useSelector(unsyncEmployeesDataCS);
  const deletedEmployees = useSelector(deletedEmployeesCS);

  const [createEmployee] = useCreateEmployeeMutation()
  const [deleteEmployee] = useDeleteEmployeeMutation()

  const sendUnsyncCreatedEmployees = async (data) => {
    await createEmployee(data).unwrap()
      .then(res => {
        dispatch(removeUnsyncEmployee(data))
        dispatch(setUnsyncEmployeeToUnsyncCreated({ id: res.id, ...data }))
      })
      .catch(e => {
        console.log(e, 'sendUnsyncCreatedEmployees ERROR')
      })
  }

  const onDeleteEmployees = async () => {
    Array.from(deletedEmployees, (employee) => {
      deleteEmployee(employee.id).unwrap()
        .then(() => dispatch(clearDeletedEmployee(employee)))
        .catch((e) => console.log(e, 'onDeleteEmployees ERROR'))
    })
  }

  useEffect(() => {
    if (!unsyncEmployees?.length && !isEmployeeSynchronaized && isConnected && !isNeedUpdate) {
      setIsEmployeeSynchronaized(true)
    }

    if (isConnected === false) {
      setIsEmployeeSynchronaized(false)
    }
  }, [isConnected, isNeedUpdate, unsyncEmployees])

  useEffect(() => {
    if (deletedEmployees?.length && isConnected) {
      onDeleteEmployees()
    }
  }, [deletedEmployees, isConnected])

  useEffect(() => {
    if (createdUnsyncBooking?.length && unsyncEmployees?.length && isConnected && !isNeedUpdate) {
      sendUnsyncCreatedEmployees(unsyncEmployees[0])
    }
  }, [unsyncEmployees, isConnected, isNeedUpdate])
  return {
    isEmployeeSynchronaized, unsyncEmployees
    // unsyncEmployees, sendUnsyncCreatedEmployees
  }
}


export default useEmployees;