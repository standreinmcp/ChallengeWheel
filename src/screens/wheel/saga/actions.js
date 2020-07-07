import { put, takeLatest, call } from 'redux-saga/effects';
import { SET_WORKERS, SET_WORKERS_WATCHER, UPDATE_WORKERS_WATCHER, RESET_LIST, UPDATE_WORKERS_RESPONSE, SET_WORKERS_RESPONSE, RESET_LIST_RESPONSE } from '../redux';
import { resetEmployeesList, fetchEmployees, updateEmployee } from '../../../core/helperFunctions';

//worker saga
function* setWorkers() {
  try {
    const data = yield call(fetchEmployees);
    yield put({ type: SET_WORKERS, payload: data });
    yield put({ type: SET_WORKERS_RESPONSE, payload: 'success' });
  } catch (error) {
    yield put({ type: SET_WORKERS_RESPONSE, payload: 'failure' });
  }
}

//watcher saga
export function* setWorkersWatcher() {
  yield takeLatest(SET_WORKERS_WATCHER, setWorkers);
}

function* updateWorkers(action) {
  try {
    yield call(updateEmployee, action.payload);
    const data = yield call(fetchEmployees);
    yield put({ type: SET_WORKERS, payload: data });
    yield put({ type: UPDATE_WORKERS_RESPONSE, payload: 'success' });
  } catch (error) {
    yield put({ type: UPDATE_WORKERS_RESPONSE, payload: 'failure' });
  }
}

export function* updateWorkersRequest() {
  yield takeLatest(UPDATE_WORKERS_WATCHER, updateWorkers);
}

function* resetList() {
  try {
    yield call(resetEmployeesList);
    const employees = yield call(fetchEmployees);
    yield put({ type: SET_WORKERS, payload: employees });
    yield put({ type: RESET_LIST_RESPONSE, payload: 'success' });
  } catch (error) {
    yield put({ type: RESET_LIST_RESPONSE, payload: 'failure' });
  }
}

export function* resetListWatcher() {
  yield takeLatest(RESET_LIST, resetList);
}
