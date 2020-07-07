import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { reducer as workerReducer } from '../screens/wheel/redux';
import { setWorkersWatcher, updateWorkersRequest, resetListWatcher } from '../screens/wheel/saga';
import AsyncStorage from '@react-native-community/async-storage';
import { spawn } from 'redux-saga/effects';

function* rootSaga() {
  yield spawn(setWorkersWatcher);
  yield spawn(updateWorkersRequest);
  yield spawn(resetListWatcher);
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  worker: workerReducer,
});

const persistConfig = {
  key: 'root',
  whitelist: ['worker'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
