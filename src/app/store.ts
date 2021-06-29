import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createFeatureReducer from './createFeatureReducer'

import * as todos from '../features/todos/todos.slice'

const rootReducer = combineReducers({
  todo: createFeatureReducer(todos.name, todos.reducer, todos.migrations),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // If this isn't here... "non-serializable value was detected in an action, in the path: `register`""
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
