export const fallbackProducts = [
  {
    id: 'prod-1',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    name: 'iPhone 17 Pro',
    tagline: 'Pro power. Effortlessly yours.',
    description: 'A premium smartphone with a pro camera system, all-day battery and a brilliant edge-to-edge display.',
    category: 'Smartphones',
    imageUrl: '/products/iphone-17-pro-orange.jpg',
    badge: 'NEW',
    rating: 4.8,
    soldCount: 120,
    seller: '1Fi Select',
    featured: true,
    startingPrice: 127400,
    mrp: 134900,
    startingEmi: 2842,
    images: [
      { imageUrl: '/products/iphone-17-pro-orange.jpg', alt: 'iPhone 17 Pro Cosmic Orange' },
      { imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-silver-202509?wid=940&hei=1112&fmt=png-alpha', alt: 'iPhone 17 Pro Silver' },
      { imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-deepblue-202509?wid=940&hei=1112&fmt=png-alpha', alt: 'iPhone 17 Pro Deep Blue' }
    ],
    specifications: [
      { label: 'Display', value: '6.3-inch Super Retina XDR' },
      { label: 'Processor', value: 'A19 Pro chip' },
      { label: 'Rear camera', value: '48MP Pro camera system' },
      { label: 'Front camera', value: '18MP Center Stage' },
      { label: 'Battery', value: 'All-day battery life' },
      { label: 'In the box', value: 'Handset, USB-C cable, documentation' }
    ],
    variants: [
      {
        id: 'var-1-1', label: '256 GB · Cosmic Orange', storage: '256 GB', color: 'Cosmic Orange', colorHex: '#e46f34',
        imageUrl: '/products/iphone-17-pro-orange.jpg', mrp: 134900, price: 127400, isDefault: true,
        emiPlans: [
          { id: 'plan-1-1-3', tenureMonths: 3, monthlyPayment: 44967, interestRate: 0, cashback: 7500, recommended: false },
          { id: 'plan-1-1-6', tenureMonths: 6, monthlyPayment: 22483, interestRate: 0, cashback: 7500, recommended: false },
          { id: 'plan-1-1-12', tenureMonths: 12, monthlyPayment: 11242, interestRate: 0, cashback: 7500, recommended: true },
          { id: 'plan-1-1-24', tenureMonths: 24, monthlyPayment: 5621, interestRate: 0, cashback: 7500, recommended: false },
          { id: 'plan-1-1-36', tenureMonths: 36, monthlyPayment: 4297, interestRate: 10.5, cashback: 7500, recommended: false },
          { id: 'plan-1-1-48', tenureMonths: 48, monthlyPayment: 3385, interestRate: 10.5, cashback: 7500, recommended: false },
          { id: 'plan-1-1-60', tenureMonths: 60, monthlyPayment: 2842, interestRate: 10.5, cashback: 7500, recommended: false }
        ]
      },
      {
        id: 'var-1-2', label: '256 GB · Silver', storage: '256 GB', color: 'Silver', colorHex: '#deded9',
        imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-silver-202509?wid=940&hei=1112&fmt=png-alpha', mrp: 134900, price: 127400, isDefault: false,
        emiPlans: [
          { id: 'plan-1-2-12', tenureMonths: 12, monthlyPayment: 11242, interestRate: 0, cashback: 7500, recommended: true }
        ]
      },
      {
        id: 'var-1-3', label: '256 GB · Deep Blue', storage: '256 GB', color: 'Deep Blue', colorHex: '#354663',
        imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-deepblue-202509?wid=940&hei=1112&fmt=png-alpha', mrp: 134900, price: 127400, isDefault: false,
        emiPlans: [
          { id: 'plan-1-3-12', tenureMonths: 12, monthlyPayment: 11242, interestRate: 0, cashback: 7500, recommended: true }
        ]
      }
    ]
  },
  {
    id: 'prod-2',
    slug: 'samsung-galaxy-s25-ultra',
    brand: 'Samsung',
    name: 'Galaxy S25 Ultra',
    tagline: 'Galaxy AI meets Ultra.',
    description: 'An ultra-capable flagship with a precision stylus, intelligent camera tools and a vivid immersive display.',
    category: 'Smartphones',
    imageUrl: '/products/galaxy-s25-ultra-gray.jpg',
    badge: 'BESTSELLER',
    rating: 4.7,
    soldCount: 94,
    seller: '1Fi Select',
    featured: true,
    startingPrice: 119999,
    mrp: 129999,
    startingEmi: 2795,
    images: [
      { imageUrl: '/products/galaxy-s25-ultra-gray.jpg', alt: 'Galaxy S25 Ultra Titanium Gray' },
      { imageUrl: '/products/galaxy-s25-ultra-black.jpg', alt: 'Galaxy S25 Ultra Titanium Black' }
    ],
    specifications: [
      { label: 'Display', value: '6.9-inch Dynamic AMOLED 2X' },
      { label: 'Processor', value: 'Snapdragon 8 Elite' },
      { label: 'Rear camera', value: '200MP quad camera' },
      { label: 'Front camera', value: '12MP' },
      { label: 'Battery', value: '5000 mAh' },
      { label: 'In the box', value: 'Handset, S Pen, USB-C cable, documentation' }
    ],
    variants: [
      {
        id: 'var-2-1', label: '256 GB · Titanium Gray', storage: '256 GB', color: 'Titanium Gray', colorHex: '#989792',
        imageUrl: '/products/galaxy-s25-ultra-gray.jpg', mrp: 129999, price: 119999, isDefault: true,
        emiPlans: [
          { id: 'plan-2-1-3', tenureMonths: 3, monthlyPayment: 43333, interestRate: 0, cashback: 10000, recommended: false },
          { id: 'plan-2-1-6', tenureMonths: 6, monthlyPayment: 21667, interestRate: 0, cashback: 10000, recommended: false },
          { id: 'plan-2-1-12', tenureMonths: 12, monthlyPayment: 10834, interestRate: 0, cashback: 10000, recommended: true },
          { id: 'plan-2-1-24', tenureMonths: 24, monthlyPayment: 5417, interestRate: 0, cashback: 10000, recommended: false },
          { id: 'plan-2-1-36', tenureMonths: 36, monthlyPayment: 4227, interestRate: 10.5, cashback: 10000, recommended: false },
          { id: 'plan-2-1-48', tenureMonths: 48, monthlyPayment: 3330, interestRate: 10.5, cashback: 10000, recommended: false },
          { id: 'plan-2-1-60', tenureMonths: 60, monthlyPayment: 2795, interestRate: 10.5, cashback: 10000, recommended: false }
        ]
      },
      {
        id: 'var-2-2', label: '512 GB · Titanium Black', storage: '512 GB', color: 'Titanium Black', colorHex: '#343434',
        imageUrl: '/products/galaxy-s25-ultra-black.jpg', mrp: 141999, price: 131999, isDefault: false,
        emiPlans: [
          { id: 'plan-2-2-12', tenureMonths: 12, monthlyPayment: 11834, interestRate: 0, cashback: 10000, recommended: true }
        ]
      }
    ]
  },
  {
    id: 'prod-3',
    slug: 'macbook-air-m4',
    brand: 'Apple',
    name: 'MacBook Air M4',
    tagline: 'Supercharged. Seriously light.',
    description: 'A thin and light notebook with Apple silicon, a brilliant Liquid Retina display and all-day battery life.',
    category: 'Computers',
    imageUrl: 'https://www.apple.com/v/macbook-air/z/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png?202607151829',
    badge: 'POPULAR',
    rating: 4.9,
    soldCount: 148,
    seller: '1Fi Select',
    featured: true,
    startingPrice: 92900,
    mrp: 99900,
    startingEmi: 2148,
    images: [{ imageUrl: 'https://www.apple.com/v/macbook-air/z/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png?202607151829', alt: 'MacBook Air M4' }],
    specifications: [
      { label: 'Display', value: '13.6-inch Liquid Retina' },
      { label: 'Processor', value: 'Apple M4 chip' },
      { label: 'Memory', value: '16 GB unified memory' },
      { label: 'Storage', value: '256 GB SSD' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'In the box', value: 'MacBook Air, power adapter, charging cable' }
    ],
    variants: [
      {
        id: 'var-3-1', label: '13-inch · 256 GB · Sky Blue', storage: '256 GB', color: 'Sky Blue', colorHex: '#b8d1df',
        imageUrl: 'https://www.apple.com/v/macbook-air/z/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png?202607151829', mrp: 99900, price: 92900, isDefault: true,
        emiPlans: [
          { id: 'plan-3-1-12', tenureMonths: 12, monthlyPayment: 8325, interestRate: 0, cashback: 7000, recommended: true },
          { id: 'plan-3-1-24', tenureMonths: 24, monthlyPayment: 4163, interestRate: 0, cashback: 7000, recommended: false },
          { id: 'plan-3-1-60', tenureMonths: 60, monthlyPayment: 2148, interestRate: 10.5, cashback: 7000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-4',
    slug: 'ipad-air-m3',
    brand: 'Apple',
    name: 'iPad Air M3',
    tagline: 'Fresh Air. Serious power.',
    description: 'A versatile iPad with Apple silicon, a vivid Liquid Retina display and support for Apple Pencil Pro.',
    category: 'Tablets',
    imageUrl: 'https://www.apple.com/v/ipad-air/ah/images/meta/ipad-air_overview__bc2fd15uec0y_og.png?202607290253',
    badge: 'TRENDING',
    rating: 4.8,
    soldCount: 87,
    seller: '1Fi Select',
    featured: true,
    startingPrice: 55900,
    mrp: 59900,
    startingEmi: 1288,
    images: [{ imageUrl: 'https://www.apple.com/v/ipad-air/ah/images/meta/ipad-air_overview__bc2fd15uec0y_og.png?202607290253', alt: 'iPad Air M3' }],
    specifications: [
      { label: 'Display', value: '11-inch Liquid Retina' },
      { label: 'Processor', value: 'Apple M3 chip' },
      { label: 'Storage', value: '128 GB' },
      { label: 'Camera', value: '12MP wide camera' },
      { label: 'Connectivity', value: 'Wi-Fi 6E' },
      { label: 'In the box', value: 'iPad Air, USB-C cable, adapter' }
    ],
    variants: [
      {
        id: 'var-4-1', label: '11-inch · 128 GB · Blue', storage: '128 GB', color: 'Blue', colorHex: '#a9c5d1',
        imageUrl: 'https://www.apple.com/v/ipad-air/ah/images/meta/ipad-air_overview__bc2fd15uec0y_og.png?202607290253', mrp: 59900, price: 55900, isDefault: true,
        emiPlans: [
          { id: 'plan-4-1-12', tenureMonths: 12, monthlyPayment: 4992, interestRate: 0, cashback: 4000, recommended: true },
          { id: 'plan-4-1-60', tenureMonths: 60, monthlyPayment: 1288, interestRate: 10.5, cashback: 4000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-5',
    slug: 'airpods-pro',
    brand: 'Apple',
    name: 'AirPods Pro',
    tagline: 'Immersive sound. Intelligent silence.',
    description: 'Premium in-ear headphones with active noise cancellation, adaptive audio and a pocketable charging case.',
    category: 'Audio',
    imageUrl: 'https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202607310238',
    badge: 'BESTSELLER',
    rating: 4.8,
    soldCount: 204,
    seller: '1Fi Select',
    featured: true,
    startingPrice: 23900,
    mrp: 25900,
    startingEmi: 557,
    images: [{ imageUrl: 'https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202607310238', alt: 'AirPods Pro' }],
    specifications: [
      { label: 'Audio', value: 'Adaptive Audio' },
      { label: 'Noise control', value: 'Active Noise Cancellation' },
      { label: 'Fit', value: 'Four ear tip sizes' },
      { label: 'Charging', value: 'USB-C and wireless' },
      { label: 'Protection', value: 'Dust, sweat and water resistant' },
      { label: 'In the box', value: 'AirPods Pro, MagSafe case, ear tips, cable' }
    ],
    variants: [
      {
        id: 'var-5-1', label: 'USB-C · White', storage: 'USB-C', color: 'White', colorHex: '#f2f2f2',
        imageUrl: 'https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202607310238', mrp: 25900, price: 23900, isDefault: true,
        emiPlans: [
          { id: 'plan-5-1-12', tenureMonths: 12, monthlyPayment: 2159, interestRate: 0, cashback: 2000, recommended: true },
          { id: 'plan-5-1-60', tenureMonths: 60, monthlyPayment: 557, interestRate: 10.5, cashback: 2000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-6',
    slug: 'playstation-5-console',
    brand: 'PlayStation',
    name: 'PlayStation 5',
    tagline: 'Play has no limits.',
    description: 'A next-generation gaming console with ultra-high-speed storage, immersive haptics and 4K gaming support.',
    category: 'Gaming',
    imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
    badge: 'GAMER PICK',
    rating: 4.9,
    soldCount: 173,
    seller: '1Fi Select',
    featured: true,
    startingPrice: 45990,
    mrp: 49990,
    startingEmi: 1075,
    images: [{ imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$', alt: 'PlayStation 5' }],
    specifications: [
      { label: 'Edition', value: 'Disc console' },
      { label: 'Resolution', value: 'Up to 4K' },
      { label: 'Storage', value: 'Ultra-high-speed SSD' },
      { label: 'Controller', value: 'DualSense wireless' },
      { label: 'Audio', value: 'Tempest 3D AudioTech' },
      { label: 'In the box', value: 'Console, controller, cables, stand' }
    ],
    variants: [
      {
        id: 'var-6-1', label: 'Disc Edition · White', storage: '1 TB Disc', color: 'White', colorHex: '#eceff3',
        imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$', mrp: 54990, price: 49990, isDefault: true,
        emiPlans: [
          { id: 'plan-6-1-12', tenureMonths: 12, monthlyPayment: 4583, interestRate: 0, cashback: 5000, recommended: true },
          { id: 'plan-6-1-60', tenureMonths: 60, monthlyPayment: 1182, interestRate: 10.5, cashback: 5000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-7',
    slug: 'google-pixel-10-pro',
    brand: 'Google',
    name: 'Pixel 10 Pro',
    tagline: 'Helpful by design.',
    description: 'A refined AI-first phone with intelligent photography, clean software and a polished all-day experience.',
    category: 'Smartphones',
    imageUrl: '/products/pixel-10-pro.jpg',
    badge: 'NEW LAUNCH',
    rating: 4.6,
    soldCount: 61,
    seller: '1Fi Select',
    featured: false,
    startingPrice: 99999,
    mrp: 109999,
    startingEmi: 2365,
    images: [{ imageUrl: '/products/pixel-10-pro.jpg', alt: 'Pixel 10 Pro' }],
    specifications: [
      { label: 'Display', value: '6.3-inch Super Actua display' },
      { label: 'Processor', value: 'Google Tensor G5' },
      { label: 'Rear camera', value: 'Pro triple camera system' },
      { label: 'Front camera', value: '42MP' },
      { label: 'Battery', value: '24+ hour battery' },
      { label: 'In the box', value: 'Handset, USB-C cable, documentation' }
    ],
    variants: [
      {
        id: 'var-7-1', label: '256 GB · Porcelain', storage: '256 GB', color: 'Porcelain', colorHex: '#eee9df',
        imageUrl: '/products/pixel-10-pro.jpg', mrp: 109999, price: 99999, isDefault: true,
        emiPlans: [
          { id: 'plan-7-1-12', tenureMonths: 12, monthlyPayment: 9167, interestRate: 0, cashback: 10000, recommended: true },
          { id: 'plan-7-1-60', tenureMonths: 60, monthlyPayment: 2365, interestRate: 10.5, cashback: 10000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-8',
    slug: 'dji-osmo-pocket-3',
    brand: 'DJI',
    name: 'Osmo Pocket 3',
    tagline: 'For moving moments.',
    description: 'A pocket-sized gimbal camera with a large sensor, smooth three-axis stabilisation and a rotating touchscreen.',
    category: 'Cameras',
    imageUrl: 'https://www-cdn.djiits.com/cms/uploads/8c6ec9b0dc4e170120dfd4ebf9f0ffd6@374*374.png',
    badge: 'CREATOR PICK',
    rating: 4.7,
    soldCount: 56,
    seller: '1Fi Select',
    featured: false,
    startingPrice: 47999,
    mrp: 50999,
    startingEmi: 1097,
    images: [{ imageUrl: 'https://www-cdn.djiits.com/cms/uploads/8c6ec9b0dc4e170120dfd4ebf9f0ffd6@374*374.png', alt: 'Osmo Pocket 3' }],
    specifications: [
      { label: 'Sensor', value: '1-inch CMOS' },
      { label: 'Video', value: '4K up to 120 fps' },
      { label: 'Stabilisation', value: '3-axis mechanical gimbal' },
      { label: 'Display', value: '2-inch rotating touchscreen' },
      { label: 'Audio', value: 'Stereo recording' },
      { label: 'In the box', value: 'Camera, cover, wrist strap, cable' }
    ],
    variants: [
      {
        id: 'var-8-1', label: 'Standard Combo · Black', storage: 'Standard', color: 'Black', colorHex: '#242424',
        imageUrl: 'https://www-cdn.djiits.com/cms/uploads/8c6ec9b0dc4e170120dfd4ebf9f0ffd6@374*374.png', mrp: 50999, price: 47999, isDefault: true,
        emiPlans: [
          { id: 'plan-8-1-12', tenureMonths: 12, monthlyPayment: 4250, interestRate: 0, cashback: 3000, recommended: true },
          { id: 'plan-8-1-60', tenureMonths: 60, monthlyPayment: 1097, interestRate: 10.5, cashback: 3000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-9',
    slug: 'apple-watch-ultra',
    brand: 'Apple',
    name: 'Apple Watch Ultra',
    tagline: 'Built for adventure.',
    description: 'A rugged smartwatch with precision GPS, advanced health features and a bright always-on display.',
    category: 'Wearables',
    imageUrl: 'https://www.apple.com/assets-www/en_IN/watch1/og/watch_og_c64ec6c67.png',
    badge: 'PREMIUM',
    rating: 4.8,
    soldCount: 72,
    seller: '1Fi Select',
    featured: false,
    startingPrice: 84900,
    mrp: 89900,
    startingEmi: 1933,
    images: [{ imageUrl: 'https://www.apple.com/assets-www/en_IN/watch1/og/watch_og_c64ec6c67.png', alt: 'Apple Watch Ultra' }],
    specifications: [
      { label: 'Case', value: '49 mm titanium' },
      { label: 'Display', value: 'Always-On Retina' },
      { label: 'Connectivity', value: 'GPS + Cellular' },
      { label: 'Water resistance', value: '100 metres' },
      { label: 'Battery', value: 'Multi-day battery life' },
      { label: 'In the box', value: 'Watch, band, charging cable' }
    ],
    variants: [
      {
        id: 'var-9-1', label: 'Ocean Band · Titanium', storage: '49 mm · Ocean Band', color: 'Natural Titanium', colorHex: '#b8b0a1',
        imageUrl: 'https://www.apple.com/assets-www/en_IN/watch1/og/watch_og_c64ec6c67.png', mrp: 89900, price: 84900, isDefault: true,
        emiPlans: [
          { id: 'plan-9-1-12', tenureMonths: 12, monthlyPayment: 7492, interestRate: 0, cashback: 5000, recommended: true },
          { id: 'plan-9-1-60', tenureMonths: 60, monthlyPayment: 1933, interestRate: 10.5, cashback: 5000, recommended: false }
        ]
      }
    ]
  },
  {
    id: 'prod-10',
    slug: 'homepod-mini',
    brand: 'Apple',
    name: 'HomePod mini',
    tagline: 'Room-filling sound. Compact form.',
    description: 'A compact smart speaker with rich 360-degree audio, Siri and seamless integration with Apple devices.',
    category: 'Audio',
    imageUrl: 'https://www.apple.com/v/homepod-mini/j/images/meta/homepod-mini__bnxwvz5xrtpy_og.png?202604170053',
    badge: 'SMART HOME',
    rating: 4.6,
    soldCount: 91,
    seller: '1Fi Select',
    featured: false,
    startingPrice: 9900,
    mrp: 10900,
    startingEmi: 234,
    images: [{ imageUrl: 'https://www.apple.com/v/homepod-mini/j/images/meta/homepod-mini__bnxwvz5xrtpy_og.png?202604170053', alt: 'HomePod mini' }],
    specifications: [
      { label: 'Audio', value: '360-degree computational audio' },
      { label: 'Assistant', value: 'Siri' },
      { label: 'Connectivity', value: 'Wi-Fi and Bluetooth' },
      { label: 'Home control', value: 'Matter and HomeKit' },
      { label: 'Size', value: 'Compact 3.3-inch design' },
      { label: 'In the box', value: 'HomePod mini, power adapter' }
    ],
    variants: [
      {
        id: 'var-10-1', label: 'HomePod mini · Orange', storage: 'Standard', color: 'Orange', colorHex: '#e86f45',
        imageUrl: 'https://www.apple.com/v/homepod-mini/j/images/meta/homepod-mini__bnxwvz5xrtpy_og.png?202604170053', mrp: 10900, price: 9900, isDefault: true,
        emiPlans: [
          { id: 'plan-10-1-12', tenureMonths: 12, monthlyPayment: 908, interestRate: 0, cashback: 1000, recommended: true },
          { id: 'plan-10-1-60', tenureMonths: 60, monthlyPayment: 234, interestRate: 10.5, cashback: 1000, recommended: false }
        ]
      }
    ]
  }
];
