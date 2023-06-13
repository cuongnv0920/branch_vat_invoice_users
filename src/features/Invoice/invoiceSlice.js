import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "api";

export const create = createAsyncThunk("user/create", async (payload) => {
  const data = await userApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("user/edit", async (payload) => {
  const data = await userApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("user/delete", async (payload) => {
  const data = await userApi.delete(payload);

  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    getData: {},
  },
  reducers: {
    getData(state, action) {
      return {
        ...state,
        getData: action.payload,
      };
    },
  },
  extraReducers: {
    [create.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [edit.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [deleted.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { getData } = actions;
export default reducer;
