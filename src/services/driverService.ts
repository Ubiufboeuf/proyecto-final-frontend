import type { Driver } from '@/env'

const DRIVERS: Driver[] = [
  {
    id: 'd123',
    name: 'Bob Johnson'
  }
]

export async function getDrivers () {
  return DRIVERS
}
