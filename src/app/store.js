import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";
import roomReducer from "../features/Room/roomSlice";
import levelReducer from "../features/Level/levelSlice";
import invoiceReducer from "../features/Invoice/invoiceSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  room: roomReducer,
  level: levelReducer,
  invoice: invoiceReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
