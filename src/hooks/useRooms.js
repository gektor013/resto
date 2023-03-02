import { useEffect, useMemo, useState } from 'react';
import { useCreateRoomMutation, useDeleteRoomMutation, usePatchRoomDataMutation } from '../store/api/roomsApi';
import { useDispatch, useSelector } from 'react-redux';
import { createdRoomsDataCS, editedRoomsDataCS, createRoomSlice, deletedRoomsSlice, deletedRoomsDataCS, updateRoomSlice } from '../store/slice/roomsSlice';
import { bookingsDataCS } from '../store/slice/bookingDataSlice';
import { isNeedUpdateCS } from '../store/slice/controlSlice';

const useRoom = (isTableSynchronaized, isConnected) => {
  const [isRoomSynchronaized, setIsRoomSynchronaized] = useState(false);

  const unsyncCreatedRooms = useSelector(createdRoomsDataCS)
  const unsyncEditedRooms = useSelector(editedRoomsDataCS)
  const unsyncDeletedRooms = useSelector(deletedRoomsDataCS)
  const { isEdit, isNewBooking } = useSelector(bookingsDataCS);
  const isNeedUpdate = useSelector(isNeedUpdateCS);

  const dispatch = useDispatch()

  const isFormUnUsed = useMemo(
    () => !isNewBooking && !isEdit,
    [isEdit, isNewBooking],
  );
  const readyToUpdate = useMemo(
    () => isConnected && !isNeedUpdate,
    [isConnected, isNeedUpdate],
  );

  const [createRoom] = useCreateRoomMutation();
  const [patchRoomData] = usePatchRoomDataMutation()
  const [deleteRoom] = useDeleteRoomMutation()


  const onCreatesRooms = async (data) => {
    const haveID = data.tables.every(tabel => tabel.id)
    if (!haveID) return

    const tableIRI = data.tables.map(table => `api/tables/${table.id}`)

    const body = { ...data, tables: tableIRI }

    await createRoom(body)
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(updateRoomSlice({ id: res.id, ...data }))
        }
      })
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
  }

  const onEditRooms = async () => {
    Array.from(unsyncEditedRooms, (room) => {
      patchRoomData(room).unwrap()
        .then((res) => {
          // if (res) {
          //   // navigate.goBack()
          // }
        })
        .catch((e) => console.log(e, 'patchRoomData ERROR'))
    })
  }

  const onDeleteRooms = async () => {
    Array.from(unsyncDeletedRooms, (room) => {
      deleteRoom(room.id).unwrap()
        .catch((e) => console.log(e, 'handleDeleteRoom ERROR'))
      // .finally(() => navigate.goBack())
    })
  }

  useEffect(() => {
    if (
      unsyncCreatedRooms?.length &&
      isFormUnUsed &&
      readyToUpdate &&
      isTableSynchronaized
    ) {
      onCreatesRooms(unsyncCreatedRooms[0]);
    }
  }, [
    unsyncCreatedRooms,
    isFormUnUsed,
    readyToUpdate,
    isTableSynchronaized,
  ]);

  useEffect(() => {
    if (
      !unsyncCreatedRooms?.length &&
      !isRoomSynchronaized &&
      isTableSynchronaized &&
      readyToUpdate
    ) {
      setIsRoomSynchronaized(true)
    }

    if (isConnected === false) {
      setIsRoomSynchronaized(false);
    }
  }, [
    unsyncCreatedRooms,
    isRoomSynchronaized,
    isTableSynchronaized,
    readyToUpdate,
  ]);


  return {
    isRoomSynchronaized
  };
};

export default useRoom;