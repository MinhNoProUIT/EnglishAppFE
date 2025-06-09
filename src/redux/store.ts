import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userService";
import { authApi } from "../services/AuthService";

import { groupApi } from "../services/groupService";
import { groupMemberApi } from "../services/groupMemberService";
import { messageApi } from "../services/messageService";
import { paymentApi } from "../services/paymentService";
import { postApi } from "../services/postService";
import { attendanceApi } from "../services/attendanceService";
import { sharedPostApi } from "../services/sharedPostService";
import { reactPostApi } from "../services/reactPostService";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [groupMemberApi.reducerPath]: groupMemberApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [sharedPostApi.reducerPath]: sharedPostApi.reducer,
    [reactPostApi.reducerPath]: reactPostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      authApi.middleware,
      groupApi.middleware,
      groupMemberApi.middleware,
      messageApi.middleware,
      paymentApi.middleware,
      postApi.middleware,
      attendanceApi.middleware,
      sharedPostApi.middleware,
      reactPostApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
