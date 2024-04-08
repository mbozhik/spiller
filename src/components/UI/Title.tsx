interface Props {
  text?: string
  classes?: string
}

const Title: React.FC<Props> = ({text, classes}) => {
  return <h1 className={`text-3xl font-light uppercase sm:text-2xl text-custom-blue ${classes}`} dangerouslySetInnerHTML={{__html: text || ''}} />
}

export default Title
