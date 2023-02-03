import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from '../slice/authenticationSlice';

export const unauthenticatedMiddleware =
  ({ dispatch }) =>
    next =>
      action => {
        if (isRejectedWithValue(action) && action.payload.status === 401) {
          dispatch(logout());
        }

        return next(action);
      };
