import {Rule, SchemaTypeDefinition} from 'sanity'

const category: SchemaTypeDefinition = {
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'parent_category',
      title: 'Category Parent',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}

export default category
