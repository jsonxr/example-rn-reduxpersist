import { createSelector, createEntityAdapter, createSlice, EntityState, PayloadAction, Update } from '@reduxjs/toolkit'
import { AppState } from '../../app/store'
import { TodoDetail, TodoSummary } from './todos.model'
import createMigrations from '../../app/createMigrations'

const summaryAdapter = createEntityAdapter<TodoSummary>({
  selectId: (t) => t.id,
  // Keep the "all IDs" array sorted based on book titles
})
const detailAdapter = createEntityAdapter<TodoDetail>({
  selectId: (t) => t.id,
})

export type State = {
  loading?: 'idle' | 'pending'
  summary: EntityState<TodoSummary>
  detail: EntityState<TodoDetail>
}
const initialState: State = {
  loading: 'idle',
  summary: summaryAdapter.getInitialState(),
  detail: detailAdapter.getInitialState(),
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
    addOne(state, action: PayloadAction<TodoDetail>) {
      summaryAdapter.addOne(state.summary, action.payload)
      detailAdapter.addOne(state.detail, action.payload)
    },
    updateOne(state, action: PayloadAction<Update<TodoDetail>>) {
      summaryAdapter.updateOne(state.summary, action.payload)
      detailAdapter.updateOne(state.detail, action.payload)
    },

    removeOne(state, action: PayloadAction<string>) {
      summaryAdapter.removeOne(state.summary, action.payload)
      detailAdapter.removeOne(state.detail, action.payload)
    },

    setAll(state, action: PayloadAction<TodoSummary[]>) {
      // Or, call them as "mutating" helpers in a case reducer
      summaryAdapter.setAll(state.summary, action.payload)
      detailAdapter.setAll(state.detail, action.payload)
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
const summarySelector = createSelector(rootSelector, (state) => state.summary)
const detailSelector = createSelector(rootSelector, (state) => state.detail)

const summarySelectors = summaryAdapter.getSelectors<AppState>(summarySelector)
const detailSelectors = detailAdapter.getSelectors<AppState>(detailSelector)

const loading = createSelector(rootSelector, (state) => state.loading)

export const selectors = {
  loading,
  selectAll: summarySelectors.selectAll,
  selectIds: summarySelectors.selectIds,
  selectById: (id: string) => (state: AppState) => detailSelectors.selectById(state, id),
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
