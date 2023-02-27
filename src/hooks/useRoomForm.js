import { useNavigation } from '@react-navigation/native';
import { useCreateRoomMutation, useDeleteRoomMutation, usePatchRoomDataMutation } from '../store/api/roomsApi';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomSlice, patchRoomSlice, allRoomsDataCS, createdRoomsDataCS, editedRoomsSlice, editedRoomsDataCS } from '../store/slice/roomsSlice';
import { useEffect, useState } from 'react';
import { createUnicId } from '../utils/helpers';

const useRoomForm = (route) => {
  const allRoomsData = useSelector(allRoomsDataCS)
  const createdRoomsData = useSelector(createdRoomsDataCS)
  const editedRoomsData = useSelector(editedRoomsDataCS)

  // console.log(allRoomsData[0], 'allRoomsData');
  // console.log(createdRoomsData, 'createdRoomsData');
  // console.log(editedRoomsData, 'editedRoomsData');


  const [createRoom, { isLoading: createRoomLoading }] = useCreateRoomMutation();
  const [patchRoomData, { isLoading: patchLoading }] = usePatchRoomDataMutation()
  const [deleteRoom, { isLoading: deleteLoading }] = useDeleteRoomMutation()
  const navigate = useNavigation()
  const dispatch = useDispatch()

  // console.log(route.params, 'Route');

  const handleCreateRoom = (data) => {
    if (!route.params) {
      dispatch(createRoomSlice({ ...data, internalID: createUnicId() }))
      navigate.goBack()
    } else {
      dispatch(editedRoomsSlice(data))
      navigate.goBack()
    }
  };



  // const createsRooms = async () => {
  //   await createRoom(data)
  //     .unwrap()
  //     .then((res) => {
  //       if (res) {
  //         dispatch(createRoomSlice(res))
  //         navigate.goBack()
  //       }
  //     })
  //     .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
  // }

  // const editRooms = async () => {
  //   await patchRoomData(data).unwrap()
  //     .then((res) => {
  //       if (res) {
  //         dispatch(patchRoomSlice(res))
  //         navigate.goBack()
  //       }
  //     })
  //     .catch((e) => console.log(e, 'patchRoomData ERROR'))
  // }

  const handleDeleteRoom = async () => {
    const id = route?.params?.id
    await deleteRoom(id).unwrap()
      .catch((e) => console.log(e, 'handleDeleteRoom ERROR'))
      .finally(() => navigate.goBack())
  }


  useEffect(() => {

  }, [])



  return { createRoomLoading, patchLoading, deleteLoading, handleDeleteRoom, handleCreateRoom };
};

export default useRoomForm;