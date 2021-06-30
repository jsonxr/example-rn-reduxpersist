/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react'
import { View, Text, Button } from 'react-native'
import { useParams, useHistory } from 'react-router-native'
import { useTodo } from './todos.hook'

type TodoViewProps = {}
const TodoView = memo(({}: TodoViewProps) => {
  const { goBack } = useHistory()
  const { id } = useParams<{ id: string }>()
  const { todo, remove, update } = useTodo(id)

  const onChange = () => {
    update({ ...todo, notes: todo.notes + `\n${new Date()}` })
  }

  if (!todo) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={goBack} title="back" />
        <Button onPress={onChange} title="change" />
        <Button onPress={remove} title="delete" />
      </View>

      <Text>id: {todo.id}</Text>
      <Text>Title: {todo.title}</Text>
      <Text>Notes: {todo.notes}</Text>
    </View>
  )
})

export default TodoView
