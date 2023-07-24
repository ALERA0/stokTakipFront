import {createSlice} from '@reduxjs/toolkit';
import {getProductDetailProcess} from '../../api';
export const getProductDetailSlice = createSlice({
  name: 'getProductDetail',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetProductDetail: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getProductDetailProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getProductDetailProcess: true};
    },
    [getProductDetailProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getProductDetailProcess: false};
      state.status = {
        ...state.status,
        getProductDetailProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getProductDetailProcess: action.payload?.message,
      };
      state.data = action.payload?.product;
    },
    [getProductDetailProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getProductDetailProcess: false};
    },
  },
});
export const {resetProductDetail} = getProductDetailSlice.actions;
export default getProductDetailSlice.reducer;