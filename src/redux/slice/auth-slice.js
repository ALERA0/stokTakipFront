import {createSlice} from '@reduxjs/toolkit';
import {authLogin, authLogOut} from '../../api';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: undefined,
    isLoading: false,
    status: undefined,
    error: undefined,
    isAuthenticated: '-1',
    message: undefined,
  },
  reducers: {
    changeAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    resetLogin: state => {
      state.isAuthenticated = '0';
      state.data = undefined;
      state.isLoading = {};
      state.error = undefined;
      state.status = undefined;
      state.message = undefined;
    },
  },
  extraReducers: {
    [authLogin.pending]: state => {
      state.isLoading = true;
    },
    [authLogin.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.isLoading = false;
      state.isAuthenticated = action.payload.status === 'success' ? '1' : '0';
    },
    [authLogin.rejected]: (state, action) => {
      state.status = action.error.message; // Hata mesajını güncelle
      state.isLoading = false;
      state.isAuthenticated = '0';
    },
    [authLogOut.fulfilled]: state => {
      state.isAuthenticated = '0';
    },
    // [registerProcess.pending]: state => {
    //   state.isLoading = true;
    // },
    // [registerProcess.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.data = action.payload.data;
    //   state.status = action.payload.status;
    // },
    // [registerProcess.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload.error;
    // },
  },
});

export const {changeAuthentication, resetLogin} = authSlice.actions;

export default authSlice.reducer;