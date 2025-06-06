import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userService";
import { groupApi } from "../services/groupService";
import { groupMemberApi } from "../services/groupMemberService";
import { messageApi } from "../services/messageService";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [groupMemberApi.reducerPath]: groupMemberApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(groupApi.middleware)
      .concat(groupMemberApi.middleware)
      .concat(messageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
