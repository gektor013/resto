import { useEffect, useMemo, useState } from 'react'
import { createdUnsyncBookingCS, setUnsyncEmployeeToUnsyncCreated } from '../store/slice/bookingsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeesQuery } from '../store/api/employeeApi';
import { deletedEmployeesCS, unsyncEmployeesDataCS, removeUnsyncEmployee, setAllEmployeesData, clearDeletedEmployee, } from '../store/slice/employeesSlice';
import { isNeedUpdateCS } from '../store/slice/controlSlice';
import { bookingsDataCS } from '../store/slice/bookingDataSlice';

const useEmployees = (isConnected) => {
  const [isEmployeeSynchronaized, setIsEmployeeSynchronaized] = useState(false)
  const dispatch = useDispatch()

  const { created: createdUnsyncBooking, } = useSelector(createdUnsyncBookingCS)
  const isNeedUpdate = useSelector(isNeedUpdateCS)

  const unsyncEmployees = useSelector(unsyncEmployeesDataCS);
  const deletedEmployees = useSelector(deletedEmployeesCS);
  const { isEdit, isNewBooking } = useSelector(bookingsDataCS)

  const [createEmployee] = useCreateEmployeeMutation()
  const [deleteEmployee] = useDeleteEmployeeMutation()

  //constants
  const createdUnsyncBookingLength = useMemo(() => createdUnsyncBooking?.length, [createdUnsyncBooking])
  const readyToUpdate = useMemo(() => isConnected && !isNeedUpdate, [isConnected, isNeedUpdate])
  const isFormUnUsed = useMemo(() => !isNewBooking && !isEdit, [isEdit, isNewBooking])


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

  // console.log(createdUnsyncBooking, createdUnsyncBookingLength, 'createdUnsyncBookingLength');
  // console.log(deletedEmployees, deletedEmployees?.length, 'deletedEmployees');
  const onDeleteEmployees = async () => {
    console.log('onDeleteEmployees');
    Array.from(deletedEmployees, (employee) => {
      deleteEmployee(employee.id).unwrap()
        .then(() => dispatch(clearDeletedEmployee(employee)))
        .catch((e) => console.log(e, 'onDeleteEmployees ERROR'))
    })
  }


  useEffect(() => {
    if (!unsyncEmployees?.length && !isEmployeeSynchronaized && readyToUpdate) {
      setIsEmployeeSynchronaized(true)
    }

    if (isConnected === false) {
      setIsEmployeeSynchronaized(false)
    }
  }, [readyToUpdate, unsyncEmployees])

  useEffect(() => {
    console.log(deletedEmployees?.length, readyToUpdate, isFormUnUsed);
    if (deletedEmployees?.length && readyToUpdate && isFormUnUsed) {
      onDeleteEmployees()
    }
  }, [deletedEmployees, readyToUpdate, isFormUnUsed])


  useEffect(() => {
    if (createdUnsyncBookingLength && unsyncEmployees?.length && readyToUpdate) {
      sendUnsyncCreatedEmployees(unsyncEmployees[0])
    }
  }, [createdUnsyncBookingLength, unsyncEmployees, readyToUpdate])
  return {
    isEmployeeSynchronaized
    // unsyncEmployees, sendUnsyncCreatedEmployees
  }
}


export default useEmployees;