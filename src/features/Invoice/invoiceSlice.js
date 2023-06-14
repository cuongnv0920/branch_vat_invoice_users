import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invoiceApi } from "api";

export const readXml = createAsyncThunk("invoice/readXml", async (payload) => {
  const data = await invoiceApi.readXml(payload);

  return data;
});

export const create = createAsyncThunk("invoice/create", async (payload) => {
  const data = await invoiceApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("invoice/edit", async (payload) => {
  const data = await invoiceApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("invoice/delete", async (payload) => {
  const data = await invoiceApi.delete(payload);

  return data;
});

const invoiceSlice = createSlice({
  name: "invoice",
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
    [readXml.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

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

const { actions, reducer } = invoiceSlice;
export const { getData } = actions;
export default reducer;
