import { CheckoutIntent, Product, connectDatabase, disconnectDatabase } from './database.js';

const media = {
  iphoneCard: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-cosmicorange-202509?wid=940&hei=1112&fmt=png-alpha',
  iphoneOrange: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-cosmicorange-202509?wid=940&hei=1112&fmt=png-alpha',
  iphoneSilver: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-silver-202509?wid=940&hei=1112&fmt=png-alpha',
  iphoneBlue: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-pro-finish-select-deepblue-202509?wid=940&hei=1112&fmt=png-alpha',
  galaxyGray: 'https://images.samsung.com/in/smartphones/galaxy-s25-ultra/images/galaxy-s25-ultra-features-colors-titanium-gray.jpg',
  galaxyBlack: 'https://images.samsung.com/in/smartphones/galaxy-s25-ultra/images/galaxy-s25-ultra-features-colors-titanium-black.jpg',
  pixel: 'https://lh3.googleusercontent.com/cUnl8qDLSpzTlH9_9fIEpNHq8EiVH-JwF-r0FPGha83zS26d0FO4LYUxYDU-k3CO6VDt9pyMOHWXiSvvFcenGccNM5B1L8TVO-2OtA=w1000-rj-sc0xffffffff',
  macbook: 'https://www.apple.com/v/macbook-air/z/images/meta/macbook_air_mx__ez5y0k5yy7au_og.png?202607151829',
  ipad: 'https://www.apple.com/v/ipad-air/ah/images/meta/ipad-air_overview__bc2fd15uec0y_og.png?202607290253',
  airpods: 'https://www.apple.com/v/airpods-pro/s/images/meta/og__c0ceegchesom_overview.png?202607310238',
  playstation: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
  dji: 'https://www-cdn.djiits.com/cms/uploads/8c6ec9b0dc4e170120dfd4ebf9f0ffd6@374*374.png',
  watch: 'https://www.apple.com/assets-www/en_IN/watch1/og/watch_og_c64ec6c67.png',
  homepod: 'https://www.apple.com/v/homepod-mini/j/images/meta/homepod-mini__bnxwvz5xrtpy_og.png?202604170053'
};

