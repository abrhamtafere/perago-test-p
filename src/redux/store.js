// import { configureStore } from '@reduxjs/toolkit'
// import employeeReducer from './employeeSlice'

// export const store = configureStore({
//   reducer: {
//     employeeman: employeeReducer,
//   },
// })

//after the apiSlice
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import apiSliceReducer from './apiSlice';
import { apiSlice } from './apiSlice';

// to persist or This allows the Redux state to be preserved even if the page is refreshed or navigated away from
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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