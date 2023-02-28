import { useEffect, useState } from "react";
import { useGetAllRoomsQuery, useLazyGetAllRoomsQuery } from "../store/api/roomsApi";
import { useCreateTableMutation, useDeleteTableMutation, useGetTableByIdQuery, usePatchTableDataMutation } from "../store/api/tablesApi";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { allRoomsDataCS, createdRoomsDataCS, createdTablesDataCS, deletedTableSlice, editTableSlice, setAllRoomsData, setNewTableToRoomSlice, updateTableDataSlice } from "../store/slice/roomsSlice";
import { createUnicId } from "../utils/helpers";
import { isNeedUpdateCS } from "../store/slice/controlSlice";
import { updateBookingTable } from "../store/slice/bookingsSlice";
import { bookingsDataCS } from "../store/slice/bookingDataSlice";

const useTableForm = (isEmployeeSynchronaized, isConnected) => {
  const [isTableSynchronaized, setIsTableSynchronaized] = useState(false)

  const { data: roomsData } = useGetAllRoomsQuery();
  const [createTable, { isLoading: createTableLoading }] = useCreateTableMutation();
  const [getAllRooms] = useLazyGetAllRoomsQuery()
  const [patchTableData, { isLoading: patchTableLoading }] = usePatchTableDataMutation()
  const [deleteTable, { isLoading: daleteTableLoading }] = useDeleteTableMutation()

  const isNeedUpdate = useSelector(isNeedUpdateCS)
  const unsyncCreatedTables = useSelector(createdTablesDataCS)
  const allRooms = useSelector(allRoomsDataCS)
  const createdRooms = useSelector(createdRoomsDataCS)
  // console.log(allRooms[2], 'allRoomsDataCS');
  // console.log(JSON.stringify(createdRooms), 'createdRooms');
  // console.log(JSON.stringify(createdRooms), 'createdRooms');

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const { isEdit, isNewBooking } = useSelector(bookingsDataCS)

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


    //  const {} = createdTables
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

  const onDeleteTable = async () => {
    await deleteTable(id).unwrap()
      // .then(() => getAllRooms())
      .catch((e) => console.log(e, 'onDeleteTable ERROR'))
      .finally(() => navigation.goBack())
  }


  useEffect(() => {
    if (unsyncCreatedTables?.length && !isNewBooking && !isEdit && isConnected && !isNeedUpdate && isEmployeeSynchronaized) {
      onCreateTable(unsyncCreatedTables[0])
    }
  }, [unsyncCreatedTables, isNewBooking, isEdit, isConnected, isNeedUpdate, isEmployeeSynchronaized])

  useEffect(() => {
    if (!unsyncCreatedTables?.length && !isTableSynchronaized && isEmployeeSynchronaized && isConnected && !isNeedUpdate) {
      setIsTableSynchronaized(true)
    }

    if (isConnected === false) {
      setIsTableSynchronaized(false)
    }
  }, [unsyncCreatedTables, isTableSynchronaized, isEmployeeSynchronaized, isConnected, isNeedUpdate])

  return {
    isTableSynchronaized
  }
}

export default useTableForm