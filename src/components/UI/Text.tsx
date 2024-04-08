interface Props {
  text?: string
  classes?: string
}

const Text: React.FC<Props> = ({text, classes}) => {
  return <p className={`text-base sm:text-sm ${classes}`} dangerouslySetInnerHTML={{__html: text || ''}} />
}

export default Text
