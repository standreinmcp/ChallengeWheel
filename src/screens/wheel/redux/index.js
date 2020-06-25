import workersReducer from './reducers';
import {combineReducers} from 'redux';

export const reducer = combineReducers({
  workersReducer: workersReducer,
});

export {
  REQUEST_WORKERS,
  WATCHER_REQUEST_WORKERS,
  IS_REQUESTING,
} from './actionTypes';
