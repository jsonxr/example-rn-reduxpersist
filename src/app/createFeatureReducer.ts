/* eslint-disable no-console */
import { Reducer } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

import { PersistMigrate } from 'redux-persist/es/types'

function createFeatureReducer<T extends Reducer<any, any>>(
  key: string,
  reducer: T,
  migrations: { version: number; migrations: PersistMigrate },
  { debug = true, encryption = false }: { debug?: boolean; encryption?: boolean } = {}
) {
  const transforms = []

  if (encryption) {
    transforms.push(
      encryptTransform({
        secretKey: 'my-super-secret-key',
        onError: function (error) {
          // Handle the error.
          console.error('hrmmm...', error)
        },
      })
    )
  }

  return persistReducer(
    {
      key,
      debug,
      storage: AsyncStorage,
      transforms,
      ...migrations,
    },
    reducer
  ) as T
}

export default createFeatureReducer
