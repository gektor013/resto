import { useAddUserMutation, useDeleteUserMutation, usePutUserMutation } from "../store/api/usersApi"
import { useNavigation } from '@react-navigation/native';

const useUserForm = (route) => {
  const navigation = useNavigation()

  const [addUser, { isLoading: addLoading }] = useAddUserMutation()
  const [putUser, { isLoading: putLoading }] = usePutUserMutation()
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()

  // send form data 
  const sendUserData = async (data) => {
    route?.params ?
      (
        await putUser(data).unwrap()
          .then(res => {
            if (res) {
              navigation.goBack()
            }
          })
          .catch(e => console.log(e, 'putUser Error'))

      )
      :
      (
        await addUser(data).unwrap()
          .then(res => {
            if (res) {
              navigation.goBack()
            }
          })
          .catch(e => console.log(e, 'addUser Error'))
      )
  }

  // delete user
  const userDelete = async (id) => {
    await deleteUser(id).unwrap()
      .catch(e => console.log(e, 'userDelete Error'))
      .finally(() => navigation.goBack())
  }

  return {
    addLoading, putLoading, deleteLoading, sendUserData, userDelete
  }
}

export default useUserForm