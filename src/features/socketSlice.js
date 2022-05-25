import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { END_POINT } from "../app/constant";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    value: null,
  },
  reducers: {
    socketConnect: (state, action) => {
      const userId = action.payload;
      state.value = io(END_POINT, { query: { userId } });
    },

    socketClose: (state) => {
      state.value.close();
    },

    socketRemoveAllListeners: (state) => {
      state.value.removeAllListeners();
    },

    socketRemoveListener: (state, action) => {
      const event = action.payload;
      state.value.off(event);
    },

    socketAddListener: (state, action) => {
      const name = action.payload.name;
      const callback = action.payload.callback;
      state.value.on(name, callback);
    },

    socketEmitEvent: (state, action) => {
      const name = action.payload.name;
      const data = action.payload.data;
      state.value.emit(name, data);
    },
  },
});

// Action creators are generated for each case reducer function
export const selectSocket = (state) => state.socket.value;
export const {
  socketConnect,
  socketClose,
  socketRemoveAllListeners,
  socketRemoveListener,
  socketAddListener,
  socketEmitEvent,
} = socketSlice.actions;

export default socketSlice.reducer;
