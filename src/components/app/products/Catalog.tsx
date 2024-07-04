'use client'

import {useState} from 'react'
import {isMobile} from '@bozzhik/is-mobile'

import {product as productFilters} from '@/lib/categories_[product.ts]'
import {filterTitles} from '@/lib/categorize_products'

import {Product} from '@/app/products/page' // interface (types)
import CheckboxBlock from '#/app/products/CheckboxBlock'
import CatalogCard from '##/products/CatalogCard'
import Button from '@/components/UI/Button'

import {ChevronUp, ChevronDown, Search} from 'lucide-react'

interface CatalogProps {
  products: Product[]
}

interface Filter {
  filterName: string
  filterOption: string
}

const gridConfig = {
  global: 'grid-cols-10',
  filters: 'col-span-2 sm:col-span-10',
  grid: 'col-span-8 sm:col-span-10',
}

const Catalog: React.FC<CatalogProps> = ({products}) => {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([])
  const [expandedFilters, setExpandedFilters] = useState<boolean[]>(productFilters.map((filter) => (!isMobile ? filter.name === 'main_filter' : false)))
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((product) => {
    if (selectedFilters.length === 0 && !searchQuery) return true

    let matchesFilters = true
    if (selectedFilters.length > 0) {
      matchesFilters = selectedFilters.every((filter) => {
        if (!product[filter.filterName]) return false

        return product[filter.filterName]?.includes(filter.filterOption)
      })
    }

    let matchesSearchQuery = true
    if (searchQuery) {
      const productName = product.name.toLowerCase()
      const productDescription = product.description.toLowerCase()
      matchesSearchQuery = productName.includes(searchQuery.toLowerCase()) || productDescription.includes(searchQuery.toLowerCase())
    }

    return matchesFilters && matchesSearchQuery
  })

  const handleFilterChange = (filterOption: string, filterName: string, checked: boolean) => {
    let updatedFilters: Filter[] = [...selectedFilters]

    if (checked) {
      // If the filter being added is a main filter, remove any existing main filter first
      if (filterName === 'main_filter') {
        updatedFilters = updatedFilters.filter((filter) => filter.filterName !== 'main_filter')
      } else {
        // For non-main filters, remove any existing filter with the same name
        updatedFilters = updatedFilters.filter((filter) => filter.filterName !== filterName)
      }

      updatedFilters.push({filterName, filterOption})
    } else {
      updatedFilters = updatedFilters.filter((filter) => !(filter.filterName === filterName && filter.filterOption === filterOption))
    }

    setSelectedFilters(updatedFilters)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const mainFilterSelection = selectedFilters.find((filter) => filter.filterName === 'main_filter')

  return (
    <div data-section="products" className={`grid gap-5 w-full ${gridConfig.global}`}>
      <section data-section="filters-catalog" className={`space-y-3 ${gridConfig.filters}`}>
        <div className="flex items-center justify-between px-3 text-lg font-semibold sm:text-base sm:py-2 INPUT ">
          <input
            className="w-full pr-3.5 sm:pr-5 border-none outline-none text-custom-blue placeholder:text-custom-blue"
            placeholder="Поиск"
            type="text"
            value={searchQuery}
            onChange={handleSearch} // search functionality
          />
          <Search className="s-6 mt-0.5" />
        </div>

        {productFilters.map((filter, index) => {
          const isForFace = filter.name === 'for_face'
          const isForBody = filter.name === 'for_body'
          const isMainFilterSelected = mainFilterSelection && mainFilterSelection.filterOption === (isForFace ? 'face' : isForBody ? 'body' : '')

          if ((isForFace || isForBody) && !isMainFilterSelected) return null

          return (
            <div className="space-y-3" key={filter.name}>
              <p
                className="flex items-center justify-between gap-1 px-3 py-1 text-lg font-semibold sm:py-2 sm:text-base bg-neutral-200"
                onClick={() => {
                  const newExpandedFilters = [...expandedFilters]
                  newExpandedFilters[index] = !newExpandedFilters[index]
                  setExpandedFilters(newExpandedFilters)
                }}
              >
                {filterTitles[filter.name] || ''}
                {expandedFilters[index] ? <ChevronUp className="s-6 mt-0.5" /> : <ChevronDown className="s-6 mt-0.5" />}
              </p>

              {expandedFilters[index] && (
                <div className="space-y-2 sm:space-y-5 sm:pt-0.5 pb-2 sm:pb-2.5 sm:px-3">
                  {filter.options.list.map((option) => (
                    <CheckboxBlock key={option.value} id={option.value} text={option.title} checked={selectedFilters.some((filter) => filter.filterOption === option.value)} onChange={(checked) => handleFilterChange(option.value, filter.name, checked)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {selectedFilters.length > 0 && <Button text="Сбросить фильтры" classes="block w-full text-base !mt-4" onClick={() => setSelectedFilters([])}></Button>}
      </section>

      <section data-section="grid-catalog" className={`grid relative grid-cols-3 xl:grid-cols-2 auto-rows-min sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
        {filteredProducts.length === 0 ? (
          <div className="absolute inset-0 grid w-full h-fit place-items-center">
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
