import { createSlice, current } from "@reduxjs/toolkit";

const streamSlice = createSlice({
  name: "stream",
  initialState: {
    loading: null,
    data: []
  },
  reducers: {
    setStream: (state, action) => {
      const stream = action.payload;
      state.data.push(stream);
    }
  }
})

export const { setStream } = streamSlice.actions;
export const selectStream = (state) => state.stream.data;
export default streamSlice.reducer;