import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";

export const fetchInviteData = createAsyncThunk(
  "invite/fetchInviteData",
  async () => {
    const { data } = await axios.get(`${API_URL}/invites`, {
      headers: authHeader(),
    });
    return data;
  }
);

const inviteSlice = createSlice({
  name: "invite",
  initialState: {
    loading: null,
    data: [],
  },
  reducers: {
    addNewInviteFromSocket: (state, action) => {
      state.data = [action.payload, ...current(state).data];
    },

    removeInviteFromSocket: (state, action) => {
      const inviteId = action.payload;
      state.data = current(state).data.filter(
        (invite) => invite._id !== inviteId
      );
    },
  },
  extraReducers: {
    [fetchInviteData.pending](state) {
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchInviteData.fulfilled](state, { payload }) {
      console.log(payload);
      state.loading = HTTP_STATUS.FULFILLED;
      state.data = payload.inviteList;
    },
    [fetchInviteData.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED;
    },
  },
});

export const selectInvite = (state) => state.invite.data;
export const { addNewInviteFromSocket, removeInviteFromSocket } =
  inviteSlice.actions;

export default inviteSlice.reducer;
