import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RoomSlice from "./roomSlice/RoomSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  room: RoomSlice,
});

// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };

// const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: persistReducers,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
