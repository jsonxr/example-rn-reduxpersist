import { createSelector, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { Todo } from './todos.model'
import createMigrations from '../../app/createMigrations'

const adapter = createEntityAdapter<Todo>({
  selectId: (t) => t.key,
  // Keep the "all IDs" array sorted based on book titles
})

export type State = EntityState<Todo> & {
  loading?: 'idle' | 'pending'
}
const initialState: State = {
  loading: 'idle',
  ...adapter.getInitialState(),
}

export const name = 'todo'
export const slice = createSlice({
  name,
  initialState,
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    loading(state, action: PayloadAction<'idle' | 'pending'>) {
      state.loading = action.payload
    },
    addOne: adapter.addOne,
    updateOne: adapter.updateOne,
    removeOne: adapter.removeOne,
    setAll(state, action: PayloadAction<Todo[]>) {
      // Or, call them as "mutating" helpers in a case reducer
      adapter.setAll(state, action.payload)
    },
  },
})

export const reducer = slice.reducer
export const actions = {
  ...slice.actions,
}

//------------------------------------------------------------------------------
// Selectors
//------------------------------------------------------------------------------
const rootSelector = (state: AppState) => state.todo
const booksSelectors = adapter.getSelectors<AppState>(rootSelector)
const loading = createSelector(rootSelector, (state) => state.loading)

export const selectors = {
  loading,
  selectAll: booksSelectors.selectAll,
  selectIds: booksSelectors.selectIds,
  selectById: (id: string) => (state: AppState) => booksSelectors.selectById(state, id),
}

//------------------------------------------------------------------------------
// Migrations
//------------------------------------------------------------------------------
export const migrations = createMigrations({
  // 0: (state: any) => ({ ...state, loading: 'idle' }),
})

// export default {
//   name,
//   reducer,
//   migrations,
// } as Feature<State>
