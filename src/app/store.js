import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import userReducer from "../features/User/userSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
