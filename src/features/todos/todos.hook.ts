import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { TodoDetail, TodoSummary } from './todos.model'
import { selectors, actions } from './todos.slice'

export const useTodos = () => {
  const dispatch = useAppDispatch()

  const remove = useCallback(
    (id: string) => {
      dispatch(actions.loading('pending'))
      dispatch(actions.removeOne(id))
      dispatch(actions.loading('idle'))
    },
    [dispatch]
  )

  const add = useCallback(
    (todo: TodoSummary) => {
      dispatch(actions.loading('pending'))
      dispatch(actions.addOne(todo))
      dispatch(actions.loading('idle'))
    },
    [dispatch]
  )

  const update = useCallback(
    (id: string, changes: Partial<TodoSummary>) => {
      dispatch(actions.updateOne({ id, changes }))
    },
    [dispatch]
  )

  return {
    useSelectAll: () => useAppSelector(selectors.selectAll),
    useSelectById: (id: string) => useAppSelector(selectors.selectById(id)),
    remove,
    add,
    update,
  }
}

export const useTodo = (key: string) => {
  const dispatch = useAppDispatch()

  const todo = useAppSelector(selectors.selectById(key))
  if (!todo) {
    throw new Error(`Todo[${key}] does not exist.`)
  }

  const update = useCallback(
    (id: string, changes: Partial<TodoDetail>) => {
      dispatch(actions.updateOne({ id, changes }))
    },
    [dispatch]
  )

  const remove = useCallback(
    (id: string) => {
      dispatch(actions.removeOne(id))
    },
    [dispatch]
  )

  return {
    todo,
    update: (changes: Partial<TodoDetail>) => update(todo.id, changes),
    remove: () => remove(todo.id),
  }
}
