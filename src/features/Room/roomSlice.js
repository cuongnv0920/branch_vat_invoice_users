import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { roomApi } from "api";

export const create = createAsyncThunk("room/create", async (payload) => {
  const data = await roomApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("room/edit", async (payload) => {
  const data = await roomApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("room/delete", async (payload) => {
  const data = await roomApi.delete(payload);

  return data;
});

const userSlice = createSlice({
  name: "room",
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
