interface Props {
  href: string
  download?: string
  id?: string
  blank?: boolean
  text: string
  classes?: string
}

const Button: React.FC<Props> = ({href, download, id, blank, text, classes}) => (
  <a href={href} download={download} id={id} target={blank ? '_blank' : undefined} className={`inline-flex items-center justify-center gap-2 px-8 py-2 text-xl text-center uppercase duration-300 border sm:px-4 sm:text-sm border-custom-blue text-custom-blue w-fit group hover:bg-custom-blue hover:text-white ${classes}`}>
    {text}
  </a>
)

export default Button
