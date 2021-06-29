/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { SafeAreaView } from 'react-native'
import { NativeRouter as Router, Switch, Route } from 'react-router-native'

import Home from './screens/Home'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </SafeAreaView>
  )
}

export default App
