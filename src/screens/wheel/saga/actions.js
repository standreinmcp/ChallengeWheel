import {put, takeLatest} from 'redux-saga/effects';
import {
  REQUEST_WORKERS,
  IS_REQUESTING,
  REQUEST_WORKERS_FAILURE,
  WATCHER_REQUEST_WORKERS,
} from '../redux';

//worker saga
function* wheelRequest() {
  try {
    yield put({type: IS_REQUESTING, payload: true});
    yield put({type: REQUEST_WORKERS, payload: 'success'});
    // const response = yield call(login);
  } catch (error) {
    yield put({type: IS_REQUESTING, payload: true});
    yield put({type: REQUEST_WORKERS_FAILURE, payload: false});
  }
}

//watcher saga
export function* watchWorkerRequest() {
  yield takeLatest(WATCHER_REQUEST_WORKERS, wheelRequest);
}
