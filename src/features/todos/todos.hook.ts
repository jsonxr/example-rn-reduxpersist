import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Todo } from './todos.model'
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
    (todo: Todo) => {
      dispatch(actions.loading('pending'))
      dispatch(actions.addOne(todo))
      dispatch(actions.loading('idle'))
    },
    [dispatch]
  )

  return {
    useSelectAll: () => useAppSelector(selectors.selectAll),
    useSelectIds: () => useAppSelector(selectors.selectIds),
    useSelectById: (id: string) => useAppSelector(selectors.selectById(id)),
    remove,
    add,
  }
}

export const useTodo = (key: string) => {
  const dispatch = useAppDispatch()
  const todo = useAppSelector(selectors.selectById(key))
  if (!todo) {
    throw new Error(`Todo[${key}] does not exist.`)
  }

  const update = useCallback(
    (id: string, changes: Partial<Todo>) => {
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
    update: (changes: Partial<Todo>) => update(todo.key, changes),
    remove: () => remove(todo.key),
  }
}
