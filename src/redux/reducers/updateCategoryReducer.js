import { createSlice } from "@reduxjs/toolkit";
import updateCategoryAction from "../actions/updateCategoryAction";
import { RESET_UPDATE_CATEGORY, UPDATE_CATEGORY } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const updateCategoryReducer = createSlice({
  name: UPDATE_CATEGORY,
  initialState,
  reducers: {
    [RESET_UPDATE_CATEGORY]: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const { 
  RESET_UPDATE_CATEGORY: resetUpdateCategoryAction
 } = updateCategoryReducer.actions;

export default updateCategoryReducer.reducer;
