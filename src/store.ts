import {create, StateCreator} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export interface CartStore {
  count: number
  addProduct: (count: number) => void
}

const cartSlice: StateCreator<CartStore, [['zustand/persist', unknown]]> = (set, get) => ({
  count: 0,
  addProduct: () => set({count: get().count + 1}),
})

export const useCartCounter = create<CartStore>()(
  persist(cartSlice, {
    name: 'cart-storage',
  }),
)
