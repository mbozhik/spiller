import {getProcedures, TProcedure} from '@/lib/get_procedures'
import Title from '#/UI/Title'

const ProcedureList = ({procedures, title}: {procedures: TProcedure[]; title: string}) => (
  <div className="space-y-8 sm:space-y-5">
    <Title classes="sm:text-start text-center" text={title} />

    <div className="space-y-4 sm:space-y-6">
      {procedures.map(({name, caption, price}, index) => (
        <div className="flex sm:flex-col sm:items-start sm:gap-2 justify-between items-center border-b border-custom-blue/50 pb-2 sm:pb-3" key={index}>
          <div>
            <h1 className="text-2xl font-semibold">{name}</h1>
            <h2 className="text-custom-grey2 sm:text-lg max-w-[65ch]">{caption}</h2>
          </div>
          <h3 className="text-2xl font-medium text-custom-blue">{price} ₸</h3>
        </div>
      ))}
    </div>
  </div>
)

export default async function Procedures() {
  const procedures: TProcedure[] = await getProcedures()

  if (!procedures || procedures.length === 0) {
    return <mark>Произошла ошибка при получении данных или данные отсутствуют!</mark>
  }

  const allProcedures = procedures.filter((procedure) => !procedure.category)
  const menProcedures = procedures.filter((procedure) => procedure.category === 'for_men')

  return (
    <section className="space-y-12 sm:space-y-10 px-[10%] xl:px-[7%] py-8 sm:p-5 pb-12 border border-custom-blue">
      <ProcedureList procedures={allProcedures} title="Уходовые процедуры Dr. Spiller" />
      <ProcedureList procedures={menProcedures} title="Уход для мужчин" />
    </section>
  )
}