export const products = [
  {
    slug: 'iphone-17-pro', brand: 'Apple', name: 'iPhone 17 Pro',
    tagline: 'Pro power. Effortlessly yours.',
    description: 'A premium smartphone with a pro camera system, all-day battery and a brilliant edge-to-edge display.',
    category: 'Smartphones', imageUrl: media.iphoneCard, badge: 'NEW', rating: 4.8, soldCount: 120, seller: '1Fi Select', featured: 1,
    images: [media.iphoneOrange, media.iphoneSilver, media.iphoneBlue],
    specs: [['Display', '6.3-inch Super Retina XDR'], ['Processor', 'A19 Pro chip'], ['Rear camera', '48MP Pro camera system'], ['Front camera', '18MP Center Stage'], ['Battery', 'All-day battery life'], ['In the box', 'Handset, USB-C cable, documentation']],
    variants: [
      ['256 GB · Cosmic Orange', '256 GB', 'Cosmic Orange', '#e46f34', media.iphoneOrange, 134900, 127400],
      ['256 GB · Silver', '256 GB', 'Silver', '#deded9', media.iphoneSilver, 134900, 127400],
      ['256 GB · Deep Blue', '256 GB', 'Deep Blue', '#354663', media.iphoneBlue, 134900, 127400]
    ]
  },
  {
    slug: 'samsung-galaxy-s25-ultra', brand: 'Samsung', name: 'Galaxy S25 Ultra',
    tagline: 'Galaxy AI meets Ultra.',
    description: 'An ultra-capable flagship with a precision stylus, intelligent camera tools and a vivid immersive display.',
    category: 'Smartphones', imageUrl: media.galaxyGray, badge: 'BESTSELLER', rating: 4.7, soldCount: 94, seller: '1Fi Select', featured: 1,
    images: [media.galaxyGray, media.galaxyBlack],
    specs: [['Display', '6.9-inch Dynamic AMOLED 2X'], ['Processor', 'Snapdragon 8 Elite'], ['Rear camera', '200MP quad camera'], ['Front camera', '12MP'], ['Battery', '5000 mAh'], ['In the box', 'Handset, S Pen, USB-C cable, documentation']],
    variants: [
      ['256 GB · Titanium Gray', '256 GB', 'Titanium Gray', '#989792', media.galaxyGray, 129999, 119999],
      ['512 GB · Titanium Black', '512 GB', 'Titanium Black', '#343434', media.galaxyBlack, 141999, 131999]
    ]
  },
  {
    slug: 'google-pixel-10-pro', brand: 'Google', name: 'Pixel 10 Pro',
    tagline: 'Helpful by design.',
    description: 'A refined AI-first phone with intelligent photography, clean software and a polished all-day experience.',
    category: 'Smartphones', imageUrl: media.pixel, badge: 'NEW LAUNCH', rating: 4.6, soldCount: 61, seller: '1Fi Select', featured: 0,
    images: [media.pixel],
    specs: [['Display', '6.3-inch Super Actua display'], ['Processor', 'Google Tensor G5'], ['Rear camera', 'Pro triple camera system'], ['Front camera', '42MP'], ['Battery', '24+ hour battery'], ['In the box', 'Handset, USB-C cable, documentation']],
    variants: [
      ['256 GB · Porcelain', '256 GB', 'Porcelain', '#eee9df', media.pixel, 109999, 99999],
      ['256 GB · Obsidian', '256 GB', 'Obsidian', '#292929', media.pixel, 109999, 99999]
    ]
  },
  {
    slug: 'macbook-air-m4', brand: 'Apple', name: 'MacBook Air M4',
    tagline: 'Supercharged. Seriously light.',
    description: 'A thin and light notebook with Apple silicon, a brilliant Liquid Retina display and all-day battery life.',
    category: 'Computers', imageUrl: media.macbook, badge: 'POPULAR', rating: 4.9, soldCount: 148, seller: '1Fi Select', featured: 1,
    images: [media.macbook],
    specs: [['Display', '13.6-inch Liquid Retina'], ['Processor', 'Apple M4 chip'], ['Memory', '16 GB unified memory'], ['Storage', '256 GB SSD'], ['Battery', 'Up to 18 hours'], ['In the box', 'MacBook Air, power adapter, charging cable']],
    variants: [
      ['13-inch · 256 GB · Sky Blue', '256 GB', 'Sky Blue', '#b8d1df', media.macbook, 99900, 92900],
      ['13-inch · 512 GB · Sky Blue', '512 GB', 'Sky Blue', '#b8d1df', media.macbook, 119900, 109900]
    ]
  },
  {
    slug: 'ipad-air-m3', brand: 'Apple', name: 'iPad Air M3',
    tagline: 'Fresh Air. Serious power.',
    description: 'A versatile iPad with Apple silicon, a vivid Liquid Retina display and support for Apple Pencil Pro.',
    category: 'Tablets', imageUrl: media.ipad, badge: 'TRENDING', rating: 4.8, soldCount: 87, seller: '1Fi Select', featured: 1,
    images: [media.ipad],
    specs: [['Display', '11-inch Liquid Retina'], ['Processor', 'Apple M3 chip'], ['Storage', '128 GB'], ['Camera', '12MP wide camera'], ['Connectivity', 'Wi-Fi 6E'], ['In the box', 'iPad Air, USB-C cable, adapter']],
    variants: [
      ['11-inch · 128 GB · Blue', '128 GB', 'Blue', '#a9c5d1', media.ipad, 59900, 55900],
      ['11-inch · 256 GB · Blue', '256 GB', 'Blue', '#a9c5d1', media.ipad, 69900, 64900]
    ]
  },
  {
    slug: 'airpods-pro', brand: 'Apple', name: 'AirPods Pro',
    tagline: 'Immersive sound. Intelligent silence.',
    description: 'Premium in-ear headphones with active noise cancellation, adaptive audio and a pocketable charging case.',
    category: 'Audio', imageUrl: media.airpods, badge: 'BESTSELLER', rating: 4.8, soldCount: 204, seller: '1Fi Select', featured: 1,
    images: [media.airpods],
    specs: [['Audio', 'Adaptive Audio'], ['Noise control', 'Active Noise Cancellation'], ['Fit', 'Four ear tip sizes'], ['Charging', 'USB-C and wireless'], ['Protection', 'Dust, sweat and water resistant'], ['In the box', 'AirPods Pro, MagSafe case, ear tips, cable']],
    variants: [
      ['USB-C · White', 'USB-C', 'White', '#f2f2f2', media.airpods, 25900, 23900],
      ['MagSafe case · White', 'MagSafe case', 'White', '#f2f2f2', media.airpods, 27900, 25900]
    ]
  },
  {
    slug: 'playstation-5-console', brand: 'PlayStation', name: 'PlayStation 5',
    tagline: 'Play has no limits.',
    description: 'A next-generation gaming console with ultra-high-speed storage, immersive haptics and 4K gaming support.',
    category: 'Gaming', imageUrl: media.playstation, badge: 'GAMER PICK', rating: 4.9, soldCount: 173, seller: '1Fi Select', featured: 1,
    images: [media.playstation],
    specs: [['Edition', 'Disc console'], ['Resolution', 'Up to 4K'], ['Storage', 'Ultra-high-speed SSD'], ['Controller', 'DualSense wireless'], ['Audio', 'Tempest 3D AudioTech'], ['In the box', 'Console, controller, cables, stand']],
    variants: [
      ['Disc Edition · White', '1 TB Disc', 'White', '#eceff3', media.playstation, 54990, 49990],
      ['Digital Edition · White', '1 TB Digital', 'White', '#eceff3', media.playstation, 49990, 45990]
    ]
  },
  {
    slug: 'dji-osmo-pocket-3', brand: 'DJI', name: 'Osmo Pocket 3',
    tagline: 'For moving moments.',
    description: 'A pocket-sized gimbal camera with a large sensor, smooth three-axis stabilisation and a rotating touchscreen.',
    category: 'Cameras', imageUrl: media.dji, badge: 'CREATOR PICK', rating: 4.7, soldCount: 56, seller: '1Fi Select', featured: 0,
    images: [media.dji],
    specs: [['Sensor', '1-inch CMOS'], ['Video', '4K up to 120 fps'], ['Stabilisation', '3-axis mechanical gimbal'], ['Display', '2-inch rotating touchscreen'], ['Audio', 'Stereo recording'], ['In the box', 'Camera, cover, wrist strap, cable']],
    variants: [
      ['Standard Combo · Black', 'Standard', 'Black', '#242424', media.dji, 50999, 47999],
      ['Creator Combo · Black', 'Creator Combo', 'Black', '#242424', media.dji, 66999, 61999]
    ]
  },
  {
    slug: 'apple-watch-ultra', brand: 'Apple', name: 'Apple Watch Ultra',
    tagline: 'Built for adventure.',
    description: 'A rugged smartwatch with precision GPS, advanced health features and a bright always-on display.',
    category: 'Wearables', imageUrl: media.watch, badge: 'PREMIUM', rating: 4.8, soldCount: 72, seller: '1Fi Select', featured: 0,
    images: [media.watch],
    specs: [['Case', '49 mm titanium'], ['Display', 'Always-On Retina'], ['Connectivity', 'GPS + Cellular'], ['Water resistance', '100 metres'], ['Battery', 'Multi-day battery life'], ['In the box', 'Watch, band, charging cable']],
    variants: [
      ['Ocean Band · Titanium', '49 mm · Ocean Band', 'Natural Titanium', '#b8b0a1', media.watch, 89900, 84900],
      ['Trail Loop · Titanium', '49 mm · Trail Loop', 'Natural Titanium', '#b8b0a1', media.watch, 92900, 87900]
    ]
  },
  {
    slug: 'homepod-mini', brand: 'Apple', name: 'HomePod mini',
    tagline: 'Room-filling sound. Compact form.',
    description: 'A compact smart speaker with rich 360-degree audio, Siri and seamless integration with Apple devices.',
    category: 'Audio', imageUrl: media.homepod, badge: 'SMART HOME', rating: 4.6, soldCount: 91, seller: '1Fi Select', featured: 0,
    images: [media.homepod],
    specs: [['Audio', '360-degree computational audio'], ['Assistant', 'Siri'], ['Connectivity', 'Wi-Fi and Bluetooth'], ['Home control', 'Matter and HomeKit'], ['Size', 'Compact 3.3-inch design'], ['In the box', 'HomePod mini, power adapter']],
    variants: [
      ['HomePod mini · Orange', 'Standard', 'Orange', '#e86f45', media.homepod, 10900, 9900],
      ['HomePod mini · Blue', 'Standard', 'Blue', '#527ea0', media.homepod, 10900, 9900]
    ]
  }
];

