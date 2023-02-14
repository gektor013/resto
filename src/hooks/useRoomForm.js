import { useNavigation } from '@react-navigation/native';
import { useCreateRoomMutation, useDeleteRoomMutation, usePatchRoomDataMutation } from '../store/api/roomsApi';

const useRoomForm = (route) => {
  const [createRoom, { isLoading: createRoomLoading }] = useCreateRoomMutation();
  const [patchRoomData, { isLoading: patchLoading }] = usePatchRoomDataMutation()
  const [deleteRoom, { isLoading: deleteLoading }] = useDeleteRoomMutation()
  const navigate = useNavigation()

  const handleCreateRoom = async (data) => {
    {
      route.params ? (
        await patchRoomData(data).unwrap()
          .then((res) => {
            if (res) {
              navigate.goBack()
            }
          })
          .catch((e) => console.log(e, 'patchRoomData ERROR'))
      ) : (
        await createRoom(data)
          .unwrap()
          .then((res) => {
            if (res) {
              navigate.goBack()
            }
          })
          .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
      )
    }
  };

  const handleDeleteRoom = async () => {
    const id = route?.params?.id
    await deleteRoom(id).unwrap()
      .catch((e) => console.log(e, 'handleDeleteRoom ERROR'))
      .finally(() => navigate.goBack())
  }

  return { createRoomLoading, patchLoading, deleteLoading, handleDeleteRoom, handleCreateRoom };
};

export default useRoomForm;