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
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'usage',
      title: 'Usage',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Link',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },

    defineField({
      name: 'main_filter',
      title: 'Main Filter',
      type: 'string',
      options: {
        list: [
          {title: 'Лицо', value: 'face'},
          {title: 'Кожа вокруг глаз и губ', value: 'eye_lip_skin'},
          {title: 'Шея и декольте', value: 'neck_decolletage'},
          {title: 'Тело', value: 'body'},
          {title: 'Мужской уход', value: 'men_grooming'},
          {title: 'Наборы', value: 'kits'},
        ],
      },
    }),
    defineField({
      name: 'for_face',
      title: 'For Face',
      type: 'string',
      options: {
        list: [
          {title: 'Очищение кожи', value: 'skin_cleansing'},
          {title: 'Тонизирование', value: 'toning'},
          {title: 'Увлажнение и питание', value: 'moisturising_nourishing_face'},
          {title: 'Активный уход', value: 'active_care'},
          {title: 'Защита от солнца', value: 'sun_protection'},
          {title: 'Ампульные концентраты', value: 'ampoule_concentrates'},
        ],
      },
      hidden: ({document}) => document?.main_filter !== 'face',
    }),
    defineField({
      name: 'for_body',
      title: 'For Body',
      type: 'string',
      options: {
        list: [
          {title: 'Очищение кожи', value: 'cleansing'},
          {title: 'Увлажнение и питание', value: 'moisturising_nourishing_body'},
          {title: 'Для рук', value: 'for_hands'},
          {title: 'Дезодоранты', value: 'deodorants'},
          {title: 'Разное', value: 'miscellaneous'},
        ],
      },
      hidden: ({document}) => document?.main_filter !== 'body',
    }),
    defineField({
      name: 'product_type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          {title: 'Бальзам', value: 'balm'},
          {title: 'BB крем', value: 'bb_cream'},
          {title: 'Гель', value: 'gel'},
          {title: 'Дезодорант', value: 'deodorant'},
          {title: 'Крем', value: 'cream'},
          {title: 'Концентрат', value: 'сoncentrate'},
          {title: 'Лосьон', value: 'lotion'},
          {title: 'Маски', value: 'masks'},
          {title: 'Масла', value: 'oils'},
          {title: 'Молочко', value: 'milky'},
          {title: 'Мыло', value: 'soap'},
          {title: 'Пенка', value: 'foam'},
          {title: 'Помада', value: 'lipstick'},
          {title: 'Скрабы и пилинги', value: 'scrubs_peels'},
          {title: 'Спрей', value: 'spray'},
          {title: 'Сыворотка', value: 'serum'},
          {title: 'Тоник', value: 'toner'},
          {title: 'Туалетная вода', value: 'toilet_water'},
          {title: 'Флюид', value: 'fluid'},
          {title: 'Шампунь', value: 'shampoo'},
          {title: 'Эмульсия', value: 'emulsion'},
        ],
      },
    }),
    defineField({
      name: 'by_intention',
      title: 'By Intention',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Акне и воспаления', value: 'acne_inflammation'},
          {title: 'Возрастные изменения', value: 'age-changes'},
          {title: 'Защита от пота и запаха', value: 'sweat_odour'},
          {title: 'Пигментация / постакне / рубцы', value: 'pigmentation'},
          {title: 'Сухость / шелушение', value: 'dryness'},
          {title: 'Купероз', value: 'couperosis'},
          {title: 'Чувствительность кожи', value: 'skin_sensitivity'},
          {title: 'Черные точки / Расширенные поры', value: 'black_spots'},
          {title: 'Жирный блеск', value: 'oily_shine'},
          {title: 'Тёмные круги / отёчность', value: 'dark_circles'},
          {title: 'Антицеллюлитные средства', value: 'anti_cellulite'},
        ],
      },
    }),
    defineField({
      name: 'product_line',
      title: 'Product Line',
      type: 'string',
      options: {
        list: [
          {title: 'Dr. Spiller', value: 'dr_spiller'},
          {title: 'Beauty of Nature', value: 'beauty_of_nature'},
          {title: 'Herbal', value: 'herbal'},
          {title: 'Anti-Couperose', value: 'anti_couperose'},
          {title: 'Care & Repair', value: 'care_and_repair'},
          {title: 'Carotene', value: 'carotene'},
          {title: 'Sanvita', value: 'sanvita'},
          {title: 'Alpine-Aloe', value: 'alpine_aloe'},
          {title: 'Royal', value: 'royal'},
          {title: 'Propolis', value: 'propolis'},
          {title: 'Thymovit', value: 'thymovit'},
          {title: 'Collagen', value: 'collagen'},
          {title: 'Fresh&Fruit', value: 'fresh_and_fruit'},
          {title: 'Azulen', value: 'azulen'},
          {title: 'Celltresor', value: 'celltresor'},
          {title: 'Cellular', value: 'cellular'},
          {title: 'Hydro-Marin', value: 'hydro_marin'},
          {title: 'Oxygen Vital', value: 'oxygen_vital'},
          {title: 'Silk Protein', value: 'silk_protein'},
          {title: 'Vitamin A', value: 'vitamin_a'},
          {title: 'Vitamin C Plus', value: 'vitamin_c_plus'},
          {title: 'Summer Glow', value: 'summer_glow'},
          {title: 'Manage Your Skin', value: 'manage_your_skin'},
          {title: 'Gaoxing', value: 'gaoxing'},
          {title: 'Magico', value: 'magico'},
          {title: 'Manaru', value: 'manaru'},
          {title: 'Rahima', value: 'rahima'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      article: 'article',
      media: 'image',
    },
    prepare(selection) {
      const {title, article, media} = selection
      return {
        title: title,
        subtitle: article,
        media: media,
      }
    },
  },
}

export default product
