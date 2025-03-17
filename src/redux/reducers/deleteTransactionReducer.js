import { createSlice } from "@reduxjs/toolkit";
import deleteTransactionAction from "../actions/deleteTransactionAction";
import { DELETE_TRANSACTION, RESET_DELETE_TRANSACTION } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const deleteTransactionReducer = createSlice({
  name: DELETE_TRANSACTION,
  initialState,
   reducers: {
      [RESET_DELETE_TRANSACTION]: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.success = null;
        state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(deleteTransactionAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(deleteTransactionAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const { 
  RESET_DELETE_TRANSACTION: resetDeleteTransactionAction
 } = deleteTransactionReducer.actions;
export default deleteTransactionReducer.reducer;
