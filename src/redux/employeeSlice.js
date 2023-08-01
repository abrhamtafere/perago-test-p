import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchEmployees = createAsyncThunk(
//   'employees/fetchEmployees',
//   async () => {
//     const response = await axios.get('http://localhost:4000/roles');
//     return response.data;
//   }
// );

const initialState = {
  role: null,
  employee: null,
};

export const employeeSlice = createSlice({
  name: "employeeman",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRole, setEmployee, incrementByAmount } =
  employeeSlice.actions;

export default employeeSlice.reducer;
