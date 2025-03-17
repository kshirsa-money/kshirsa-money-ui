import { createSlice } from "@reduxjs/toolkit";
import deleteCategoryAction from "../actions/deleteCategoryAction";
import { DELETE_CATEGORY } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const deleteCategoryReducer = createSlice({
  name: DELETE_CATEGORY,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export default deleteCategoryReducer.reducer;
