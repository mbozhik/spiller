interface Props {
  href?: string
  download?: string
  id?: string
  blank?: boolean
  text: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export const buttonVariants = {
  default: 'w-fit px-8 sm:px-4 py-2 text-xl sm:text-sm uppercase border duration-300 cursor-pointer',
  primary: 'text-custom-blue border-custom-blue hover:bg-custom-blue hover:text-white',
  secondary: 'text-white border-custom-blue bg-custom-blue hover:opacity-85',
}

const Button: React.FC<Props> = ({href, download, id, blank, text, variant = 'primary', onClick}) => {
  const variantStyles = buttonVariants[variant] || buttonVariants['primary']

  return (
    <a href={href} download={download} id={id} target={blank ? '_blank' : undefined} className={`${buttonVariants.default} ${variantStyles}`} onClick={onClick}>
      {text}
    </a>
  )
}

export default Button
