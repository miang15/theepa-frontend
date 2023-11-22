import {combineReducers} from 'redux';
import loadingReducer from './AppLoader/appLoaderReducer';
import authReducer from './Auth/authReducer';
import DashboardReducer from './Dashboard/DashboardReducer';
import CategoryReducer from './Category/CategoryReducer';
import BudgetReducer from './Budget/BudgetReducer';
import GoalsReducer from './Goals/GoalsReducer';
import SMSParsingReducer from './SMSParsing/SMSParsingReducer';
import {APP_LOADER_ACTION_TYPES} from './AppLoader/appLoaderAction';

const reducers = combineReducers({
  loadingReducer: loadingReducer,
  auth: authReducer,
  DashboardReducer: DashboardReducer,
  CategoryReducer: CategoryReducer,
  BudgetReducer: BudgetReducer,
  GoalsReducer: GoalsReducer,
  SMSParsingReducer: SMSParsingReducer,
});

export const RootReducer = (state, action) => {
  if (action.type === APP_LOADER_ACTION_TYPES.RESET_STATE) {
    state = undefined;
  }
  return reducers(state, action);
};
