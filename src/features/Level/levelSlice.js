import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { levelApi } from "api";

export const create = createAsyncThunk("level/create", async (payload) => {
  const data = await levelApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("level/edit", async (payload) => {
  const data = await levelApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("level/delete", async (payload) => {
  const data = await levelApi.delete(payload);

  return data;
});

const userSlice = createSlice({
  name: "level",
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
