import {create, StateCreator} from 'zustand'
import {persist} from 'zustand/middleware'
import {createExpiringStorage} from '@/lib/expiring-storage'

export interface Filter {
  filterName: string
  filterOption: string
}

export interface FilterStore {
  filters: Filter[]
  addFilter: (filter: Filter) => void
  removeFilter: (filterName: string, filterOption: string) => void
  resetFilters: () => void
}

const filterSlice: StateCreator<FilterStore, [['zustand/persist', unknown]]> = (set, get) => ({
  filters: [],
  addFilter: (filter: Filter) => {
    let updatedFilters = [...get().filters]

    // Remove any existing filter with the same filterName
    updatedFilters = updatedFilters.filter((f) => f.filterName !== filter.filterName)

    updatedFilters.push(filter)
    set({filters: updatedFilters})
  },
  removeFilter: (filterName: string, filterOption: string) =>
    set({
      filters: get().filters.filter((f) => !(f.filterName === filterName && f.filterOption === filterOption)),
    }),
  resetFilters: () => set({filters: []}),
})

export const useFilterStore = create<FilterStore>()(
  persist(filterSlice, {
    name: 'filter-storage',
    storage: createExpiringStorage<FilterStore>('filter-storage'),
  }),
)
