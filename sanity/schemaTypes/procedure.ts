import {defineField} from 'sanity'
import {Rule, SchemaTypeDefinition} from 'sanity'

export const procedures: SchemaTypeDefinition = {
  name: 'procedure',
  title: 'Procedures',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [{title: 'Уход для мужчин', value: 'for_men'}],
      },
      description: 'По умолчанию попадает в общий список услуг',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'caption',
    },
  },
}
