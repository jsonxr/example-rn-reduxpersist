/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react'
import { View, Text, FlatList, ListRenderItem, Button } from 'react-native'
import { Link } from 'react-router-native'
import { useTodos } from './todos.hook'
import { createTodo, TodoSummary } from './todos.model'

type TodoSummaryViewProps = {
  todo: TodoSummary
}
const TodoSummaryView = memo(({ todo }: TodoSummaryViewProps) => {
  console.log('TodoView:', todo.id)
  const { remove, update } = useTodos()

  const onChange = () => {
    update(todo.id, { title: `title-${new Date()}` })
  }

  const onDelete = () => {
    remove(todo.id)
  }

  if (!todo) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <Button onPress={onChange} title="change" />
      <Button onPress={onDelete} title="delete" />
      <Link to={`/todos/${todo.id}`}>
        <Text>
          {todo.id}-{todo.title}
        </Text>
      </Link>
    </View>
  )
})

const Todos = () => {
  console.log('Todos')
  const { useSelectAll, add } = useTodos()
  const all = useSelectAll()

  const renderItem: ListRenderItem<TodoSummary> = ({ item }) => <TodoSummaryView key={item.id} todo={item} />

  const onAdd = () => {
    const todo = createTodo()
    add(todo)
  }

  return (
    <View>
      <Text>Todos</Text>
      <Button onPress={onAdd} title="Add" />
      <FlatList data={all} renderItem={renderItem} style={{ backgroundColor: 'yellow' }} keyExtractor={(i) => i.id} />
    </View>
  )
}

export default Todos
