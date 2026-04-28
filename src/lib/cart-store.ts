'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  mrp: number
  image: string
  quantity: number
  color?: string
  size?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const { items } = get()
        const key = `${newItem.id}-${newItem.color ?? ''}-${newItem.size ?? ''}`
        const existing = items.find(
          (i) => `${i.id}-${i.color ?? ''}-${i.size ?? ''}` === key
        )
        if (existing) {
          set({
            items: items.map((i) =>
              `${i.id}-${i.color ?? ''}-${i.size ?? ''}` === key
                ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...newItem, quantity: newItem.quantity ?? 1 }] })
        }
        set({ isOpen: true })
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'falcon-cart' }
  )
)
