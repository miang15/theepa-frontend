import {SMS_ACTION_TYPES} from './SMSParsingAction';

const initialState = {
  allBanksRegex: [],
  allTransactions: [],
  uncategorizeTransactions: [],
};

export const SMSParsingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SMS_ACTION_TYPES.SET_All_REGEX:
      return {
        ...state,
        allBanksRegex: [...action.payload],
      };
    case SMS_ACTION_TYPES.SET_All_SMS:
      return {
        ...state,
        allTransactions: [...action.payload],
      };
    case SMS_ACTION_TYPES.SET_UNCATEGORIZED_TRANSACTIONS:
      return {
        ...state,
        uncategorizeTransactions: [...action.payload],
      };
    default:
      return state;
  }
};

export default SMSParsingReducer;
