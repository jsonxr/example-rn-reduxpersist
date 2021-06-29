/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { SafeAreaView } from 'react-native'
import { NativeRouter as Router, Switch, Route } from 'react-router-native'

import Home from './screens/Home'
import Todos from './features/todos/Todos'
import { Provider } from 'react-redux'
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/todos" component={Todos} />
            </Switch>
          </Router>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

export default App
