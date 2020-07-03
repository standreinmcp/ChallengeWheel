import workersReducer from './reducers';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
  workersReducer: workersReducer,
});

export { REQUEST_WORKERS, REQUEST_WORKERS_WATCHER, IS_REQUESTING, UPDATE_WORKERS, UPDATE_WORKERS_WATCHER } from './actionTypes';
