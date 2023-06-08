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
    selected: {},
    get: {},
    roomFilters: {},
    refreshData: 0,
  },
  reducers: {
    selected(state, action) {
      return {
        ...state,
        selected: action.payload,
      };
    },

    removeSelected(state) {
      return {
        ...state,
        selected: {},
      };
    },

    get(state, action) {
      return {
        ...state,
        get: action.payload,
      };
    },

    roomFilters(state, action) {
      return {
        ...state,
        roomFilters: action.payload,
      };
    },

    refreshData(state, action) {
      return {
        ...state,
        refreshData: state.refreshData + 1,
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
export const { selected, removeSelected, get, roomFilters, refreshData } =
  actions;
export default reducer;
