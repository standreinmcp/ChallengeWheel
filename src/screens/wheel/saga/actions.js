import { put, takeLatest } from 'redux-saga/effects';
import { REQUEST_WORKERS, REQUEST_WORKERS_WATCHER, UPDATE_WORKERS_WATCHER, UPDATE_WORKERS } from '../redux';
import { workers } from '../../../core/constants';

//worker saga
function* wheelRequest() {
  try {
    //yield put({ type: IS_REQUESTING, payload: true });
    // const response = yield call(requestWorkers);
    yield put({ type: REQUEST_WORKERS, payload: workers });
  } catch (error) {
    //yield put({ type: IS_REQUESTING, payload: true });
  }
}

//watcher saga
export function* watchWorkerRequest() {
  yield takeLatest(REQUEST_WORKERS_WATCHER, wheelRequest);
}

function* updateWorkers(action) {
  console.log(action.payload, 'sagas');
  try {
    yield put({ type: UPDATE_WORKERS, payload: action.payload });
  } catch (error) {
    console.log(error);
  }
}

export function* updateWorkersRequest() {
  yield takeLatest(UPDATE_WORKERS_WATCHER, updateWorkers);
}
