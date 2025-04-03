import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { userApi } from "./apis/userApi"
import authReducer from "./slices/authSlice"
import { settingsApi } from "./apis/settingsApi"
import { policyAndComplianceApi } from "./apis/policyAndComplianceApi"
import { subscriptionApi } from "./apis/subscriptionApi"

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
  [policyAndComplianceApi.reducerPath]: policyAndComplianceApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Add reducers you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      userApi.middleware,
      settingsApi.middleware,
      policyAndComplianceApi.middleware,
      subscriptionApi.middleware,
    ),
})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ; (store as any).__persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
