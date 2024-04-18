import {defineField} from 'sanity'
import {Rule, SchemaTypeDefinition} from 'sanity'

const product: SchemaTypeDefinition = {
  name: 'product',
  title: 'Products',
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
      name: 'article',
      title: 'Article',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'volume',
      title: 'Volume',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'usage',
      title: 'Usage',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number',
    },

    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          {title: 'Женский', value: 'female'},
          {title: 'Мужской', value: 'male'},
        ],
      },
    }),
    defineField({
      name: 'body_part',
      title: 'Body Part',
      type: 'string',
      options: {
        list: [
          {title: 'Лицо', value: 'face'},
          {title: 'Тело', value: 'body'},
        ],
      },
    }),
    defineField({
      name: 'age_group',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          {title: 'Молодая', value: 'young'},
          {title: 'Зрелая', value: 'mature'},
          {title: 'Возрастная', value: 'aging'},
        ],
      },
    }),
    defineField({
      name: 'skin_type',
      title: 'Skin Type',
      type: 'string',
      options: {
        list: [
          {title: 'Нормальная', value: 'normal'},
          {title: 'Сухая', value: 'dry'},
          {title: 'Проблемная', value: 'problematic'},
          {title: 'Комбинированная', value: 'combination'},
          {title: 'Все типы', value: 'all-types'},
        ],
      },
    }),
    defineField({
      name: 'problem_action',
      title: 'Problem/Action',
      type: 'string',
      options: {
        list: [
          {title: 'Акне', value: 'acne'},
          {title: 'Возрастные изменения', value: 'age-changes'},
          {title: 'Пигментация', value: 'pigmentation'},
          {title: 'Сухость', value: 'dryness'},
          {title: 'Воздействие солнца', value: 'sun-exposure'},
          {title: 'Очищение', value: 'cleansing'},
          {title: 'Тонизация', value: 'toning'},
          {title: 'Эксфолиация', value: 'exfoliation'},
        ],
      },
    }),
    defineField({
      name: 'product_type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          {title: 'Ампульный концентрат', value: 'ampoule-concentrate'},
          {title: 'Бальзам', value: 'balm'},
          {title: 'Гель', value: 'gel'},
          {title: 'Дезодорант', value: 'deodorant'},
          {title: 'Крем', value: 'cream'},
          {title: 'Лосьон', value: 'lotion'},
          {title: 'Лёгкий крем', value: 'light-cream'},
          {title: 'Маска', value: 'mask'},
          {title: 'Масло', value: 'oil'},
          {title: 'Мыло', value: 'soap'},
          {title: 'Патчи', value: 'patches'},
          {title: 'Пенка', value: 'foam'},
          {title: 'Плотный крем', value: 'dense-cream'},
          {title: 'Подарочный набор', value: 'gift-set'},
          {title: 'Порошковые маски', value: 'powder-masks'},
          {title: 'Скраб', value: 'scrub'},
          {title: 'Спрей', value: 'spray'},
          {title: 'Сыворотка', value: 'serum'},
          {title: 'Тоник', value: 'toner'},
          {title: 'Шампунь', value: 'shampoo'},
          {title: 'Эмульсия', value: 'emulsion'},
        ],
      },
    }),

    {
      name: 'slug',
      title: 'Link',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'gender',
    },
  },
}

export default product
