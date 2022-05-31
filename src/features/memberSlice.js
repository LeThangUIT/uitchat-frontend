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
      const { data } = await axios.post(`${API_URL}/servers/members`,members, {
        headers: authHeader(),
      });
      return data;
    }
  );
export const fetchDeleteMember = createAsyncThunk(
  "member/fetchDeleteMember",
  (members) => {
    axios
      .delete(`${API_URL}/servers/members`, {
        data: members,
        headers: authHeader(),
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    return members
  }
);
  const memberSlice = createSlice({
    name: "member",
    initialState: {
      loading: null,
      data: [],
    },
    reducers: {
      leaveServerFromSocket: (state, action) => {
        state.data = current(state).data.filter(
          (member) => member._id !== action.payload
        );
      },
    },
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
        state.loading = HTTP_STATUS.FULFILLED;
        payload.member_ids.forEach((member_id) => {
          state.data = current(state).data.filter(
            (member) => member._id !==member_id
          );
          })
      },
      [fetchDeleteMember.rejected](state) {
        state.loading = HTTP_STATUS.REJECTED;
      },
    },
  });
  export const {
    leaveServerFromSocket,
  } = memberSlice.actions
  export const selectMember = (state) => state.member.data;
  export default memberSlice.reducer;