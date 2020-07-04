import { put, takeLatest, call } from 'redux-saga/effects';
import { REQUEST_WORKERS, REQUEST_WORKERS_WATCHER, UPDATE_WORKERS_WATCHER, RESET_LIST } from '../redux';
import { workers } from '../../../core/constants';
import { resetEmployeesList, fetchEmployees, updateEmployee } from '../../../core/helperFunctions';
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
  updateEmployee(action.payload);
  try {
    const data = yield call(fetchEmployees);
    yield put({ type: REQUEST_WORKERS, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export function* updateWorkersRequest() {
  yield takeLatest(UPDATE_WORKERS_WATCHER, updateWorkers);
}

function* resetList() {
  try {
    yield call(resetEmployeesList);
    const employees = yield call(fetchEmployees);
    yield put({ type: REQUEST_WORKERS, payload: employees });
  } catch (error) {
    console.log(error);
  }
}

export function* resetListWatcher() {
  yield takeLatest(RESET_LIST, resetList);
}
