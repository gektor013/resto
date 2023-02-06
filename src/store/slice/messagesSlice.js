// import {createSlice} from '@reduxjs/toolkit';
// import uuid from 'react-native-uuid';

// const initialState = [];

// export const messagesSlice = createSlice({
//   name: 'message',
//   initialState,
//   reducers: {
//     createMessage: (state, action) => {
//       const message = {
//         id: uuid.v4(),
//         type: action.payload.type,
//         message: action.payload.message,
//       };
//       return [...state, message];
//     },
//     deleteMessage: (state, action) => {
//       return state.filter(message => message.id !== action.payload.id);
//     },
//   },
// });

// export const {createMessage, deleteMessage} = messagesSlice.actions;

// export default messagesSlice.reducer;
