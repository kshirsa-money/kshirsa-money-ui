import { createSlice } from "@reduxjs/toolkit";
import { UI_STATES } from "../actions/types";

const initialState = {
  loaded: false,
  aiVoiceSpeakerData: {
    popupVisible: false,
  }
};
const uiReducer = createSlice({
    name: UI_STATES,
    initialState,
    reducers: {
      setFontsLoaded: (state) => {
        state.loaded = true;
      },
      setAiVoiceSpeakerPopupVisible: (state, action) => {
        state.aiVoiceSpeakerData.popupVisible = action.payload;
    },
    },
  });
  
  export const { 
    setFontsLoaded,
    setAiVoiceSpeakerPopupVisible,
   } = uiReducer.actions;
  export default uiReducer.reducer;