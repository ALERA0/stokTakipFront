import {createSlice} from '@reduxjs/toolkit';
import {getOrderDetailProcess} from '../../api';
export const getOrderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined, 
  },
  reducers: {
    resetOrderDetail: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getOrderDetailProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getOrderDetailProcess: true};
    },
    [getOrderDetailProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getOrderDetailProcess: false};
      state.status = {
        ...state.status,
        getOrderDetailProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getOrderDetailProcess: action.payload?.message,
      };
      state.data = action.payload?.order;
    },
    [getOrderDetailProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getOrderDetailProcess: false};
    },
  },
});
export const {resetOrderDetail} = getOrderDetailSlice.actions;
export default getOrderDetailSlice.reducer;