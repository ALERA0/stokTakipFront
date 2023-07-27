import {createSlice} from '@reduxjs/toolkit';
import {getIncomingProductsProcess} from '../../api';
export const getIncomingProductsSlice = createSlice({
  name: 'getIncomingProducts',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetIncomingProducts: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getIncomingProductsProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getIncomingProductsProcess: true};
    },
    [getIncomingProductsProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getIncomingProductsProcess: false};
      state.status = {
        ...state.status,
        getIncomingProductsProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getIncomingProductsProcess: action.payload?.message,
      };
      state.data = action.payload?.incomingProducts;
    },
    [getIncomingProductsProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getIncomingProductsProcess: false};
    },
  },
});

export const {resetIncomingProducts} = getIncomingProductsSlice.actions;
export default getIncomingProductsSlice.reducer;

