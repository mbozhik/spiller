import GridImage1 from '%/buy/1.jpg'
import GridCell, {GridDataProps} from '#/UI/GridCell'

const gridData: {[key: number]: GridDataProps} = {
  1: {
    href: '/about/',
    buttonText: 'О БРЕНДЕ',
    isButton: false,
    flexDirection: 'flex-row-reverse',
    titleText: 'ТОО "WEC GROUP" является официальным дистрибьютором профессиональной косметики Dr. Spiller (Германия) в Казахстане и КыргызстанE',
    text: [],
    image: GridImage1,
    classes: 'mt-16 sm:mt-10',
    imgClasses: 'h-[50vh]',
  },
}

export default function Grid() {
  return (
    <>
      {Object.values(gridData).map(({href, buttonText, isButton, flexDirection, titleText, text, image, classes, imgClasses}) => (
        <GridCell key={href} href={href} buttonText={buttonText} isButton={isButton} flexDirection={flexDirection} titleText={titleText} textArray={text} image={image} classes={classes} imgClasses={imgClasses} />
      ))}
    </>
  )
}
