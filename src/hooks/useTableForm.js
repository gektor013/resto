import { useEffect, useState } from "react";
import { useGetAllRoomsQuery, useLazyGetAllRoomsQuery } from "../store/api/roomsApi";
import { useCreateTableMutation, useDeleteTableMutation, useGetTableByIdQuery, usePatchTableDataMutation } from "../store/api/tablesApi";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { deletedTableSlice, editTableSlice, setAllRoomsData, setNewTableToRoomSlice } from "../store/slice/roomsSlice";
import { createUnicId } from "../utils/helpers";



const useTableForm = () => {
  const { data: roomsData } = useGetAllRoomsQuery();
  const [createTable, { isLoading: createTableLoading }] = useCreateTableMutation();
  const [getAllRooms] = useLazyGetAllRoomsQuery()
  const [patchTableData, { isLoading: patchTableLoading }] = usePatchTableDataMutation()
  const [deleteTable, { isLoading: daleteTableLoading }] = useDeleteTableMutation()

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const requestNewAllRoomData = async () => {
    await getAllRooms().unwrap()
      .then(res => {
        if (res) {
          dispatch(setAllRoomsData(res))
        }
      }).catch((e) => console.log(e, 'requestNewAllRoomData ERROR'))
  }

  const onCreateTable = async (data) => {
    // const newData = { ...data, room: `/api/rooms/${data.room.id}` };

    await createTable(newData)
      .unwrap()
      .then((res) => {
        if (res) {
          // requestNewAllRoomData()
          // navigation.goBack()
        }
      })
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
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
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
      .finally(() => navigation.goBack())
  }



  return {

  }
}

export default useTableForm