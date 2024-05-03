export const compareParams = (category: string, value: string, idx: number) => {
  const title = productParams[category][value]
  return <mark key={idx}>{title}</mark>
}

export const productParams = {
  gender: {
    female: 'Женский',
    male: 'Мужской',
  },
  body_part: {
    face: 'Лицо',
    body: 'Тело',
  },
  age_group: {
    young: 'Молодая',
    mature: 'Зрелая',
    aging: 'Возрастная',
  },
  skin_type: {
    normal: 'Нормальная',
    dry: 'Сухая',
    problematic: 'Проблемная',
    combination: 'Комбинированная',
    'all-types': 'Все типы',
  },
  problem_action: {
    acne: 'Акне',
    'age-changes': 'Возрастные изменения',
    pigmentation: 'Пигментация',
    dryness: 'Сухость',
    'sun-exposure': 'Воздействие солнца',
    cleansing: 'Очищение',
    toning: 'Тонизация',
    exfoliation: 'Эксфолиация',
  },
  product_type: {
    'ampoule-concentrate': 'Ампульный концентрат',
    balm: 'Бальзам',
    gel: 'Гель',
    deodorant: 'Дезодорант',
    cream: 'Крем',
    lotion: 'Лосьон',
    'light-cream': 'Лёгкий крем',
    mask: 'Маска',
    oil: 'Масло',
    soap: 'Мыло',
    patches: 'Патчи',
    foam: 'Пенка',
    'dense-cream': 'Плотный крем',
    'gift-set': 'Подарочный набор',
    'powder-masks': 'Порошковые маски',
    scrub: 'Скраб',
    spray: 'Спрей',
    serum: 'Сыворотка',
    toner: 'Тоник',
    shampoo: 'Шампунь',
    emulsion: 'Эмульсия',
  },
}
