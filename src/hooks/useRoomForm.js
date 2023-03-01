import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCreateRoomMutation, useDeleteRoomMutation, usePatchRoomDataMutation } from '../store/api/roomsApi';
import { useDispatch, useSelector } from 'react-redux';
import { allRoomsDataCS, createdRoomsDataCS, editedRoomsDataCS, createRoomSlice, deletedRoomsSlice, deletedRoomsDataCS } from '../store/slice/roomsSlice';

const useRoomForm = (route) => {
  const createdRoomsData = useSelector(createdRoomsDataCS)
  const editedRoomsData = useSelector(editedRoomsDataCS)
  const deletedRoomsData = useSelector(deletedRoomsDataCS)

  const navigate = useNavigation()
  const dispatch = useDispatch()

  const [createRoom] = useCreateRoomMutation();
  const [patchRoomData] = usePatchRoomDataMutation()
  const [deleteRoom] = useDeleteRoomMutation()

  const createsRooms = async () => {
    await createRoom(data)
      .unwrap()
      .then((res) => {
        // if (res) {
        //   // navigate.goBack()
        // }
      })
      .catch((e) => console.log(e, 'handleCreateRoom ERROR'))
  }

  const editRooms = async () => {
    Array.from(editedRoomsData, (room) => {
      patchRoomData(room).unwrap()
        .then((res) => {
          // if (res) {
          //   // navigate.goBack()
          // }
        })
        .catch((e) => console.log(e, 'patchRoomData ERROR'))
    })
  }

  const handleDeleteRoom = async () => {
    Array.from(deletedRoomsData, (room) => {
      deleteRoom(room.id).unwrap()
        .catch((e) => console.log(e, 'handleDeleteRoom ERROR'))
      // .finally(() => navigate.goBack())
    })
  }


  return {};
};

export default useRoomForm;