// import { configureStore } from '@reduxjs/toolkit'
// import employeeReducer from './employeeSlice'

// export const store = configureStore({
//   reducer: {
//     employeeman: employeeReducer,
//   },
// })

//after the apiSlice
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice/employeeSlice';
import apiSliceReducer from './api/apiSlice';
import { apiSlice } from './api/apiSlice';

// to persist or This allows the Redux state to be preserved even if the page is refreshed or navigated away from
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireTransform from 'redux-persist-transform-expire';

const expireTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const expireTransformConfig = {
  whitelist: [], // Add your whitelisted reducers here
  transform: expireTransform,
  expireKey: 'persistExpires',
  defaultState: {},
};

const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    // [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSlice.reducerPath]: apiSliceReducer,
    employeeman: employeeReducer,
  })
);

// export const store = configureStore({
//   reducer: {
//     // [apiSlice.reducerPath]: apiSlice.reducer,
//     [apiSlice.reducerPath]: apiSliceReducer,
//     employeeman: employeeReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);