import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {reducer as workerReducer} from '../screens/wheel/redux';
import {watchWorkerRequest} from '../screens/wheel/saga';
import AsyncStorage from '@react-native-community/async-storage';

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

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);

export const persistor = persistStore(store);
sagaMiddleware.run(watchWorkerRequest);
