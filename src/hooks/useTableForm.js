import { useEffect, useState, useMemo } from "react";
import { useLazyGetAllRoomsQuery } from "../store/api/roomsApi";
import { useCreateTableMutation, useDeleteTableMutation, usePatchTableDataMutation } from "../store/api/tablesApi";
import { useDispatch, useSelector } from "react-redux";
import { createdTablesDataCS, deletedTablesDataCS, removeTableInDeletedTables, setAllRoomsData, setNewTableToRoomSlice, updateTableDataSlice } from "../store/slice/roomsSlice";
import { isNeedUpdateCS } from "../store/slice/controlSlice";
import { updateBookingTable } from "../store/slice/bookingsSlice";
import { bookingsDataCS } from "../store/slice/bookingDataSlice";

const useTableForm = (isEmployeeSynchronaized, isConnected) => {
  const [isTableSynchronaized, setIsTableSynchronaized] = useState(false)
  const dispatch = useDispatch()

  // const { data: roomsData } = useGetAllRoomsQuery();
  const [createTable,] = useCreateTableMutation();
  const [getAllRooms] = useLazyGetAllRoomsQuery()
  const [patchTableData,] = usePatchTableDataMutation()
  const [deleteTable] = useDeleteTableMutation()

  // create selector
  const isNeedUpdate = useSelector(isNeedUpdateCS)
  const unsyncCreatedTables = useSelector(createdTablesDataCS)
  const deletedTables = useSelector(deletedTablesDataCS)
  const { isEdit, isNewBooking } = useSelector(bookingsDataCS)

  // constants
  const isFormUnUsed = useMemo(() => !isNewBooking && !isEdit, [isEdit, isNewBooking])
  const readyToUpdate = useMemo(() => isConnected && !isNeedUpdate, [isConnected, isNeedUpdate])
  // const requestNewAllRoomData = async () => {
  //   await getAllRooms().unwrap()
  //     .then(res => {
  //       if (res) {
  //         dispatch(setAllRoomsData(res))
  //       }
  //     }).catch((e) => console.log(e, 'requestNewAllRoomData ERROR'))
  // }

  const onCreatedTableSuccess = (data) => {
    dispatch(updateBookingTable(data))
    dispatch(updateTableDataSlice(data))
  }

  const onCreateTable = async (data) => {
    const newData = { ...data, room: data.room.id ? `/api/rooms/${data.room.id}` : null };

    await createTable(newData)
      .unwrap()
      .then((res) => {
        if (res) {
          console.log(res, 'RES');
          onCreatedTableSuccess({ id: res.id, ...data })
          // requestNewAllRoomData()
          // navigation.goBack()
        }
      })
      .catch((e) => console.log(e, 'onCreateTable ERROR'))
  };

  const onEditTable = async () => {
    await patchTableData(newData).unwrap()
      .then((res) => {
        if (res) {
          // requestNewAllRoomData()
          // navigation.goBack()
        }
      })
      .catch((e) => console.log(e, 'patchTableData ERROR'))
  }

  const onDeleteTable = async (data) => {
    // console.log(data, 'data');
    await deleteTable(data.id).unwrap()
      .then(() => dispatch(removeTableInDeletedTables(data)))
      .catch((e) => console.log(e, 'onDeleteTable ERROR'))
  }


  useEffect(() => {
    if (deletedTables?.length && isFormUnUsed && readyToUpdate && isEmployeeSynchronaized) {
      onDeleteTable(deletedTables[0])
    }
  }, [deletedTables, isFormUnUsed, readyToUpdate, isEmployeeSynchronaized])

  useEffect(() => {
    if (unsyncCreatedTables?.length && isFormUnUsed && readyToUpdate && isEmployeeSynchronaized) {
      onCreateTable(unsyncCreatedTables[0])
    }
  }, [unsyncCreatedTables, isFormUnUsed, readyToUpdate, isEmployeeSynchronaized])

  useEffect(() => {
    if (!unsyncCreatedTables?.length && !isTableSynchronaized && isEmployeeSynchronaized && readyToUpdate) {
      setIsTableSynchronaized(true)
    }

    if (isConnected === false) {
      setIsTableSynchronaized(false)
    }
  }, [unsyncCreatedTables, isTableSynchronaized, isEmployeeSynchronaized, readyToUpdate])

  return {
    isTableSynchronaized
  }
}

export default useTableForm