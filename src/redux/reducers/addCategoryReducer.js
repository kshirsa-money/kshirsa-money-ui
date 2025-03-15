import { createSlice } from "@reduxjs/toolkit";
import addCategoryAction from "../actions/addCategoryAction";
import { ADD_CATEGORY, RESET_ADD_CATEGORY } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: null,
  message: null,
};

const addCategoryReducer = createSlice({
  name: ADD_CATEGORY,
  initialState,
  reducers: {
    [RESET_ADD_CATEGORY]: (state) => {
      console.log('reset add category')
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      state.message = null;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        state.message = null;
      })
      .addCase(addCategoryAction.fulfilled, (state, action) => {
        const { data, success, message } = action.payload;
        state.loading = false;
        state.data = data;
        state.success = success;
        state.message = message;
      })
      .addCase(addCategoryAction.rejected, (state, action) => {
        const { errorDetails, success, message } = action.payload
        state.loading = false;
        state.error = errorDetails;
        state.success = success || false;
        state.message = message;
      });
  },
});

export const {
  RESET_ADD_CATEGORY: resetAddCategoryAction
} = addCategoryReducer.actions;
export default addCategoryReducer.reducer;
