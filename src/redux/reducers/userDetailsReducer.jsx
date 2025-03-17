import { createSlice } from "@reduxjs/toolkit";
import { GET_USER_DETAILS } from "../actions/types";
import getUserDetailsAction, { logoutAction, updateUserDetailsAction } from "../actions/userDetailsAction";
import { clearAuthTokens } from "../../utils/storage";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  message: null,
  updateUserDetailsLoading: false,
  logoutLoading: false,
  logoutSuccess: false,
};

const userDetailsReducer = createSlice({
  name: GET_USER_DETAILS,
  initialState,
  reducers: {
    setUserDetailsAction: (state, action) => {
      state.data = action.payload;
    },
    resetUserDetailsAction: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.updateUserDetailsLoading = false;
      state.logoutLoading = false;
      state.logoutSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(getUserDetailsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(getUserDetailsAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      })
      .addCase(updateUserDetailsAction.pending, (state) => {
        state.updateUserDetailsLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateUserDetailsAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.updateUserDetailsLoading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(updateUserDetailsAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.updateUserDetailsLoading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      })
      .addCase(logoutAction.pending, (state) => {
        state.logoutLoading = true;
        state.error = null;
        state.logoutSuccess = false;
        state.message = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        clearAuthTokens();
        state.data = null;
        state.logoutLoading = false;
        state.error = null;
        state.logoutSuccess = true;
        state.message = null;
        state.success = null;
        state.updateUserDetailsLoading = false;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.logoutLoading = false;
        state.error = errorDetails;
        state.logoutSuccess = success || false;
        state.message = message;
      })
  },
});

export const {
  setUserDetailsAction, resetUserDetailsAction
} = userDetailsReducer.actions;
export default userDetailsReducer.reducer;
