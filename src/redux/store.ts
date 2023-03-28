import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"


const rootReducer = combineReducers({
  authReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})

export type RootState = ReturnType<typeof rootReducer>
export type AppSrore = ReturnType<typeof setupStore>
export type AppDispatch = AppSrore["dispatch"]