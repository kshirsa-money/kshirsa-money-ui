import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_TRANSACTION } from "./types";
import { sendData  } from "../../api/apiUtils";
import urls from "../../api/url";

const updateCategoryAction = createAsyncThunk(
  ADD_TRANSACTION,
    async (body, { rejectWithValue }) => {
        try {
            const response = await sendData({
              endpoint: urls.updateCategory,
              body,
              method: 'put',
  
            }); 
            return response;
          } catch (error) {
            return rejectWithValue(error.response?.data || error.message); 
          }
        }
)

export default updateCategoryAction;