import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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

    hideContact: (state, action) => {
      state.data = current(state).data.filter(
        (contact) => contact._id !== action.payload
      );
    }
  },
  extraReducers: {
    [fetchContactData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchContactData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [fetchContactData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

export const selectContact = (state) => state.contact.data;
export const { addNewContactFromSocket, hideContact } = contactSlice.actions;

export default contactSlice.reducer;
