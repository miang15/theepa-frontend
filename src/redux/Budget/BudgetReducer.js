import {BUDGET_ACTION_TYPES} from './BudgetAction';

const initialState = {
  budget: [],
};

export const BudgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUDGET_ACTION_TYPES.SET_BUDGET:
      return {
        ...state,
        budget: [...action.payload],
      };
    default:
      return state;
  }
};

export default BudgetReducer;
