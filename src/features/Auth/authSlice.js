import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "api";
import storageKeys from "configs/storageKeysConf";

export const register = createAsyncThunk("user/create", async (payload) => {
  // call API to register
  const data = await authApi.create(payload);

  // save data to local storage
  localStorage.setItem(storageKeys.TOKEN, data.jwt);
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  // call API to login
  const data = await authApi.login(payload);

  // save data to local storage
  localStorage.setItem(storageKeys.TOKEN, data.jwt);
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

export const setting = createAsyncThunk("user/update", async (payload) => {
  // call API to setting user
  const data = await userApi.update(payload);

  // save data to local storage
  localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(storageKeys.TOKEN);
      localStorage.removeItem(storageKeys.USER);

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [setting.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
