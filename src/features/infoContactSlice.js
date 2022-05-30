import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchInfoContactData = createAsyncThunk(
  "infoContact/fetchContactData",
  async (channelId) => {
    const { data } = await axios.get(`${API_URL}/users/contacts/${channelId}`, {
      headers: authHeader(),
    });
    return data;
  }
);

const infoContactSlice = createSlice({
  name: "infoContact",
  initialState: {
    loading: null,
    data: {},
  },
  reducers: {},
  extraReducers: {
    [fetchInfoContactData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchInfoContactData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [fetchInfoContactData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

export const selectInfoContact = (state) => state.infoContact.data;

export default infoContactSlice.reducer;
