import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CATEGORY } from "./types";
import { sendData  } from "../../api/apiUtils";
import urls from "../../api/url";

const addCategoryAction = createAsyncThunk(
  ADD_CATEGORY,
    async (body, { rejectWithValue }) => {
        try {
            const response = await sendData({
              endpoint: urls.addCategory,
              body,
              method: 'post',
  
            }); 
            return response;
          } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
        }
)

export default addCategoryAction;