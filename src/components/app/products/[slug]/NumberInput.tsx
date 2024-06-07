'use client'

import {useState} from 'react'
import {Plus, Minus} from 'lucide-react'

interface Props {
  initialValue?: number
}

const NumberInput: React.FC<Props> = ({initialValue = 1}) => {
  const [value, setValue] = useState<number>(initialValue)

  const updateValue = (newValue) => setValue(Math.max(1, newValue))

  return (
    <div className="flex items-center justify-start overflow-hidden INPUT !w-fit">
      <button onClick={() => updateValue(value - 1)}>
        <Minus className="w-5" />
      </button>
      <input className="w-14 h-full text-lg text-center bg-transparent border-none outline-none font-book text-custom-primary placeholder:text-custom-primary" value={value} onChange={(e) => updateValue(parseInt(e.target.value) || 1)} />
      <button onClick={() => updateValue(value + 1)}>
        <Plus className="w-5" />
      </button>
    </div>
  )
}

export {NumberInput}
