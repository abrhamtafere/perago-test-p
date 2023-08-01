import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employeeSlice'

export const store = configureStore({
  reducer: {
    employeeman: employeeReducer,
  },
})