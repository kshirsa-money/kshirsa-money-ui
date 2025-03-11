import { createSlice } from "@reduxjs/toolkit";
import updateTransactionAction from "../actions/updateTransactionAction";
import { RESET_UPDATE_TRANSACTION, UPDATE_TRANSACTION } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const updateTransactionReducer = createSlice({
  name: UPDATE_TRANSACTION,
  initialState,
   reducers: {
      [RESET_UPDATE_TRANSACTION]: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.success = null;
        state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTransactionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(updateTransactionAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(updateTransactionAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const { 
  RESET_UPDATE_TRANSACTION: resetUpdateTransactionAction
 } = updateTransactionReducer.actions;
export default updateTransactionReducer.reducer;
