import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user-slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

// Inferred types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
