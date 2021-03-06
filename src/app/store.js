import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channelSlice";
import serverReducer from "../features/serverSlice";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";
import infoServerReducer from "../features/infoServerSlice";
import infoContactReducer from "../features/infoContactSlice";
import infoChannelReducer from "../features/infoChannelSlice";
import memberReducer from "../features/memberSlice";
import conversationReducer from "../features/conversationSlice";
import inviteReducer from "../features/inviteSlice";
import contactReducer from "../features/contactSlice";
import socketReducer from "../features/socketSlice";
import memberVoiceReducer from "../features/memberVoiceSlice";
import streamReducer from '../features/streamSlice';

export const store = configureStore({
  reducer: {
    infoServer: infoServerReducer,
    infoContact: infoContactReducer,
    infoChannel: infoChannelReducer,
    channel: channelReducer,
    server: serverReducer,
    auth: authReducer,
    message: messageReducer,
    member: memberReducer,
    conversation: conversationReducer,
    invite: inviteReducer,
    contact: contactReducer,
    memberVoice: memberVoiceReducer,
    socket: socketReducer,
    stream: streamReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
