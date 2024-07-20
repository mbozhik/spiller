'use client'

import {useState} from 'react'
import PortableText from '#/UI/PortableText'

type ProductInfoProps = {
  product: {
    full_description: any
    utilization: any
    composition: any
  }
}

const ProductInfo = ({product}: ProductInfoProps) => {
  const tabs = [
    {label: 'Описание', key: 'description', data: product.full_description},
    {label: 'Применение', key: 'utilization', data: product.utilization},
    {label: 'Состав', key: 'composition', data: product.composition},
  ].filter((tab) => tab.data) // Filter out tabs with no data

  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '')

  return (
    <>
      <div className="flex">
        {tabs.map((tab) => (
          <button key={tab.key} className={`w-full py-2 text-lg sm:text-sm text-custom-blue border-b-2 hover:bg-custom-nav/40 duration-200 ${activeTab === tab.key ? ' border-custom-blue' : 'border-custom-nav/40'}`} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="px-4 py-6 sm:pl-1 sm:py-4">{tabs.map((tab) => activeTab === tab.key && <PortableText key={tab.key} value={tab.data} />)}</div>
    </>
  )
}

export default ProductInfo
