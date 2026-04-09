export const steps = [
  // Asks if the product has the minimum requirements
  { 
    id: 1,
    template: 'simple',
    next: [ 
      { id: 3, key: 'shared.yes', primary: true }, 
      { id: 2, key: 'shared.no' } 
    ]
  },
  // Asks if the user wants to retry
  { 
    id: 2,
    template: 'simple',
    next: [ { id: 1, key: 'shared.retry', primary: true } ]
  },
  // Asks for the product's name, brand and format
  { 
    id: 3,
    template: 'register',
    next: [ { id: 4, key: 'shared.continue', primary: true } ]
  },
  // Asks for the product's main concerning
  { 
    id: 4,
    template: 'multiple',
    for: 'macro',
    next: [ { id: 5 } ]
  },
  // Asks if the product contains at least one of the main MT claims
  { 
    id: 5,
    template: 'confirm',
    for: 'macro',
    next: [ 
      { id: 6, key: 'shared.continue', primary: true }, 
      { id: 4, key: 'shared.no' } ] // [ Yes, No ]
  },
  // Presents the MT
  { 
    id: 6,
    template: 'display',
    for: 'macro',
    next: [ 
      { key: 'shared.continue', primary: true }, 
      { id: 4, key: 'shared.retry' } 
    ] // [ Multiple sub-territories, Single sub-territory ]
  },
  // Ask for main motivation when purchasing the product
  { 
    id: 7,
    template: 'multiple',
    for: 'territory',
    next: [ { id: 8 } ]
  },
  // Presents the TR
  { 
    id: 8,
    template: 'display',
    for: 'territory',
    next: [ 
      { id: 9, key: 'shared.continue', primary: true }, 
      { id: 4, key: 'shared.retry' } 
    ]
  },
  // Review
  { 
    id: 9,
    template: 'review',
    next: [ { id: 10, key: 'shared.save' } ]
  },
  // Save
  { 
    id: 10,
    template: 'save',
    next: [ { key: 'shared.goHome' } ]
  },
]