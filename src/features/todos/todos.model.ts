import uuid from 'react-native-uuid'

export type TodoSummary = { id: string; title: string }
export type TodoDetail = TodoSummary & { notes?: string }

export type TodoOptions = Omit<Partial<TodoSummary>, 'key'>

export const createTodo = ({ title, ...props }: TodoOptions = {}) => {
  const key = uuid.v4().toString()

  return {
    id: key,
    title: title ?? `Unknown ${key}`,
    ...props,
  } as TodoSummary
}
