import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import userReducer from "./state/userState";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = combineReducers({
  userState: persistReducer(persistConfig, userReducer),
 
});
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store = { store }>
      <PersistGate loading = { null } persistor={persistStore(store)}>
      

            <App />
      
    </PersistGate>
    </Provider>
   
  </React.StrictMode>
);
