import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { weddingApi } from "./features/apis/weddingApi"
import authReducer from "./features/slices/authSlice"
import currentWeddingReducer from "./features/slices/currentWeddingSlice"
import plannerReducer from "./features/slices/plannerSlice"
import { plannerApi } from "./features/apis/plannerApi"
import onboardingSliderReducer from "./features/ui/slider-page-onboarding/OnboardingSliderPageSlice"
import onboardingDataReducer from "./features/ui/onboardingData"
import { expenseApi } from "./features/apis/expenseApi"
import { guestApi } from "./features/apis/guestApi"
import { eventsApi } from "./features/apis/eventsApi"
import { seatingApi } from "./features/apis/seatingApi"
import { collabApi } from "./features/apis/collabApi"
import { communicationApi } from "./features/apis/communicationApi"
import { userApi } from "./features/apis/userApi"
import { groupApi } from "./features/apis/groupApi"
import { uploadImageApi } from "./features/apis/uploadImageApi"
import { notificationApi } from "./features/apis/notificationApi"
import { contactsApi } from "./features/apis/contactsApi"
import { websiteCreationApis } from "./features/apis/websiteCreationApis"
import theme1Reducer from "./features/slices/custom-wedding-slices/theme1Slice"
import customWebsiteSlugReducer from "./features/slices/custom-wedding-slices/customWebsiteSlugSlice"
import { invitesApi } from "./features/apis/inviteApi"
import inviteCardReducer from "./features/slices/custom-wedding-slices/inviteCardSlice"


// const authPersistConfig = {
//   key: "auth",
//   storage,
// }

// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
  auth: authReducer,
  planner: plannerReducer,
  onboardingSliderReducer: onboardingSliderReducer,
  onboardingDataReducer,
  currentWedding: currentWeddingReducer,
  theme1: theme1Reducer,
  customWebsiteSlug: customWebsiteSlugReducer,
  inviteCard: inviteCardReducer,
  [weddingApi.reducerPath]: weddingApi.reducer,
  [plannerApi.reducerPath]: plannerApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [guestApi.reducerPath]: guestApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [seatingApi.reducerPath]: seatingApi.reducer,
  [collabApi.reducerPath]: collabApi.reducer,
  [communicationApi.reducerPath]: communicationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [groupApi.reducerPath]: groupApi.reducer,
  [uploadImageApi.reducerPath]: uploadImageApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  [websiteCreationApis.reducerPath]: websiteCreationApis.reducer,
  [invitesApi.reducerPath]: invitesApi.reducer,

})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "currentWedding", "customWebsiteSlug"], // Add reducers you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = (context: Context) => {
  const store = configureStore({
    reducer: (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state, // Ensure state is an object
          ...(typeof action.payload === "object" && action.payload !== null
            ? action.payload
            : {}), // Ensure action.payload is an object
        }
        // Preserve persisted states
        if (state) {
          Object.keys(state).forEach((key) => {
            if (persistConfig.whitelist.includes(key)) {
              nextState[key] = state[key]
            }
          })
        }
        return nextState
      } else {
        return persistedReducer(state, action)
      }
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: { extraArgument: context },
      }).concat(
        weddingApi.middleware,
        plannerApi.middleware,
        expenseApi.middleware,
        guestApi.middleware,
        eventsApi.middleware,
        seatingApi.middleware,
        collabApi.middleware,
        communicationApi.middleware,
        userApi.middleware,
        contactsApi.middleware,
        groupApi.middleware,
        uploadImageApi.middleware,
        notificationApi.middleware,
        websiteCreationApis.middleware,
        invitesApi.middleware
      ),
  })

    ; (store as any).__persistor = persistStore(store) // This creates the persistor

  return store
}

export const wrapper = createWrapper(makeStore)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
