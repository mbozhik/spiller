import product from './categories_[product.ts]'

const {main_filter, for_face, for_body, product_type, by_intention, product_line} = product.reduce((acc: any, field: any) => {
  if (['main_filter', 'for_face', 'for_body', 'product_type', 'by_intention', 'product_line'].includes(field.name)) {
    acc[field.name] = Array.isArray(field.options?.list) ? field.options.list.reduce((obj: any, item: any) => ({...obj, [item.value]: item.title}), {}) : field.options?.list?.title || ''
  }
  return acc
}, {})

export const compareParams = (category: string, value: string | string[], idx: number) => {
  const titles: string[] = Array.isArray(value) ? value.map((val: string) => productParams[category][val]) : [productParams[category][value]]
  return titles.map((title: string, i: number) => title && <mark key={idx * 1000 + i}>{title}</mark>)
}

export const productParams = {main_filter, for_face, for_body, product_type, by_intention, product_line}

export const filterTitles = {
  main_filter: 'Основные фильтры',
  for_face:  'Для лица',
  for_body:  'Для тела',
  product_type:  'Тип продукта',
  by_intention:   'Состояние кожи',
  product_line:  'Продуктовая линия',
}