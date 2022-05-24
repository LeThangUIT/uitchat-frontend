// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_URL, HTTP_STATUS } from "../app/constant";
// import authHeader from "../services/auth-header";
// import axios from "axios";

// export const fetchConversationData = createAsyncThunk(
//   "conversation/fetchConversationData",
//   async (userId) => {
//     const { data } = await axios.get(
//       `${API_URL}/messages/conversation/${userId}`,
//       { headers: authHeader() }
//     );
//     return data;
//   }
// );

// const conversationSlice = createSlice({
//   name: "conversation",
//   initialState: {
//     loading: false,
//     data: [],
//   },
//   reducers: {},
//   extraReducers: {
//     [fetchConversationData.pending]: (state) => {
//       state.loading = true;
//     },
//     [fetchConversationData.fulfilled]: (state, { payload }) => {
//       state.loading = true;
//       state.data = payload.results;
//     },
//     [fetchConversationData.rejected]: (state) => {
//       state.loading = false;
//     },
//   },
// });
// export const selectConversation = (state) => state.conversation.data;
// export default conversationSlice;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchConversationData = createAsyncThunk(
  "conversation/fetchconversationData",
  async (channelId) => {
    const { data } = await axios.get(`${API_URL}/messages/${channelId}`, {
      headers: authHeader(),
    });
    return data;
  }
);

export const fetchAddNewConversation = createAsyncThunk(
  "conversation/fetchAddNewconversation",
  async (newMessage) => {
    const { data } = await axios.post(
      `${API_URL}/messages/channel`,
      newMessage,
      {
        headers: authHeader(),
      }
    );
    console.log("post message", data);
    return data;
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchConversationData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchConversationData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload.results;
    },
    [fetchConversationData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [fetchAddNewConversation.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data.push(payload);
    },
  },
});

export const selectConversation = (state) => state.conversation.data;
export default conversationSlice.reducer;
