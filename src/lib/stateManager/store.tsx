import { configureStore } from "@reduxjs/toolkit";
import { reducer as messagesReducer } from "./features/messages.slice";
import { reducer as currentUserReducer } from "./features/currentUser.slice";
import { reducer as settingReducer } from "./features/settingModal.slice";
import { messagesService } from "./services/messages.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersService } from "./services/users.service";

export const makeStore = () => {
  return configureStore({
    reducer: {
      messages: messagesReducer,
      currentUser: currentUserReducer,
      settingModal: settingReducer,
      [messagesService.reducerPath]: messagesService.reducer,
      [UsersService.reducerPath]: UsersService.reducer,
    },
    middleware: (getDefaultMiddle) =>
      getDefaultMiddle()
        .concat(messagesService.middleware)
        .concat(UsersService.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
