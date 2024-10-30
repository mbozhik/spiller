import {urlForImage} from '@/lib/sanity'
import {TProduct} from '@/lib/get_products'
import {product as productFilters} from '@/lib/categories_[product.ts]'

function escapeXML(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export function generateXML(products: TProduct[]) {
  const mainFilters = productFilters.find((filter: any) => filter.name === 'main_filter')?.options?.list || []

  const getCategoryId = (filterValue: string) => {
    const filterIndex = mainFilters.findIndex((filter: {value: string}) => filter.value === filterValue)
    return filterIndex !== -1 ? `${filterIndex + 1}` : ''
  }

  const extractTextFromDescription = (description: any[]): string => {
    return description.map((block) => block.children.map((child) => child.text).join('')).join(' ')
  }

  const categories = `
  <categories>
    ${mainFilters
      .map(
        (filter: {title: string; value: string}, index: number) => `
      <category id="${index + 1}">${escapeXML(filter.title)}</category>`,
      )
      .join('')}
  </categories>`

  const offers = products
    .map((product) => {
      const shortDescription = Array.isArray(product.short_description) ? extractTextFromDescription(product.short_description) : product.short_description || ' '

      return `
      <offer id="${product.article}" available="true">
        <url>https://dr-spiller.kz/products/${product.slug.current}</url>
        <price>${product.discount_price || product.price}</price>
        <oldprice>${product.price}</oldprice>
        <currencyId>KZT</currencyId>
        <categoryId>${getCategoryId(product.main_filter)}</categoryId>
        <picture>${urlForImage(product.image).url()}</picture>
        <name>${escapeXML(product.name)}</name>
        <description>${escapeXML(shortDescription)}</description>
        <sales_notes>Скидки до 50%. Бесплатная доставка в день заказа!</sales_notes>
      </offer>`
    })
    .join('')

  return `<shop>
    <name>Официальный дистрибьютор Dr. Spiller в Казахстане и Кыргызстане</name>
    <company>WEC Group</company>
    <url>https://dr-spiller.kz/</url>
    <currencies>
      <currency id="KZT" rate="1"/>
    </currencies>
    ${categories}
    <offers>
      ${offers}
    </offers>
  </shop>`
}
