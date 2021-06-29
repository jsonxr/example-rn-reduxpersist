/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react'
import { View, Text, FlatList, ListRenderItem, Button } from 'react-native'
import { useTodo, useTodos } from './todos.hook'
import { createTodo } from './todos.model'

type TodoViewProps = {
  id: string
}
const TodoView = memo(({ id }: TodoViewProps) => {
  console.log('TodoView:', id)
  const { todo, remove, update } = useTodo(id)

  const onChange = () => {
    update({ ...todo, title: `${new Date()}` })
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
      <Button onPress={remove} title="delete" />
      <Text>
        {todo.key}-{todo.title}
      </Text>
    </View>
  )
})

const Todos = () => {
  console.log('Todos')
  const { useSelectIds, add } = useTodos()
  const all = useSelectIds() as string[]

  const renderItem: ListRenderItem<string> = ({ item }) => <TodoView key={item} id={item} />

  const onAdd = () => {
    const todo = createTodo()
    add(todo)
  }

  return (
    <View>
      <Text>Todos</Text>
      <Button onPress={onAdd} title="Add" />
      <FlatList data={all} renderItem={renderItem} style={{ backgroundColor: 'yellow' }} keyExtractor={(i) => i} />
    </View>
  )
}

export default Todos
