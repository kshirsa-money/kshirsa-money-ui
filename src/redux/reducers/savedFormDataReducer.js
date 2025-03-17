import { createSlice } from "@reduxjs/toolkit";
import { SET_SAVED_FORM_DATA } from "../actions/types";

const initialState = {
  data: null,
};

const savedFormDataReducer = createSlice({
  name: SET_SAVED_FORM_DATA,
  initialState,
    reducers: {
        setSavedFormDataAction: (state, action) => {
        state.data = action.payload;
        },
        resetSavedFormDataAction: (state) => {
        state.data = null;
        },
    },
});

export const { setSavedFormDataAction, resetSavedFormDataAction } = savedFormDataReducer.actions;
export default savedFormDataReducer.reducer;
