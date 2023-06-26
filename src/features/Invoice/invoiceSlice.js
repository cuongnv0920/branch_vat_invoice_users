import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invoiceApi } from "api";
import storageKeys from "configs/storageKeysConf";

export const xmlRead = createAsyncThunk("invoice/xmlRead", async (payload) => {
  const data = await invoiceApi.xmlRead(payload);

  // save data to local storage
  localStorage.setItem(storageKeys.READXML, JSON.stringify(data.invoice[0]));

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
    current: JSON.parse(localStorage.getItem(storageKeys.READXML)),
    inputStatus: false,
  },
  reducers: {
    getData(state, action) {
      return {
        ...state,
        getData: action.payload,
      };
    },
    removeXml(state) {
      localStorage.removeItem(storageKeys.READXML);

      state.current = {};
    },
    inputStatus(state, action) {
      return {
        ...state,
        inputStatus: action.payload,
      };
    },
  },
  extraReducers: {
    [xmlRead.fulfilled]: (state, action) => {
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
export const { getData, removeXml, inputStatus } = actions;
export default reducer;
