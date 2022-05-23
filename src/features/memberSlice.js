import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "../app/constant";
import authHeader from "../services/auth-header";
import axios from "axios";
import { async } from "@firebase/util";

export const fetchMemberData = createAsyncThunk(
  "member/fetchMemberData",
    async(serverId) => {
      const { data } = await axios.get(`${API_URL}/users/me/servers/${serverId}/members` , {headers: authHeader()})
      return data;
  }
)
export const fetchAddMember = createAsyncThunk(
    "member/fetchAddMember",
    async (members) => {
      console.log(members)
      const { data } = await axios.post(`${API_URL}/servers/members`,members, {
        headers: authHeader(),
      });
      return data;
    }
  );
export const fetchDeleteMember = createAsyncThunk(
  "member/fetchDeleteMember",
  async (members) => {
    const { data } = await axios.delete(`${API_URL}/servers/users`, members, {
      headers: authHeader(),
    })
    return data;
  }
)
  const memberSlice = createSlice({
    name: "member",
    initialState: {
      loading: null,
      data: [],
    },
    reducers: {},
    extraReducers: {
      [fetchMemberData.pending](state) {
        state.loading = HTTP_STATUS.PENDING;
      },
      [fetchMemberData.fulfilled](state, { payload }) {
        state.loading = HTTP_STATUS.FULFILLED;
        state.data = payload;
      },
      [fetchMemberData.rejected](state) {
        state.loading = HTTP_STATUS.REJECTED;
      },
      [fetchAddMember.pending](state) {
        state.loading = HTTP_STATUS.PENDING;
      },
      [fetchAddMember.fulfilled](state, { payload }) {
        console.log(payload)
        state.loading = HTTP_STATUS.FULFILLED;
        state.data.push(payload);
      },
      [fetchAddMember.rejected](state) {
        state.loading = HTTP_STATUS.REJECTED;
      },
      [fetchDeleteMember.pending](state) {
        state.loading = HTTP_STATUS.PENDING;
      },
      [fetchDeleteMember.fulfilled](state, { payload }) {
        console.log(payload)
        state.loading = HTTP_STATUS.FULFILLED;
        //state.data.push(payload);
      },
      [fetchDeleteMember.rejected](state) {
        state.loading = HTTP_STATUS.REJECTED;
      },
    },
  });
  export const selectMember = (state) => state.member.data;
  export default memberSlice.reducer;