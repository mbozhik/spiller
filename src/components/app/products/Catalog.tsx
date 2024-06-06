'use client'

import {useState} from 'react'

import {product as productFilters} from '@/lib/categories_[product.ts]'
import {filterTitles} from '@/lib/categorize_products'

import {Product} from '@/app/products/page' // interface (types)
import CheckboxBlock from '#/app/products/CheckboxBlock'
import CatalogCard from '##/products/CatalogCard'

interface CatalogProps {
  products: Product[]
}

interface Filter {
  filterName: string
  filterOption: string
}

const gridConfig = {
  global: 'grid-cols-10',
  filters: 'col-span-2',
  grid: 'col-span-8 sm:col-span-10',
}

const Catalog: React.FC<CatalogProps> = ({products}) => {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([])
  console.log('🚀 ~ selectedFilters:', selectedFilters)

  const filteredProducts = products.filter((product) => {
    if (selectedFilters.length === 0) return true

    return selectedFilters.every((filter) => {
      if (!product[filter.filterName]) return false

      return product[filter.filterName]?.includes(filter.filterOption)
    })
  })

  const handleFilterChange = (filterOption: string, filterName: string, checked: boolean) => {
    let updatedFilters: Filter[] = [...selectedFilters]

    if (checked) {
      // If the selected filter is a main_filter or a filter of type other than main_filter,
      // remove any existing filter of the same type
      if (filterName !== 'main_filter') {
        updatedFilters = updatedFilters.filter((filter) => filter.filterName !== filterName)
      }

      // Add the new filter
      updatedFilters.push({filterName, filterOption})
    } else {
      // Remove the deselected filter
      updatedFilters = updatedFilters.filter((filter) => !(filter.filterName === filterName && filter.filterOption === filterOption))
    }

    setSelectedFilters(updatedFilters)
  }

  const mainFilterSelection = selectedFilters.find((filter) => filter.filterName === 'main_filter')

  return (
    <div data-section="products" className={`grid gap-5 w-full ${gridConfig.global}`}>
      <section data-section="filters-catalog" className={`space-y-7 sm:hidden ${gridConfig.filters}`}>
        {productFilters.map((filter) => {
          const isForFace = filter.name === 'for_face'
          const isForBody = filter.name === 'for_body'
          const isMainFilterSelected = mainFilterSelection && mainFilterSelection.filterOption === (isForFace ? 'face' : isForBody ? 'body' : '')

          if ((isForFace || isForBody) && !isMainFilterSelected) return null // Skip rendering for_face and for_body if main filter is not selected

          return (
            <div className="space-y-3" key={filter.name}>
              <p className="pl-2 text-lg font-bold bg-neutral-200">{filterTitles[filter.name] || ''}</p>
              <div className="space-y-2">
                {filter.options.list.map((option) => (
                  <CheckboxBlock key={option.value} id={option.value} text={option.title} checked={selectedFilters.some((filter) => filter.filterOption === option.value)} onChange={(checked) => handleFilterChange(option.value, filter.name, checked)} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section data-section="grid-catalog" className={`grid relative grid-cols-3 auto-rows-min sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
        {filteredProducts.length === 0 ? (
          <div className="w-full h-fit absolute inset-0 grid place-items-center">
            <mark className="h-fit">Ничего не найдено</mark>
          </div>
        ) : (
          filteredProducts.map((item, idx) => <CatalogCard key={idx} item={item} idx={idx} />)
        )}
      </section>
    </div>
  )
}

export default Catalog
