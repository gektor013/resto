import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetBookingData } from '../store/slice/bookingDataSlice';

const useModalsControl = () => {
  const dispatch = useDispatch()
  const [modalsState, setModalsState] = useState({
    dateModal: false,
    timeModal: false,
    numberGuestModal: false,
    nameGuestModal: false,
    commentAdminModal: false,
    phoneModal: false,
    employeeModal: false
  })

  const onHandleOpenModals = useCallback((setterType) => {
    switch (setterType) {
      case 'date':
        setModalsState(prev => ({ ...prev, dateModal: true }))
        break;
      case 'time':
        setModalsState(prev => ({ ...prev, timeModal: true }))
        break;
      case 'guest':
        setModalsState(prev => ({ ...prev, numberGuestModal: true }))
        break;
      case 'name':
        setModalsState(prev => ({ ...prev, nameGuestModal: true }))
        break;
      case 'comment':
        setModalsState(prev => ({ ...prev, commentAdminModal: true }))
        break;
      case 'phone':
        setModalsState(prev => ({ ...prev, phoneModal: true }))
        break;
      case 'employee':
        setModalsState(prev => ({ ...prev, employeeModal: true }))
        break;
      default:
        return;
    }
  }, []);



  const cancelModal = useCallback((setter, clearData = true) => {
    switch (setter) {
      case 'date':
        setModalsState(prev => ({ ...prev, dateModal: false }))
        break;
      case 'time':
        setModalsState(prev => ({ ...prev, timeModal: false }))
        break;
      case 'guest':
        setModalsState(prev => ({ ...prev, numberGuestModal: false }))
        break;
      case 'name':
        setModalsState(prev => ({ ...prev, nameGuestModal: false }))
        break;
      case 'comment':
        setModalsState(prev => ({ ...prev, commentAdminModal: false }))
        break;
      case 'phone':
        setModalsState(prev => ({ ...prev, phoneModal: false }))
        break;
      case 'employee':
        setModalsState(prev => ({ ...prev, employeeModal: false }))
        break;
      default:
        return;
    }
    { clearData && dispatch(resetBookingData()) }
  }, [])

  return { modalsState, onHandleOpenModals, cancelModal }
}


export default useModalsControl;


 // const [dateModal, setDateModal] = useState(false);
  // const [timeModal, setTimeModal] = useState(false);
  // const [numberGuestModal, setNumberGuestModal] = useState(false)
  // const [nameGuestModal, setNameGuestModal] = useState(false)

  // const onHandleOpenModals = useCallback((setterType) => {
  //   switch (setterType) {
  //     case 'date':
  //       setDateModal(prev => !prev)
  //       break;
  //     case 'time':
  //       setTimeModal(true);
  //       break;
  //     case 'guest':
  //       setNumberGuestModal(true);
  //       break;
  //     case 'name':
  //       setNameGuestModal(true);
  //       break;
  //     default:
  //       return;
  //   }
  // }, []);