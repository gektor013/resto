import { useEffect, useState } from "react";
import { useGetAllRoomsQuery, useLazyGetAllRoomsQuery } from "../store/api/roomsApi";
import { useCreateTableMutation, useDeleteTableMutation, useGetTableByIdQuery, usePatchTableDataMutation } from "../store/api/tablesApi";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { setAllRoomsData } from "../store/slice/roomsSlice";



const useTableForm = (id) => {
  const { data: roomsData } = useGetAllRoomsQuery();
  const [createTable, { isLoading: createTableLoading }] = useCreateTableMutation();
  const [getAllRooms] = useLazyGetAllRoomsQuery()
  const [patchTableData, { isLoading: patchTableLoading }] = usePatchTableDataMutation()
  const [deleteTable, { isLoading: daleteTableLoading }] = useDeleteTableMutation()
  const [expanded, setExpanded] = useState(false);
  const handleOpenTableSelect = () => setExpanded(!expanded);
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
    const newData = { ...data, room: `/api/rooms/${data.room.id}` };

    {
      id ? (
        await patchTableData(newData).unwrap()
          .then((res) => {
            if (res) {
              requestNewAllRoomData()
              navigation.goBack()
            }
          })
          .catch((e) => console.log(e, 'patchTableData ERROR'))

      ) : (
        await createTable(newData)
          .unwrap()
          .then((res) => {
            if (res) {
              requestNewAllRoomData()
              navigation.goBack()
            }
          })
          .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
      )
    }
  };

  const handleTableDelete = async () => {
    await deleteTable(id).unwrap()
      .then(() => getAllRooms())
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
      .finally(() => navigation.goBack())
  }



  return {
    roomsData, expanded, createTableLoading, patchTableLoading, daleteTableLoading, handleOpenTableSelect, handleCreateTable, handleTableDelete
  }
}

export default useTableForm