import produce from 'immer';
import { assign } from 'lodash-es';
import { SET_WORKERS, RESET_LIST_RESPONSE, UPDATE_WORKERS, SET_WORKERS_RESPONSE, UPDATE_WORKERS_RESPONSE } from './actionTypes';

const INITIAL_STATE = {
  workersStore: {},
  updatedWorkers: false,
  setWorkersResponse: '',
  updateWorkersResponse: '',
  resetListResponse: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_WORKERS:
      return produce(state, (nextState) =>
        assign(nextState, {
          workersStore: action.payload,
        }),
      );
    case SET_WORKERS_RESPONSE:
      return produce(state, (nextState) =>
        assign(nextState, {
          setWorkersResponse: action.payload,
        }),
      );
    case UPDATE_WORKERS:
      return produce(state, (nextState) =>
        assign(nextState, {
          updatedWorkers: action.payload,
        }),
      );
    case UPDATE_WORKERS_RESPONSE:
      return produce(state, (nextState) =>
        assign(nextState, {
          updateWorkersResponse: action.payload,
        }),
      );
    case RESET_LIST_RESPONSE:
      return produce(state, (nextState) =>
        assign(nextState, {
          resetListResponse: action.payload,
        }),
      );

    default:
      return state;
  }
};
