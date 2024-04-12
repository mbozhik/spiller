import {Rule, SchemaTypeDefinition} from 'sanity'

const product: SchemaTypeDefinition = {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'article',
      title: 'Product Article',
      type: 'number',
    },
    {
      name: 'volume',
      title: 'Product Volume',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'text',
    },
    {
      name: 'usage',
      title: 'Product Usage',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number',
    },

    {
      name: 'gender',
      title: 'Product Gender',
      type: 'string',
    },
    {
      name: 'body_part',
      title: 'Product Body Part',
      type: 'string',
    },
    {
      name: 'age_group',
      title: 'Product Age Group',
      type: 'string',
    },
    {
      name: 'compexity',
      title: 'Product Compexity',
      type: 'string',
    },
    {
      name: 'ampulsivity',
      title: 'Product Ampulsivity',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'article',
    },
  },
}

export default product
