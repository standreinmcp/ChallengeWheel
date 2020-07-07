import workersReducer from './reducers';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
  workersReducer: workersReducer,
});

export {
  IS_REQUESTING,
  UPDATE_WORKERS,
  UPDATE_WORKERS_WATCHER,
  RESET_LIST,
  SET_WORKERS,
  SET_WORKERS_WATCHER,
  SET_WORKERS_RESPONSE,
  UPDATE_WORKERS_RESPONSE,
  RESET_LIST_RESPONSE
} from './actionTypes';
