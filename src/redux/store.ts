import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import docsReducer from "../features/docsSlice"


const rootReducer = combineReducers({
  authReducer,
  docsReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    docs: docsReducer,
  }
})

export type RootState = ReturnType<typeof rootReducer>
export type AppSrore = ReturnType<typeof setupStore>
export type AppDispatch = AppSrore["dispatch"]