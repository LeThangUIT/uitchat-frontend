import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";
export const fetchChannelData = createAsyncThunk(
  "channel/fetchChannelData",
  async (serverId) => {
    const { data } = await axios.get(`${API_URL}/channels/${serverId}`, {
      headers: authHeader(),
    });
    return data;
  }
);

export const fetchAddNewChannel = createAsyncThunk(
  "channel/fetchAddNewChannel",
  async (newChannel) => {
    const { data } = await axios.post(`${API_URL}/channels`, newChannel, {
      headers: authHeader(),
    });
    return data;
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {
    deleteChannelFromSocket: (state, action) => {
      state.data = current(state).data.filter(
        (channel) => channel._id !== action.payload
      );
    },
    addChannelFromSocket: (state, action) => {
      state.data.push(action.payload);
    },

    editChannelFromSocket: (state, action) => {
      const updatedChannel = action.payload;
      state.data.map((channel) => {
        if (channel._id === updatedChannel.channelId) {
          channel.name = updatedChannel.channelName;
        }
      });
    }

  },
  extraReducers: {
    [fetchChannelData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchChannelData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      //   console.log(payload)
      state.data = payload;
    },
    [fetchChannelData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
    [fetchAddNewChannel.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED;
      state.data.push(payload);
    },
  },
});
export const selectChannel = (state) => state.channel.data;
export const {
  deleteChannelFromSocket,
  addChannelFromSocket,
  editChannelFromSocket,
} = channelSlice.actions;
export default channelSlice.reducer;