function monthlyPayment(principal, months, annualRate) {
  if (annualRate === 0) return Math.ceil(principal / months);
  const rate = annualRate / 1200;
  return Math.ceil(principal * rate * ((1 + rate) ** months) / (((1 + rate) ** months) - 1));
}

function makePlans(productSlug, mrp, price) {
  const referencePayments = { 3: 44967, 6: 22483, 12: 11242, 24: 5621, 36: 4297, 48: 3385, 60: 2842 };
  const cashback = mrp - price;
  return [3, 6, 12, 24, 36, 48, 60].map((tenureMonths) => {
    const interestRate = tenureMonths <= 24 ? 0 : 10.5;
    return {
      tenureMonths,
      interestRate,
      cashback,
      monthlyPayment: productSlug === 'iphone-17-pro'
        ? referencePayments[tenureMonths]
        : monthlyPayment(mrp, tenureMonths, interestRate),
      recommended: tenureMonths === 12
    };
  });
}

function toMongoProduct(product) {
  const { variants, images, specs, ...data } = product;
  return {
    ...data,
    featured: Boolean(data.featured),
    images: images.map((imageUrl, index) => ({ imageUrl, alt: `${product.name} view ${index + 1}` })),
    specifications: specs.map(([label, value]) => ({ label, value })),
    variants: variants.map(([label, storage, color, colorHex, imageUrl, mrp, price], index) => ({
      label,
      storage,
      color,
      colorHex,
      imageUrl,
      mrp,
      price,
      isDefault: index === 0,
      emiPlans: makePlans(product.slug, mrp, price)
    }))
  };
}

export async function seedDatabase() {
  await connectDatabase();
  await CheckoutIntent.deleteMany({});
  await Product.deleteMany({});
  await Product.insertMany(products.map(toMongoProduct));
  return products.length;
}

if (process.argv[1]?.endsWith('seed.js')) {
  const count = await seedDatabase();
  console.log(`Seeded ${count} products into MongoDB`);
  await disconnectDatabase();
}
