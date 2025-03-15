import { createSlice } from "@reduxjs/toolkit";
import viewCategoriesAction from "../actions/viewCategoriesAction";
import { GET_CATEGORIES } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const viewCategoriesReducer = createSlice({
  name: GET_CATEGORIES,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(viewCategoriesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(viewCategoriesAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(viewCategoriesAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

// export const { 
//   RESET_GET_RECENT_TRANSACTION: resetgetRecentTransactionsAction
//  } = viewCategoriesReducer.actions;
export default viewCategoriesReducer.reducer;
