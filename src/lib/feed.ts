import {urlForImage} from '@/lib/sanity'
import {TProduct} from '@/lib/get_products'
import {product as productFilters} from '@/lib/categories_[product.ts]'

function escapeXML(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export function generateXML(products: TProduct[]) {
  const mainFilters = productFilters.find((filter: any) => filter.name === 'main_filter')?.options?.list || []

  const categories = `
    <categories>
      ${mainFilters
        .map(
          (filter: {title: string; value: string}, index: number) => `
        <category id="${filter.value}">${escapeXML(filter.title)}</category>`,
        )
        .join('')}
    </categories>`

  const offers = products
    .map(
      (product) => `
      <offer id="${product.slug.current}" available="true">
        <url>https://dr-spiller.kz/products/${product.slug.current}</url>
        <price>${product.discount_price || product.price}</price>
        <oldprice>${product.price}</oldprice>
        <currencyId>KZT</currencyId>
        <categoryId>${product.main_filter}</categoryId>
        <picture>${urlForImage(product.image).url()}</picture>
        <name>${escapeXML(product.name)}</name>
        <description>${escapeXML(product.full_description || '')}</description>
        <sales_notes>Скидки до 50%. Бесплатная доставка в день заказа!</sales_notes>
        <country_of_origin>Германия</country_of_origin>
      </offer>`,
    )
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
