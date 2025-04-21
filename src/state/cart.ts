import {create, StateCreator} from 'zustand'
import {persist} from 'zustand/middleware'
import {createExpiringStorage} from '@/lib/expiring-storage'

export interface CartStore {
  count: number
  addProduct: (count: number) => void
  removeProduct: (count: number) => void
  resetCart: () => void
}

const cartSlice: StateCreator<CartStore, [['zustand/persist', unknown]]> = (set, get) => ({
  count: 0,
  addProduct: () => set({count: get().count + 1}),
  removeProduct: (count: number) => set({count: get().count > count ? get().count - count : 0}),
  resetCart: () => set({count: 0}),
})

export const useCartCounter = create<CartStore>()(
  persist(cartSlice, {
    name: 'cart-storage',
    storage: createExpiringStorage<CartStore>('cart-storage'),
  }),
)
