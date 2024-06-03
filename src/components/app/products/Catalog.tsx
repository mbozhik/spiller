'use client'

import {useState} from 'react'

import {product as productFilters} from '@/lib/categories_[product.ts]'

import {Product} from '@/app/products/page' // interface (types)
import CheckboxBlock from '#/app/products/CheckboxBlock'
import CatalogCard from '##/products/CatalogCard'

interface CatalogProps {
  products: Product[]
}

const Catalog: React.FC<CatalogProps> = ({products}) => {
  const gridConfig = {
    global: 'grid-cols-10',
    filters: 'col-span-2',
    grid: 'col-span-8 sm:col-span-10',
  }

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const handleFilterChange = (filterId: string, checked: boolean) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, filterId])
    } else {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId))
    }
  }

  const filteredProducts = products.filter((product) => {
    if (selectedFilters.length === 0) return true
    return selectedFilters.some((filterId) => product.article.toString().startsWith(filterId))
  })

  return (
    <div data-section="products" className={`grid gap-5 w-full ${gridConfig.global}`}>
      <section data-section="filters-catalog" className={`space-y-7 sm:hidden ${gridConfig.filters}`}>
        {productFilters.map((filter) => (
          <div className="space-y-3" key={filter.name}>
            <p className="pl-2 text-lg font-bold bg-neutral-200">{filter.title}</p>

            <div className="space-y-2">
              {filter.options.list.map((option) => (
                <CheckboxBlock key={option.value} id={option.value} text={option.title} checked={selectedFilters.includes(option.value)} onChange={(checked) => handleFilterChange(option.value, checked)} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section data-section="grid-catalog" className={`grid grid-cols-3 sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
        {filteredProducts.map((item, idx) => (
          <CatalogCard key={idx} item={item} idx={idx} />
        ))}
      </section>
    </div>
  )
}

export default Catalog
