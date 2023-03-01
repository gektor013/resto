import {useEffect, useMemo, useState} from 'react';
import {
  createdUnsyncBookingCS,
  setUnsyncEmployeeToUnsyncCreated,
} from '../store/slice/bookingsSlice';
import {useDispatch, useSelector} from 'react-redux';

import {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from '../store/api/employeeApi';
import {
  deletedEmployeesCS,
  unsyncEmployeesDataCS,
  removeUnsyncEmployee,
  setAllEmployeesData,
  clearDeletedEmployee,
} from '../store/slice/employeesSlice';
import {isNeedUpdateCS} from '../store/slice/controlSlice';
import {bookingsDataCS} from '../store/slice/bookingDataSlice';

const useEmployees = isConnected => {
  const [isEmployeeSynchronaized, setIsEmployeeSynchronaized] = useState(false);
  const dispatch = useDispatch();

  const {created: createdUnsyncBooking} = useSelector(createdUnsyncBookingCS);
  const isNeedUpdate = useSelector(isNeedUpdateCS);

  const unsyncEmployees = useSelector(unsyncEmployeesDataCS);
  const deletedEmployees = useSelector(deletedEmployeesCS);
  const {isEdit, isNewBooking} = useSelector(bookingsDataCS);

  const [createEmployee] = useCreateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  //constants
  const createdUnsyncBookingLength = useMemo(
    () => createdUnsyncBooking?.length,
    [createdUnsyncBooking],
  );
  const unsyncEmployeesLength = useMemo(
    () => unsyncEmployees?.length,
    [unsyncEmployees],
  );
  const deletedEmployeesLength = useMemo(
    () => deletedEmployees?.length,
    [deletedEmployees],
  );
  const readyToUpdate = useMemo(
    () => isConnected && !isNeedUpdate,
    [isConnected, isNeedUpdate],
  );
  const isFormUnUsed = useMemo(
    () => !isNewBooking && !isEdit,
    [isEdit, isNewBooking],
  );

  console.log('deletedEmployees', deletedEmployees);
  console.log('unsyncEmployees', unsyncEmployees);

  const sendUnsyncCreatedEmployees = async data => {
    await createEmployee(data)
      .unwrap()
      .then(res => {
        dispatch(removeUnsyncEmployee(data));
        dispatch(setUnsyncEmployeeToUnsyncCreated({id: res.id, ...data}));
      })
      .catch(e => {
        console.log(e, 'sendUnsyncCreatedEmployees ERROR');
      });
  };

  const onDeleteEmployees = async data => {
    console.log('data', data);
    deleteEmployee(data.id)
      .unwrap()
      .then(() => dispatch(clearDeletedEmployee(data)))
      .catch(e => console.log(e, 'onDeleteEmployees ERROR'));
  };

  useEffect(() => {
    if (!unsyncEmployeesLength && !isEmployeeSynchronaized && readyToUpdate) {
      setIsEmployeeSynchronaized(true);
    }

    if (isConnected === false) {
      setIsEmployeeSynchronaized(false);
    }
  }, [readyToUpdate, unsyncEmployees]);

  useEffect(() => {
    if (createdUnsyncBookingLength && unsyncEmployeesLength && readyToUpdate) {
      sendUnsyncCreatedEmployees(unsyncEmployees[0]);
    }
  }, [createdUnsyncBookingLength, unsyncEmployees, readyToUpdate]);

  useEffect(() => {
    console.log(deletedEmployeesLength, readyToUpdate, isFormUnUsed);
    if (deletedEmployeesLength && readyToUpdate && isFormUnUsed) {
      onDeleteEmployees(deletedEmployees[0]);
    }
  }, [deletedEmployeesLength, readyToUpdate, isFormUnUsed]);

  return {
    isEmployeeSynchronaized,
    // unsyncEmployees, sendUnsyncCreatedEmployees
  };
};

export default useEmployees;
