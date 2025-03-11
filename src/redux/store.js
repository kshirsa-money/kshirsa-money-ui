import { configureStore } from "@reduxjs/toolkit";
import fontsSlice from "./reducers/fontReducer";
import validateOtpReducer from "./reducers/validateOtpReducer";
import generateOtpReducer from "./reducers/generateOtpReducer";
import userDetailsReducer from "./reducers/userDetailsReducer";
import floatingButtonReducer from "./reducers/floatingBtnReducer";
import addTransactionReducer from "./reducers/addTransactionReducer";
import getRecentTransactionsReducer from "./reducers/getRecentTransactionsReducer";
import deleteTransactionReducer from "./reducers/deleteTransactionReducer";
import getTransactionReducer from "./reducers/getTransactionReducer";
import updateTransactionReducer from "./reducers/updateTransactionReducer";

const KshirsaStore = configureStore({
    reducer: {
      fonts: fontsSlice.reducer,
      generateOtpReducer: generateOtpReducer,
      validateOtpReducer: validateOtpReducer,
      userDetailsReducer: userDetailsReducer,
      floatingButtonReducer: floatingButtonReducer,
      addTransactionReducer: addTransactionReducer,
      getRecentTransactionsReducer: getRecentTransactionsReducer,
      deleteTransactionReducer: deleteTransactionReducer,
      getTransactionReducer: getTransactionReducer,
      updateTransactionReducer: updateTransactionReducer,
    },
  });

  export default KshirsaStore;