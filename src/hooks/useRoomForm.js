import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCreateRoomMutation } from '../store/api/roomsApi';
import { useGetAllTablesQuery } from '../store/api/tablesApi';



const useRoomForm = () => {
  const { data: tablesData } = useGetAllTablesQuery();
  const [createRoom, { isLoading: createRoomLoading }] = useCreateRoomMutation();
  const [expanded, setExpanded] = useState(false);
  const handleOpenTableSelect = () => setExpanded(!expanded);
  const navigate = useNavigation()

  const handleCreateRoom = async (data) => {
    const newData = { ...data, tables: [`/api/tables/${data.tables.id}`] };

    await createRoom(newData)
      .unwrap()
      .then((res) => {
        if (res) {
          navigate.goBack()
        }
      })
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'));
  };

  return { tablesData, expanded, createRoomLoading, handleOpenTableSelect, handleCreateRoom };
};

export default useRoomForm;