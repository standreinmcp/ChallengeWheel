import produce from 'immer';
import {assign} from 'lodash-es';
import {REQUEST_WORKERS} from '.';

const INITIAL_STATE = {
  workers: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_WORKERS:
      return produce(state, (nextState) =>
        assign(nextState, {
          workers: action.response,
        }),
      );

    default:
      return state;
  }
};
