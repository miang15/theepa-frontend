import {GOALS_ACTION_TYPES} from './GoalsAction';

const initialState = {
  goals: [],
};

export const GoalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOALS_ACTION_TYPES.SET_GOALS:
      return {
        ...state,
        goals: [...action.payload],
      };
    default:
      return state;
  }
};

export default GoalsReducer;
