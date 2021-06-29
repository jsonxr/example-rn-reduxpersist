import { Reducer, AnyAction } from '@reduxjs/toolkit'
import { Migrations } from './createMigrations'

export type Feature<T> = {
  name: string
  reducer: Reducer<T, AnyAction>
  migrations: Migrations
}
