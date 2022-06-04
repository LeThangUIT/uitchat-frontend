import { createSlice } from "@reduxjs/toolkit";

const memberVoiceSlice = createSlice({
    name: "memberVoice",
    initialState: {
      loading: null,
      data: []
    },
    reducers: {
      memberJoinVoiceChannel: (state, action) => {
        const member = action.payload;
        state.data.push(member);
      }
    }
})

export const { memberJoinVoiceChannel } = memberVoiceSlice.actions;
export const selectMemberVoiceChannel = (state) => state.memberVoice.data;
export const selectLastMember = (state) => state.memberVoice.lastMember
export default memberVoiceSlice.reducer;