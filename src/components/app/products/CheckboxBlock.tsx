import {Checkbox} from '#/UI/shadcnui/checkbox'

interface CheckboxBlockProps {
  id: string
  text: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckboxBlock: React.FC<CheckboxBlockProps> = ({id, text, checked, onChange}) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id} className="text-base leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {text}
      </label>
    </div>
  )
}

export default CheckboxBlock
