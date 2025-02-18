import { useEffect, useState, useMemo } from 'react';
import { useLazyGetAllRoomsQuery } from '../store/api/roomsApi';
import {
  useCreateTableMutation,
  useDeleteTableMutation,
} from '../store/api/tablesApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  createdTablesDataCS,
  deletedTablesDataCS,
  removeTableInDeletedTables,
  setAllRoomsData,
  updateTableDataSlice,
} from '../store/slice/roomsSlice';
import { isNeedUpdateCS } from '../store/slice/controlSlice';
import { updateBookingTable } from '../store/slice/bookingsSlice';
import { bookingsDataCS } from '../store/slice/bookingDataSlice';

const useTables = (isEmployeeSynchronaized, isConnected) => {
  const [isTableSynchronaized, setIsTableSynchronaized] = useState(false);
  const dispatch = useDispatch();

  const [createTable] = useCreateTableMutation();
  const [getAllRooms] = useLazyGetAllRoomsQuery();
  const [deleteTable] = useDeleteTableMutation();

  // create selector
  const isNeedUpdate = useSelector(isNeedUpdateCS);
  const unsyncCreatedTables = useSelector(createdTablesDataCS);
  const deletedTables = useSelector(deletedTablesDataCS);
  const { isEdit, isNewBooking } = useSelector(bookingsDataCS);

  // constants
  const isFormUnUsed = useMemo(
    () => !isNewBooking && !isEdit,
    [isEdit, isNewBooking],
  );
  const readyToUpdate = useMemo(
    () => isConnected && !isNeedUpdate,
    [isConnected, isNeedUpdate],
  );

  const requestNewAllRoomData = async () => {
    await getAllRooms()
      .unwrap()
      .then(res => {
        if (res) {
          dispatch(setAllRoomsData(res));
        }
      })
      .catch(e => console.log(e, 'requestNewAllRoomData ERROR'));
  };

  const onCreateTable = async data => {
    const body = {
      ...data,
      room: data.room.id ? `/api/rooms/${data.room.id}` : null,
    };

    await createTable(body)
      .unwrap()
      .then(res => {
        if (res) {
          dispatch(updateBookingTable({ id: res.id, ...data }));
          dispatch(updateTableDataSlice({ id: res.id, ...data }));
        }
      })
      .catch(e => console.log(e, 'onCreateTable ERROR'));
  };

  const onDeleteTable = async data => {
    await deleteTable(data.id)
      .unwrap()
      .then(() => {
        dispatch(removeTableInDeletedTables(data))
      })
      .catch(e => console.log(e, 'onDeleteTable ERROR'));
  };

  useEffect(() => {
    if (
      deletedTables?.length &&
      isFormUnUsed &&
      readyToUpdate &&
      isEmployeeSynchronaized
    ) {
      onDeleteTable(deletedTables[0]);
    }
  }, [deletedTables, isFormUnUsed, readyToUpdate, isEmployeeSynchronaized]);

  useEffect(() => {
    if (
      unsyncCreatedTables?.length &&
      isFormUnUsed &&
      readyToUpdate &&
      isEmployeeSynchronaized
    ) {
      onCreateTable(unsyncCreatedTables[0]);
    }
  }, [
    unsyncCreatedTables,
    isFormUnUsed,
    readyToUpdate,
    isEmployeeSynchronaized,
  ]);

  useEffect(() => {
    if (
      !unsyncCreatedTables?.length &&
      !isTableSynchronaized &&
      isEmployeeSynchronaized &&
      readyToUpdate
    ) {
      requestNewAllRoomData().finally(() => {
        setIsTableSynchronaized(true);
      });
    }

    if (isConnected === false) {
      setIsTableSynchronaized(false);
    }
  }, [
    unsyncCreatedTables,
    isTableSynchronaized,
    isEmployeeSynchronaized,
    readyToUpdate,
  ]);

  return {
    isTableSynchronaized,
  };
};

export default useTables;
