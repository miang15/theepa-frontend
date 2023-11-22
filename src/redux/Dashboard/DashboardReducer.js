import {DASHBOARD_ACTION_TYPES} from './DashboardAction';

const initialState = {
  category: [],
  dashboard: {},
  accounts: {},
  goals: [],
  allWidgets: {},
};

export const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ACTION_TYPES.SET_CATEGORY:
      return {
        ...state,
        category: [...action.payload],
      };
    case DASHBOARD_ACTION_TYPES.SET_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: {...action.payload},
      };
    case DASHBOARD_ACTION_TYPES.SET_ALL_WIDGETS:
      return {
        ...state,
        allWidgets: {...action.payload},
      };
    case DASHBOARD_ACTION_TYPES.SET_ACCOUNTS:
      return {
        ...state,
        accounts: {...action.payload},
      };
    case DASHBOARD_ACTION_TYPES.UPDATE_ACCOUNT:
      let arr = {...state.accounts};
      arr?.UserAccounts.find((item, index) => {
        if (item?._id == action.payload?._id) {
          arr.UserAccounts[index] = action.payload;
        }
      });
      return {
        ...state,
        accounts: {...arr},
      };
    case DASHBOARD_ACTION_TYPES.SET_GOALS:
      return {
        ...state,
        goals: [...action.payload],
      };

    default:
      return state;
  }
};

export default DashboardReducer;
