import {createSlice} from '@reduxjs/toolkit';
import {getOutgoingProductsProcess} from '../../api';
export const getOutgoingProductsSlice = createSlice({
  name: 'getOutgoingProducts',
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetOutgoingProducts: state => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getOutgoingProductsProcess.pending]: state => {
      state.isLoading = {...state.isLoading, getOutgoingProductsProcess: true};
    },
    [getOutgoingProductsProcess.fulfilled]: (state, action) => {
      state.isLoading = {...state.isLoading, getOutgoingProductsProcess: false};
      state.status = {
        ...state.status,
        getOutgoingProductsProcess: action.payload?.status,
      };
      state.message = {
        ...state.message,
        getOutgoingProductsProcess: action.payload?.message,
      };
      state.data = action.payload?.outgoingProducts;
    },
    [getOutgoingProductsProcess.rejected]: (state, action) => {
      state.isLoading = {...state.isLoading, getOutgoingProductsProcess: false};
    },
  },
});

export const {resetOutgoingProducts} = getOutgoingProductsSlice.actions;
export default getOutgoingProductsSlice.reducer;

