import uuid from 'react-native-uuid'

export type Todo = { key: string; title: string }
export type TodoOptions = Omit<Partial<Todo>, 'key'>

export const createTodo = ({ title, ...props }: TodoOptions = {}) => {
  const key = uuid.v4().toString()

  return {
    key,
    title: title ?? `Unknown ${key}`,
    ...props,
  } as Todo
}
