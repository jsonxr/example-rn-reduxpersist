import { createMigrate, PersistMigrate } from 'redux-persist'

const getMax = (a: number, b: number) => Math.max(a, b)

export type Migrations = {
  version: number
  migrations: PersistMigrate
}

const createMigrations = (
  migrations: Record<number, (state: any) => any>,
  { debug = false }: { debug?: boolean } = {}
): Migrations => {
  const version = Object.keys(migrations)
    .map((k) => Number(k))
    .reduce(getMax, -1)

  return {
    version,
    migrations: createMigrate(migrations, { debug }),
  }
}

export default createMigrations
