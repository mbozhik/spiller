import {urlForImage} from '@/lib/sanity'
import {TProduct} from '@/lib/get_products'

export function generateXML(products: TProduct[]) {
  const offers = products
    .map(
      (product, index) => `
      <offer id="${product.slug.current}" available="true">
      <url>https://dr-spiller.kz/products/${product.slug.current}</url>
      <price>${product.discount_price || product.price}</price>
      <oldprice>${product.price}</oldprice>
      <currencyId>KZT</currencyId>
      <categoryId>${product.main_filter}</categoryId>
      <picture>${urlForImage(product.image).url()}</picture>
      <name>${product.name}</name>
      <description>${product.full_description}</description>
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
    <offers>
      ${offers}
    </offers>
  </shop>`
}
