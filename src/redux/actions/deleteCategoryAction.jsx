import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_CATEGORY } from "./types";
import { sendData  } from "../../api/apiUtils";
import urls from "../../api/url";

const deleteCategoryAction = createAsyncThunk(
  DELETE_CATEGORY,
    async (queryParams, { rejectWithValue }) => {
        try {
            const response = await sendData({
              endpoint: urls.deleteCategory,
              queryParams,
              method: 'delete',
  
            }); 
            return response;
          } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
        }
)

export default deleteCategoryAction;