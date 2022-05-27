import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchNofiticationData = createAsyncThunk(
  "notification/fetchNofiticationData",
  async () => {
    const { data } = await axios.get(`${API_URL}/invites`, {
      headers: authHeader(),
    });
    return data;
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {
    addNewNofiticationFromSocket: (state, action) => {
      state.data.push(action.payload);
    },

    removeNotification: (state, action) => {},
  },
  extraReducers: {
    [fetchNofiticationData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchNofiticationData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload.results;
    },
    [fetchNofiticationData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

export const selectNotification = (state) => state.notification.data;
export const { addNewNofiticationFromSocket, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
