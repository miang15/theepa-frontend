import {AUTH_ACTION_TYPES} from '../Auth/authAction';

const initialState = {
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: {...action.payload},
      };

    default:
      return state;
  }
};

export default authReducer;
