import { createSlice } from "@reduxjs/toolkit";
import { FLOATING_BUTTON } from "../actions/types";
import uiRoutes from "../../constants/uiRoutes";
import { router } from "expo-router";

const initialState = {
  visible: true,
  icon: "add", // Default icon
  btnStyles: { bottom: 50, left: '50%', transform: [{ translateX: -30 }] }, // Default position
  onPress: () => router.push(uiRoutes.addTransaction)// Default handler
};

const floatingButtonReducer = createSlice({
  name: FLOATING_BUTTON,
  initialState,
  reducers: {
    setButtonState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetButtonState: () => initialState,
  },
});

export const { setButtonState, resetButtonState } = floatingButtonReducer.actions;
export default floatingButtonReducer.reducer;
