import {Product} from '@/app/products/page'
import CatalogCard from '##/products/CatalogCard'

interface CatalogProps {
  products: Product[]
}

const Catalog: React.FC<CatalogProps> = ({products}) => {
  const gridConfig = {
    global: 'grid-cols-10',
    filters: 'col-span-2',
    grid: 'col-span-8',
  }

  const filteredProducts = products.filter((product) => !product.article.toString().startsWith('2'))

  return (
    <section data-section="products" className={`grid gap-5 mt-20 w-full ${gridConfig.global}`}>
      <div data-section="filters-products" className={gridConfig.filters}>
        <mark>Фильтрация</mark>
      </div>

      <div data-section="grid-products" className={`grid grid-cols-3 sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
        {filteredProducts.map((item, idx) => (
          <CatalogCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  )
}

export default Catalog
