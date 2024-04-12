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
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'article',
      title: 'Product Article',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'volume',
      title: 'Product Volume',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    },
    {
      name: 'usage',
      title: 'Product Usage',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'categories',
      title: 'Product Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number',
    },
    {
      name: 'stock',
      title: 'Product Stock',
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
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'images.0.asset',
    },
  },
}

export default product
