import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'react-router-native'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link to="/todos">
        <Text>Todos</Text>
      </Link>
    </View>
  )
}

export default Home
