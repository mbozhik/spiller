import {defineField} from 'sanity'
import {Rule, SchemaTypeDefinition} from 'sanity'

export const promocodes: SchemaTypeDefinition = {
  name: 'promocode',
  title: 'Promo codes',
  type: 'document',
  fields: [
    {
      name: 'is_enabled',
      title: 'Is enabled?',
      type: 'boolean',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'discount',
      title: 'Discount',
      type: 'number',
      description: 'Процент скидки (без %)',
      validation: (rule: Rule) => rule.required(),
    },
  ],
  preview: {
    select: {
      code: 'code',
      discount: 'discount',
      is_enabled: 'is_enabled',
    },
    prepare(selection) {
      const {code, discount, is_enabled} = selection
      return {
        title: code,
        subtitle: `${is_enabled ? '[активен]' : '[скрыт]'} ${discount}%`,
      }
    },
  },
}
