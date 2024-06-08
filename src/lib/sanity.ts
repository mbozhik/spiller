import {createClient} from 'next-sanity'
import ImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '68r5ov2e',
  dataset: 'production',
  apiVersion: '2024-01-08',
  useCdn: false,
})

const imageBuilder = ImageUrlBuilder(client)

export function urlForImage(source: any) {
  return imageBuilder.image(source)
}
