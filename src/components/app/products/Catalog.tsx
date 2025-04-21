'use client'

import {useState, useEffect} from 'react'
import {isMobile} from '@bozzhik/is-mobile'

import {product as productFilters} from '@/lib/categories_[product.ts]'
import {filterTitles} from '@/lib/categorize_products'

import {useFilterStore} from '@/state/filters'

import {TProduct} from '@/lib/get_products'
import CheckboxBlock from '##/products/CheckboxBlock'
import CatalogCard from '##/products/CatalogCard'
import Button from '#/UI/Button'
import Title from '#/UI/Title'

import {ChevronUp, ChevronDown, Search} from 'lucide-react'
import {cn} from '@/lib/utils'

interface Filter {
  filterName: string
  filterOption: string
}

const gridConfig = {
  global: 'grid-cols-10',
  filters: 'col-span-2 sm:col-span-10',
  grid: 'col-span-8 sm:col-span-10',
}

const Catalog: React.FC<{products: TProduct[]}> = ({products}) => {
  const {filters, addFilter, removeFilter, resetFilters} = useFilterStore()

  const [selectedFilters, setSelectedFilters] = useState<Filter[]>(filters)
  const [expandedFilters, setExpandedFilters] = useState<boolean[]>(productFilters.map((filter) => (!isMobile ? filter.name === 'main_filter' : false)))
  const [searchQuery, setSearchQuery] = useState('')
  const [showDiscounted, setShowDiscounted] = useState(false) // Добавляем новое состояние

  useEffect(() => {
    setSelectedFilters(filters)

    if (!isMobile) {
      // Expand all groups that have selected filters and always expand main_filter
      const newExpandedFilters = productFilters.map((filter) => filter.name === 'main_filter' || filters.some((selectedFilter) => selectedFilter.filterName === filter.name))
      setExpandedFilters(newExpandedFilters)
    }
  }, [filters])

  const filteredProducts = products.filter((product) => {
    // Сначала проверяем флаг showDiscounted
    if (showDiscounted) {
      return Boolean(product.discount_price) && (product.unavailable === false || product.unavailable === null)
    }

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
    setShowDiscounted(false) // Сбрасываем флаг при изменении фильтров
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
    setShowDiscounted(false) // Сбрасываем флаг при поиске
    setSearchQuery(event.target.value)
  }

  const mainFilterSelection = selectedFilters.find((filter) => filter.filterName === 'main_filter')

  const handleDiscountedProducts = () => {
    if (showDiscounted) {
      // Если уже показываем скидочные товары - отключаем режим
      setShowDiscounted(false)
    } else {
      // Проверяем наличие скидочных товаров и включаем режим
      const discountedProducts = products.filter((product) => product.discount_price && (product.unavailable === false || product.unavailable === null))
      if (discountedProducts.length > 0) {
        setSelectedFilters([])
        resetFilters()
        setSearchQuery('')
        setShowDiscounted(true)
      }
    }
  }

  const handleResetFilters = () => {
    setSelectedFilters([])
    resetFilters()
    setShowDiscounted(false) // Сбрасываем флаг при сбросе фильтров
    setExpandedFilters(productFilters.map((filter) => filter.name === 'main_filter'))
  }

  return (
    <div data-section="products" className={`grid gap-5 w-full ${gridConfig.global}`}>
      <section data-section="filters-catalog" className={`space-y-3 ${gridConfig.filters}`}>
        {products.some((product) => Boolean(product.discount_price)) && (
          <div className={cn('w-full px-3 py-2 border bg-custom-blue text-white text-center cursor-pointer hover:bg-custom-blue/80 duration-200', showDiscounted && 'bg-custom-blue/80')} onClick={handleDiscountedProducts}>
            Товары на скидке
          </div>
        )}

        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-3 text-lg font-semibold sm:text-base sm:py-2 INPUT">
            <input
              className="w-full pr-3.5 sm:pr-5 border-none outline-none text-custom-blue placeholder:text-custom-blue"
              placeholder="Поиск"
              type="text"
              value={searchQuery}
              onChange={handleSearch} // search functionality
            />
            <Search className="s-6 mt-0.5" />
          </div>

          {selectedFilters.length > 0 && <Button text="Сбросить фильтры" classes="block w-full text-base" onClick={handleResetFilters}></Button>}
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
      </section>

      <section data-section="grid-catalog" className={`grid relative grid-cols-3 xl:grid-cols-2 auto-rows-min sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
        {filteredProducts.length === 0 ? (
          <div className="col-span-3 xl:col-span-2 sm:col-span-1 space-y-24 sm:space-y-10">
            <div className="grid w-full pt-10 sm:pt-6 place-items-center">
              <Title text="Ничего не найдено" />

              <Button text="Сбросить фильтры" classes="block w-[60%] sm:w-full text-base !mt-3" variant="secondary" onClick={handleResetFilters} />
            </div>

            <div className="space-y-2">
              <Title text="Возможно, вас заинтересует:" classes="text-center" />

              <div className="grid grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-3">
                {products
                  .slice(0, 9) // Show first 6 products
                  .map((item, idx) => (
                    <CatalogCard key={idx} item={item} idx={idx} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          filteredProducts.map((item, idx) => <CatalogCard key={idx} item={item} idx={idx} />)
        )}
      </section>
    </div>
  )
}

export default Catalog
