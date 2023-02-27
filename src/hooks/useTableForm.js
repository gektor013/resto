import { useEffect, useState } from "react";
import { useGetAllRoomsQuery, useLazyGetAllRoomsQuery } from "../store/api/roomsApi";
import { useCreateTableMutation, useDeleteTableMutation, useGetTableByIdQuery, usePatchTableDataMutation } from "../store/api/tablesApi";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { editTableSlice, setAllRoomsData, setNewTableToRoomSlice } from "../store/slice/roomsSlice";
import { createUnicId } from "../utils/helpers";



const useTableForm = (route) => {
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

  const handleCreateTable = async (data) => {
    // const newData = { ...data, room: `/api/rooms/${data.room.id}` };

    // console.log(!data.internalID);
    // console.log({ ...data, internalID: createUnicId() });
    if (!data?.id && !data?.internalID) {
      dispatch(setNewTableToRoomSlice({ ...data, internalID: createUnicId() }))
      navigation.goBack()
    } else {
      dispatch(editTableSlice(data))
      navigation.goBack()
    }
    // console.log(data, 'DATA');
    // {
    //   id ? (
    //     await patchTableData(newData).unwrap()
    //       .then((res) => {
    //         if (res) {
    //           requestNewAllRoomData()
    //           navigation.goBack()
    //         }
    //       })
    //       .catch((e) => console.log(e, 'patchTableData ERROR'))

    //   ) : (
    //     await createTable(newData)
    //       .unwrap()
    //       .then((res) => {
    //         if (res) {
    //           requestNewAllRoomData()
    //           navigation.goBack()
    //         }
    //       })
    //       .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
    //   )
    // }
  };

  const handleTableDelete = async () => {
    await deleteTable(id).unwrap()
      .then(() => getAllRooms())
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
      .finally(() => navigation.goBack())
  }



  return {
    roomsData, createTableLoading, patchTableLoading, daleteTableLoading, handleCreateTable, handleTableDelete
  }
}

export default useTableForm