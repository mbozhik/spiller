import Image, {StaticImageData} from 'next/image'

import Title from '#/UI/Title'
import Text from '#/UI/Text'
import Button from '#/UI/Button'

interface Props {
  href: string
  buttonText: string
  isButton: boolean
  flexDirection: string
  titleText: string
  image: string | StaticImageData
  textArray: string[]
  classes?: string
  imgClasses?: string
}

const GridCell: React.FC<Props> = ({href, buttonText, isButton, flexDirection, titleText, textArray, image, classes, imgClasses}) => (
  <div className={`flex justify-between gap-10 sm:gap-7 sm:flex-col-reverse ${flexDirection} ${classes}`}>
    <div className="flex flex-col justify-center py-10 gap-7 sm:gap-3 xl:py-0 justify-self-center">
      <Title text={titleText} />

      {textArray.length > 0 && (
        <div className="flex flex-col gap-5 sm:gap-3">
          {textArray.map((text, index) => (
            <Text key={index} text={text} />
          ))}
        </div>
      )}

      {isButton && <Button href={href} text={buttonText} classes="sm:mt-3" />}
    </div>
    <Image className="object-cover w-1/2 h-auto rounded-lg sm:w-full" src={image} alt="" />
  </div>
)

export default GridCell
