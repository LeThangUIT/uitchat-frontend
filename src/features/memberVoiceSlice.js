import { createSlice, current } from "@reduxjs/toolkit";

const memberVoiceSlice = createSlice({
    name: "memberVoice",
    initialState: {
      loading: null,
      data: []
    },
    reducers: {
      memberJoinVoiceChannel: (state, action) => {
        console.log(action.payload)
        const member = action.payload;
        state.data.push(member);
      },
      fetchMembersVoiceChannel: (state, action) => {
        state.data = action.payload
      },

      memberLeftVoiceChannel: (state, action) => {
        state.data = current(state).data.filter(member => (member.userId !== action.payload.userId))
      }
    }
})

export const { memberJoinVoiceChannel, fetchMembersVoiceChannel, memberLeftVoiceChannel } = memberVoiceSlice.actions;
export const selectMemberVoiceChannel = (state) => state.memberVoice.data;
export const selectLastMember = (state) => state.memberVoice.lastMember
export default memberVoiceSlice.reducer;