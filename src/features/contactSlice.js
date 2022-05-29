import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchContactData = createAsyncThunk(
  "contact/fetchContactData",
  async () => {
    const { data } = await axios.get(`${API_URL}/users/contacts`, {
      headers: authHeader(),
    });
    return data;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {
    addNewContactFromSocket: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [fetchContactData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchContactData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload.results;
    },
    [fetchContactData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

export const selectContact = (state) => state.contact.data;

export default contactSlice.reducer;
