import produce from 'immer';
import { assign } from 'lodash-es';
import { REQUEST_WORKERS, UPDATE_WORKERS } from '.';

const INITIAL_STATE = {
  workersStore: {},
  updatedWorkers: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_WORKERS:
      return produce(state, (nextState) =>
        assign(nextState, {
          workersStore: action.payload,
        }),
      );
    case UPDATE_WORKERS:
      return produce(state, (nextState) =>
        assign(nextState, {
          updatedWorkers: action.payload,
        }),
      );

    default:
      return state;
  }
};
