import {PersistStorage} from 'zustand/middleware'

const EXPIRY_DAYS = 3

type StorageValue<T> = {state: T} | undefined

export const createExpiringStorage = <T>(key: string): PersistStorage<T> => ({
  getItem: (name: string): StorageValue<T> | Promise<StorageValue<T>> => {
    const item = localStorage.getItem(name)
    if (!item) return undefined

    try {
      const parsed = JSON.parse(item)
      const now = new Date().getTime()
      const expiryTime = EXPIRY_DAYS * 24 * 60 * 60 * 1000 // 3 days in milliseconds

      if (now - parsed.timestamp > expiryTime) {
        localStorage.removeItem(name)
        return undefined
      }

      return JSON.parse(parsed.value) as StorageValue<T>
    } catch {
      return undefined
    }
  },
  setItem: (name: string, value: StorageValue<T>): void | Promise<void> => {
    const item = {
      value: JSON.stringify(value),
      timestamp: new Date().getTime(),
    }
    localStorage.setItem(name, JSON.stringify(item))
  },
  removeItem: (name: string): void | Promise<void> => {
    localStorage.removeItem(name)
  },
})
