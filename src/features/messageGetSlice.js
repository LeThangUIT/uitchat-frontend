import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchMessageChannelData = createAsyncThunk(
  "message/fetchMessageChannelData",
  async (channelId) => {
    console.log(channelId)
    const { data } = await axios.post(`${API_URL}/messages/${channelId}`, {
      headers: authHeader(),
    });
    console.log(data);
    return data;
  }
);

export const fetchMessageConversationData = createAsyncThunk(
    "message/fetchMessageConversationData",
    async (conversationId) => {
      console.log(conversationId)
      const { data } = await axios.post(`${API_URL}/messages/${conversationId}`, {
        headers: authHeader(),
      });
      console.log(data);
      return data;
    }
  );

const messageGetSlice = createSlice({
  name: "message",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchMessageChannelData.pending](state) {
      state.loading = true;
    },
    [fetchMessageChannelData.fulfilled](state, { payload }) {
      state.loading = true;
      state.data = payload.results
    },
    [fetchMessageChannelData.rejected](state) {
      state.loading = false;
    },

    // by conversation
    [fetchMessageConversationData.pending](state) {
        state.loading = true;
      },
      [fetchMessageConversationData.fulfilled](state, { payload }) {
        state.loading = true;
        state.data = payload.results
      },
      [fetchMessageConversationData.rejected](state) {
        state.loading = false;
      },
  },
});
export const selectMessage = (state) => state.message.data;
export default messageGetSlice;
