import SpecialistImage from '%/specialist.jpg'
import Image from 'next/image'

export default function Specialist() {
  return (
    <section className="p-6 border rounded-lg shadow-lg sm:p-4 border-custom-grey2/10">
      <div className="grid items-center grid-cols-10 gap-8 sm:gap-6 sm:flex sm:flex-col">
        <div className="col-span-2">
          <Image className="block object-cover sm:w-full aspect-[4/6] sm:aspect-[4/5] rounded-md" src={SpecialistImage} alt="" />
        </div>

        <div className="col-span-8 space-y-4 text-xl sm:space-y-2.5 xl:text-lg">
          <p>Ольга — главный косметолог и официальный тренер Dr. Spiller с 20-летним опытом. Она лично подбирает индивидуальные программы ухода, учитывая потребности каждого клиента.</p>
          <p>Её глубокие знания в области ухода за кожей и приверженность философии бренда, основанной на гармонии с природой, помогают клиентам достигать здоровой и сияющей кожи. Ольга подберёт индивидуальный уход, учитывая уникальные потребности вашей кожи, и проведёт вас к желаемым результатам с вниманием и заботой.</p>
        </div>
      </div>
    </section>
  )
}
