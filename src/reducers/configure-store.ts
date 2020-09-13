import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { playerReducer } from "./player-reducer";

const persistConfig = {
  key: "player",
  storage,
};

const persistedReducer = persistReducer(persistConfig, playerReducer);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
