import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Награды',
}

import Container from '#/Global/Container'
import Title from '#/UI/Title'
import Text from '#/UI/Text'

const awardsData = [
  {year: '2023', naming: 'Winner: BEAUTY FORUM Stars Award', place: '1st place - Peptide Performance Eye & Lip Cream'},
  {year: '2023', naming: 'BEAUTY FORUM Stars Award', place: '2nd place - TRAWENMOOR HUMIC SERUM'},
  {year: '2023', naming: 'BEAUTY FORUM Stars Award', place: '2nd place - Retinol+ Serum'},
  {year: '2022', naming: 'Winner: European Health & Spa Award', place: '1st place - TRAWENMOOR Organic Skincare'},
  {year: '2021', naming: 'Winner: ESPA Innovation Award', place: '1st place - TRAWENMOOR Organic Skincare'},
  {year: '2021', naming: 'Winner: ESPA Innovation Award', place: '1st place - The Beauty of Nature Ampoules'},
  {year: '2019', naming: "BEAUTY FORUM Readers' Choice", place: '2nd place in the category: Caring cosmetics - Problem Skin', product: 'Product: SENSICURA Regeneration Cream'},
  {year: '2018', naming: 'Winner: ESPA Innovation Award', place: '1st place for SUMMER GLOW Line'},
  {year: '2017', naming: "BEAUTY FORUM Readers' Choice", place: '3rd place in the category: Medical Beauty & Anti-Aging', product: 'Product: CELLTRESOR Intense Rebuilding Cream'},
  {year: '2016', naming: 'BEAUTY FORUM Award', place: '3rd place for Dr. Spiller, making us one of the most well-known brands in Germany*'},
  {year: '2016', naming: 'Winner: European Health & Spa Award', place: '1st place in the category: Best Product Innovation', product: 'Product: Dr. Spiller CELLTRESOR'},
  {year: '2016', naming: 'Winner: Spa Diamond Award', place: '1st place for the CELLTRESOR Treatment'},
  {year: '2015/2016', naming: 'BEAUTY FORUM Award', place: '3rd place in the category: Caring cosmetics classics', product: 'Product: Dr. Spiller Oxygen Vital Complex'},
  {year: '2014', naming: 'BEAUTY FORUM Award', place: '3rd place, top score in customer satisfaction'},
  {year: '2013/2014', naming: 'BEAUTY FORUM Readers’ Choice', place: '2nd place in the category: Wellness & Spa', product: 'Product: Dr. Spiller RAHIMA Body Butter'},
  {year: '2011/2012', naming: 'BEAUTY FORUM Readers’ Choice', place: '3rd place in the category: Caring cosmetics special treatment', product: 'Product: Dr. Spiller Q10 Oxygen Complex'},
  {year: '2011', naming: 'Winner: European Health & Spa Award', place: '1st place, Best Facial Treatment for Cellosophy®'},
  {year: '2010', naming: 'Winner: European Health & Spa Award', place: '1st place in the category: Best Men Facial & Body Treatment', product: 'Product: Manage Your Skin®'},
  {year: '2009/2010', naming: 'BEAUTY FORUM Readers’ Choice', place: '2st place in the category: Problem skin', product: 'Product: Dr. Spiller Herbal Cleansing Gel'},
  {year: '2007/2008', naming: 'Winner: BEAUTY FORUM Readers’ Choice', place: '1st place in the category: Caring cosmetics'},
]

export default function AboutAwards() {
  return (
    <Container className="space-y-16 sm:space-y-10" marginBottom={true}>
      <div>
        <Title classes="w-[90%] sm:w-full sm:!text-xl" text="Лучшие оценки за выдающееся качество" />
        <Text classes="mt-5 w-[80%] sm:w-full sm:mt-2" text="Наш подход к качеству продукции не перестает радовать. Активные ингредиенты делают победителем не только кожу, но и бренд. Профессионалы в области красоты и потребители сходятся в своих оценках. Продукты и процедуры Dr. Spiller постоянно входят в число лучших по результатам премий и опросов:" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-8">
        {awardsData.map((award, index) => (
          <article key={index}>
            <Title classes="mb-2" text={award.year} />
            <Text classes="font-semibold" text={award.naming} />
            <Text text={award.place} />
            {award.product && <Text classes="italic" text={award.product} />}
          </article>
        ))}
      </div>
    </Container>
  )
}
