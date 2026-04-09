export const ODD_HREF = "https://odd.studio/"
export const ADMIN_MAIL = "the.email@example.com"

export const SHEET_RANGES = {
  macro: 'Macro-Territories!B2:C20',
  territories: 'Territories!B2:H20',
  territoryMoodboards: 'TerritoryMoodboards!B2:F200',
  tiers: 'Tiers!C2:D6',
  brands: 'Brands!B2:M200',
  products: 'Products!B2:M200',
  inputProducts: 'user_input!A1:K200',
  productTypes: 'product_formats!A2:A7',
  brandArchitectures: 'brand_architectures!A2:A6',
  productClaims: 'product_claims!A2:B77',
}

export const MACRO_ORDER = [ 1, 2, 3, 4, 5, 6, 7 ]
export const TERRITORY_ORDER = [ 3, 1, 2, 4, 5, 6, 7, 8, 9, 10 ]


export const MANDALA_CONFIG = {
  innerRadiusK: .0875,
  outerRadiusK: .5,
  margin: 100,
  trTitlePad: 12,
  mtPad: 48,
  mtWidth: 6,
  mtTitlePad: 64,
  tierPad: 1,
  cornerRadius: 8,

  tierRadius: 8,
  
  productRadius: 5,
  brandRadius: 20,
  itemsCollisionPad: 1.5,
  
  angleOffset: -( Math.PI + 3*Math.PI/5 ) / 2,
  macroPadAngle: 0.02,
}

export const UI_COLORS = {
  'background': '#F6F4EE',
  'background-darker': '#E7E7E7',
  'text-primary': '#5B5561',
  'primary': '#5B5561',
  'primary-darker': '#504857',
}

