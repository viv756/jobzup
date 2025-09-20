import { combineReducers, type UnknownAction,} from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import searchReducer from "./jobs/search.slice";
import messageReducer from "./message/message.slice";

const appReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  message: messageReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: UnknownAction) => {
  if (action.type === "user/logout") {
    state = undefined; // reset whole store
  }
  return appReducer(state, action);
};

export default rootReducer;
