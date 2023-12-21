// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import globalReducer from "./reducers/globalSlice";
import adminReducer from "./reducers/adminSlice";
import papersReducer from "./reducers/papersSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
    admin: adminReducer,
    papers: papersReducer,
  },
});

export default store;