export const MARKET_COLORS = {
  // 1: SUPERIOR PERFORMANCE ----------
  'mt-1': '#3F72E2',
  'mt-1-lighter': '#D6DDEC',
  'over-mt-1': '#F6F4EE',

  // 3: Fulfilled
  'tr-3': '#2D56B2',
  'tr-3-3': '#7594D7',
  'tr-3-2': '#5A7FD0',
  'tr-3-1': '#315FC4',
  'tr-3-0': '#2D56B2',
  'over-tr-3': '#F6F4EE',
  'over-tr-3-3': '#5B5561',
  'over-tr-3-2': '#5B5561',
  'over-tr-3-1': '#5B5561',
  'over-tr-3-0': '#5B5561',

  // 1: Freedom
  'tr-1': '#3968CE',
  'tr-1-3': '#7EA1EC',
  'tr-1-2': '#658EE8',
  'tr-1-1': '#3F72E2',
  'tr-1-0': '#3968CE',
  'over-tr-1': '#F6F4EE',
  'over-tr-1-3': '#5B5561',
  'over-tr-1-2': '#5B5561',
  'over-tr-1-1': '#5B5561',
  'over-tr-1-0': '#5B5561',

  // 2: Control
  'tr-2': '#5C85DA',
  'tr-2-3': '#98B6F5',
  'tr-2-2': '#84A8F3',
  'tr-2-1': '#6592F0',
  'tr-2-0': '#5C85DA',
  'over-tr-2': '#F6F4EE',
  'over-tr-2-3': '#5B5561',
  'over-tr-2-2': '#5B5561',
  'over-tr-2-1': '#5B5561',
  'over-tr-2-0': '#5B5561',
  
  // 2: HYGIENE & DISINFECTION ----------
  'mt-2': '#D93634',
  'mt-2-lighter': '#F1D1CC',
  'over-mt-2': '#5B5561',

  // 4: Disinfection and protection
  'tr-4': '#D93634',
  'tr-4-3': '#F47C7A',
  'tr-4-2': '#F26261',
  'tr-4-1': '#EF3B39',
  'tr-4-0': '#D93634',
  'over-tr-4': '#F6F4EE',
  'over-tr-4-3': '#5B5561',
  'over-tr-4-2': '#5B5561',
  'over-tr-4-1': '#5B5561',
  'over-tr-4-0': '#5B5561',

  // 3: ENHANCED FABRIC CARE ----------
  'mt-3': '#E1A8D4',
  'mt-3-lighter': '#F2E5E9',
  'over-mt-3': '#5B5561',

  // 5: Care, treatment and self-expression
  'tr-5': '#E1A8D4',
  'tr-5-3': '#FBDFF5',
  'tr-5-2': '#F9C7ED',
  'tr-5-1': '#F7B9E9',
  'tr-5-0': '#E1A8D4',
  'over-tr-5': '#F6F4EE',
  'over-tr-5-3': '#5B5561',
  'over-tr-5-2': '#5B5561',
  'over-tr-5-1': '#5B5561',
  'over-tr-5-0': '#5B5561',

  // 4: QUICK WASH & REFRESH ----------
  'mt-4': '#B9B9B9',
  'mt-4-lighter': '#EAE8E4',
  'over-mt-4': '#5B5561',

  // 6: Refresh, convenience and easy
  'tr-6': '#B9B9B9',
  'tr-6-3': '#DCDCDC',
  'tr-6-2': '#D5D5D5',
  'tr-6-1': '#CBCBCB',
  'tr-6-0': '#B9B9B9',
  'over-tr-6': '#F6F4EE',
  'over-tr-6-3': '#5B5561',
  'over-tr-6-2': '#5B5561',
  'over-tr-6-1': '#5B5561',
  'over-tr-6-0': '#5B5561',

  // 5: CLEAN FUTURE ----------
  'mt-5': '#79A485',
  'mt-5-lighter': '#DEE5DA',
  'over-mt-5': '#5B5561',

  // 7: Conscious and sustainable
  'tr-7': '#6E9579',
  'tr-7-3': '#A5C2AD',
  'tr-7-2': '#94B69D',
  'tr-7-1': '#79A485',
  'tr-7-0': '#6E9579',
  'over-tr-7': '#F6F4EE',
  'over-tr-7-3': '#5B5561',
  'over-tr-7-2': '#5B5561',
  'over-tr-7-1': '#5B5561',
  'over-tr-7-0': '#5B5561',

  // 6: SAFE & KIND ----------
  'mt-6': '#4B96A1',
  'mt-6-lighter': '#D6E2DF',
  'over-mt-6': '#5B5561',

  // 8: Gentle and soft
  'tr-8': '#4B96A1',
  'tr-8-3': '#8BC3CB',
  'tr-8-2': '#75B7C1',
  'tr-8-1': '#52A5B1',
  'tr-8-0': '#4B96A1',
  'over-tr-8': '#F6F4EE',
  'over-tr-8-3': '#5B5561',
  'over-tr-8-2': '#5B5561',
  'over-tr-8-1': '#5B5561',
  'over-tr-8-0': '#5B5561',

  // 7: SENSORIAL & LIFESTYLE ----------
  'mt-7': '#9D84B6',
  'mt-7-lighter': '#E7E1E4',
  'over-mt-7': '#5B5561',

  // 9: Mood management
  'tr-9': '#9D84B6',
  'tr-9-3': '#C7B5DA',
  'tr-9-2': '#BDA7D3',
  'tr-9-1': '#AC91C8',
  'tr-9-0': '#9D84B6',
  'over-tr-9': '#F6F4EE',
  'over-tr-9-3': '#5B5561',
  'over-tr-9-2': '#5B5561',
  'over-tr-9-1': '#5B5561',
  'over-tr-9-0': '#5B5561',

  // 10: Indulgence
  'tr-10': '#795A97',
  'tr-10-3': '#AD96C3',
  'tr-10-2': '#9D82B8',
  'tr-10-1': '#8563A6',
  'tr-10-0': '#795A97',
  'over-tr-10': '#F6F4EE',
  'over-tr-10-3': '#5B5561',
  'over-tr-10-2': '#5B5561',
  'over-tr-10-1': '#5B5561',
  'over-tr-10-0': '#5B5561',
}