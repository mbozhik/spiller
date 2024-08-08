'use client'

import {useState, useEffect} from 'react'
import {isMobile} from '@bozzhik/is-mobile'

import {product as productFilters} from '@/lib/categories_[product.ts]'
import {filterTitles} from '@/lib/categorize_products'

import {useFilterStore} from '@/state/filters'

import {Product} from '@/app/products/page' // interface (types)
import CheckboxBlock from '##/products/CheckboxBlock'
import CatalogCard from '##/products/CatalogCard'
import Button from '#/UI/Button'
import Title from '#/UI/Title'

import {ChevronUp, ChevronDown, Search} from 'lucide-react'

interface Filter {
  filterName: string
  filterOption: string
}

const gridConfig = {
  global: 'grid-cols-10',
  filters: 'col-span-2 sm:col-span-10',
  grid: 'col-span-8 sm:col-span-10',
}

const Catalog: React.FC<{products: Product[]}> = ({products}) => {
  const {filters, addFilter, removeFilter, resetFilters} = useFilterStore()

  const [selectedFilters, setSelectedFilters] = useState<Filter[]>(filters)
  const [expandedFilters, setExpandedFilters] = useState<boolean[]>(productFilters.map((filter) => (!isMobile ? filter.name === 'main_filter' : false)))
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSelectedFilters(filters)

    if (!isMobile) {
      // Expand all groups that have selected filters and always expand main_filter
      const newExpandedFilters = productFilters.map((filter) => filter.name === 'main_filter' || filters.some((selectedFilter) => selectedFilter.filterName === filter.name))
      setExpandedFilters(newExpandedFilters)
    }
  }, [filters])

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
      const productName = product.name.replace(/ ?- ?/g, ' ').replace(/\s+/g, '').toLowerCase()
      const productCaption = product.caption.replace(/\s+/g, '').toLowerCase()
      const productArticle = product.article.toString().replace(/\s+/g, '').toLowerCase()
      const lowerCaseSearchQuery = searchQuery.replace(/ ?- ?/g, ' ').replace(/\s+/g, '').toLowerCase()

      matchesSearchQuery = productName.includes(lowerCaseSearchQuery) || productCaption.includes(lowerCaseSearchQuery) || productArticle.includes(lowerCaseSearchQuery)
    }

    return matchesFilters && matchesSearchQuery
  })

  const handleFilterChange = (filterOption: string, filterName: string, checked: boolean) => {
    let updatedFilters: Filter[] = [...selectedFilters]

    if (checked) {
      if (filterName === 'main_filter') {
        updatedFilters = updatedFilters.filter((filter) => filter.filterName !== 'main_filter')
      } else {
        updatedFilters = updatedFilters.filter((filter) => !(filter.filterName === filterName && filter.filterOption === filterOption))
      }

      const newFilter = {filterName, filterOption}
      updatedFilters.push(newFilter)
      addFilter(newFilter)
    } else {
      updatedFilters = updatedFilters.filter((filter) => !(filter.filterName === filterName && filter.filterOption === filterOption))
      removeFilter(filterName, filterOption)
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

        {selectedFilters.length > 0 && (
          <Button
            text="Сбросить фильтры"
            classes="block w-full text-base !mt-4"
            onClick={() => {
              setSelectedFilters([])
              resetFilters()
              // Ensure main_filter is always expanded
              setExpandedFilters(productFilters.map((filter) => filter.name === 'main_filter'))
            }}
          ></Button>
        )}
      </section>

      <section data-section="grid-catalog" className={`grid relative grid-cols-3 xl:grid-cols-2 auto-rows-min sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
        {filteredProducts.length === 0 ? (
          <div className="absolute inset-0 grid w-full h-fit place-items-center">
            <Title text="Ничего не найдено" />
            <Button
              text="Сбросить фильтры"
              classes="block w-[50%] text-base !mt-3"
              variant="secondary"
              onClick={() => {
                setSelectedFilters([])
                resetFilters()
                // Ensure main_filter is always expanded
                setExpandedFilters(productFilters.map((filter) => filter.name === 'main_filter'))
              }}
            ></Button>
          </div>
        ) : (
          filteredProducts.map((item, idx) => <CatalogCard key={idx} item={item} idx={idx} />)
        )}
      </section>
    </div>
  )
}

export default Catalog
