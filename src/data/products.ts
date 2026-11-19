import { Product, ProductCategory } from '../types';

export const HERO_BANNER_IMAGE = '/src/assets/images/hero_amazon_banner_1793601150267.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-echo-sphere',
    title: 'Amazon Echo Studio High-Fidelity Smart Speaker with 3D Audio & Alexa',
    brand: 'Amazon',
    category: 'Smart Home',
    price: 99.99,
    listPrice: 129.99,
    rating: 4.7,
    reviewsCount: 38420,
    inStock: true,
    stockCount: 18,
    prime: true,
    bestSeller: true,
    dealTag: 'Limited time deal · 23% off',
    image: '/src/assets/images/product_echo_speaker_1793601150261.jpg',
    description: 'Immersive sound with 5 directional speakers that produce powerful bass, dynamic midrange, and crisp highs. Dolby Atmos technology adds spatial depth, width, and height.',
    features: [
      'Immersive audio: 5 directional speakers produce clear bass and crisp highs',
      'Voice control your music: Stream songs from Amazon Music, Apple Music, Spotify, Pandora, and more',
      'Adapts to any room: Automatically senses the acoustics of your space and fine-tunes playback',
      'Built-in smart home hub: Ask Alexa to control Zigbee and Matter-compatible devices',
      'Privacy controls: Built with multiple layers of privacy protections, including a microphone off button'
    ],
    specs: {
      'Dimensions': '8.1”H x 6.9”D (206 mm x 175 mm)',
      'Weight': '7.7 lbs (3.5 kg)',
      'Audio': 'Three 2.0” mid-range speakers, 1.0” tweeter, 5.25” woofer',
      'Connectivity': 'Dual-band Wi-Fi 802.11 a/b/g/n/ac'
    },
    colors: ['Charcoal Mesh', 'Glacier White', 'Twilight Blue'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus K.',
        rating: 5,
        date: 'October 14, 2026',
        title: 'Studio quality sound in a compact sphere',
        comment: 'The room calibration is magic. I placed it in my living room and the sound fills the entire space with clean bass and crystal vocal separation.',
        verified: true,
        helpfulCount: 312
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 4,
        date: 'September 28, 2026',
        title: 'Great acoustic depth and Alexa responsiveness',
        comment: 'Dolby Atmos tracks sound unreal. Setup took under 2 minutes using the Alexa app.',
        verified: true,
        helpfulCount: 89
      }
    ]
  },
  {
    id: 'prod-kindle-paperwhite',
    title: 'Kindle Paperwhite (16 GB) – 6.8" glare-free display, adjustable warm light, up to 10 weeks battery life',
    brand: 'Amazon',
    category: 'Books',
    price: 139.99,
    listPrice: 159.99,
    rating: 4.8,
    reviewsCount: 74210,
    inStock: true,
    stockCount: 45,
    prime: true,
    bestSeller: true,
    amazonChoice: true,
    dealTag: 'Save $20 with Prime',
    image: '/src/assets/images/product_kindle_paperwhite_1793601151187.jpg',
    description: 'All-new Kindle Paperwhite now with a 6.8” display, thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
    features: [
      'Purpose-built for reading: Flush-front design and 300 ppi glare-free display that reads like real paper, even in bright sunlight',
      'Adjustable warm light to shift screen shade from white to amber',
      'Waterproof reading: IPX8 rated to protect against accidental immersion in fresh water',
      'Go hands-free: Pair with an Audible subscription and Bluetooth headphones/speakers'
    ],
    specs: {
      'Display': '6.8” Paperwhite display with built-in light, 300 ppi',
      'Storage': '16 GB holds thousands of books',
      'Battery Life': 'A single charge lasts up to 10 weeks',
      'Water Resistance': 'IPX8 (2 meters fresh water for 60 mins)'
    },
    colors: ['Black', 'Agave Green', 'Denim'],
    reviews: [
      {
        id: 'rev-3',
        author: 'David Chen',
        rating: 5,
        date: 'October 2, 2026',
        title: 'The warm light upgrade is worth every penny',
        comment: 'Reading in bed at night without eye strain has been life-changing. Battery lasts forever.',
        verified: true,
        helpfulCount: 541
      }
    ]
  },
  {
    id: 'prod-wireless-headphones',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Over-Ear Headphones with Mic',
    brand: 'Sony',
    category: 'Electronics',
    price: 348.00,
    listPrice: 399.99,
    rating: 4.6,
    reviewsCount: 19430,
    inStock: true,
    stockCount: 12,
    prime: true,
    amazonChoice: true,
    dealTag: 'Limited time deal · 13% off',
    image: '/src/assets/images/product_wireless_headphones_1793601151907.jpg',
    description: 'Two processors and 8 microphones for unprecedented noise cancellation and exceptional call quality. Newly developed lightweight driver unit produces balanced, lifelike sound.',
    features: [
      'Industry-leading active noise cancellation with 2 processors and 8 microphones',
      'Magnificent sound engineered with the new Integrated Processor V1',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
      'Ultra-comfortable lightweight design with soft fit synthetic leather'
    ],
    specs: {
      'Battery': 'Up to 30 hours (ANC on)',
      'Weight': '250g (8.8 oz)',
      'Bluetooth': 'v5.2, LDAC, AAC, SBC',
      'Voice Assistant': 'Google Assistant & Alexa built-in'
    },
    colors: ['Matte Black', 'Silver Frost', 'Midnight Blue'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Claire Vance',
        rating: 5,
        date: 'October 19, 2026',
        title: 'Unrivaled noise cancellation on flights',
        comment: 'Cabin hum is totally erased. The microphone isolates my voice even walking through windy streets.',
        verified: true,
        helpfulCount: 219
      }
    ]
  },
  {
    id: 'prod-espresso-maker',
    title: 'Breville Barista Touch Impress Brushed Stainless Steel Espresso & Cappuccino Machine',
    brand: 'Breville',
    category: 'Home & Kitchen',
    price: 699.95,
    listPrice: 799.95,
    rating: 4.8,
    reviewsCount: 8320,
    inStock: true,
    stockCount: 6,
    prime: true,
    bestSeller: true,
    dealTag: 'Save $100 today',
    image: '/src/assets/images/product_espresso_maker_1793601152153.jpg',
    description: 'Experience third wave specialty coffee at home with step-by-step barista guidance at your fingertips. Real-time feedback for intelligent dosing and assisted tamping.',
    features: [
      'Impress Puck System: Assisted 22 lb tamp with 7-degree barista twist finish',
      'Auto MilQ hands-free microfoam with alternate milk settings (Dairy, Almond, Oat, Soy)',
      'ThermoJet heating system reaches optimum extraction temperature in 3 seconds',
      'Touchscreen display with swipe & select favorite coffee recipes'
    ],
    specs: {
      'Capacity': '67 fl oz (2 Liter) removable water tank',
      'Power': '1800 Watts',
      'Dimensions': '13” x 14.5” x 16”',
      'Pressure': '15 Bar Italian Pump'
    },
    colors: ['Brushed Stainless Steel', 'Black Truffle', 'Damson Blue'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Julian Thorne',
        rating: 5,
        date: 'September 12, 2026',
        title: 'Better than my local coffee shop',
        comment: 'The microfoam texture on oat milk is perfection. In 45 seconds I have a velvety flat white.',
        verified: true,
        helpfulCount: 410
      }
    ]
  },
  {
    id: 'prod-ipad-air',
    title: 'Apple iPad Air 11-inch (M2 Chip, Liquid Retina Display, 128GB, Wi-Fi 6E)',
    brand: 'Apple',
    category: 'Computers & Accessories',
    price: 549.00,
    listPrice: 599.00,
    rating: 4.8,
    reviewsCount: 14200,
    inStock: true,
    stockCount: 22,
    prime: true,
    amazonChoice: true,
    dealTag: 'Save $50 at checkout',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    description: 'Now with the blazing-fast Apple M2 chip, a stunning Liquid Retina display, and landscape 12MP front camera with Center Stage.',
    features: [
      'Incredible Apple M2 chip gives breakthrough performance for creative tasks and gaming',
      'Brilliant 11-inch Liquid Retina display with P3 wide color, True Tone, and ultralow reflectivity',
      'Supports Apple Pencil Pro and Magic Keyboard',
      'All-day battery life to work and play anywhere'
    ],
    specs: {
      'Processor': 'Apple M2 8-core CPU / 10-core GPU',
      'Screen': '11-inch LED backlit Liquid Retina',
      'Weight': '1.02 lbs (462 grams)',
      'Security': 'Touch ID sensor in top button'
    },
    colors: ['Space Gray', 'Starlight', 'Purple', 'Blue'],
    sizes: ['128GB', '256GB', '512GB', '1TB'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Samantha Brooks',
        rating: 5,
        date: 'October 1, 2026',
        title: 'Blazing fast and featherlight',
        comment: 'Runs Lightroom and Procreate effortlessly. Battery easily lasts 10 hours of intensive drawing.',
        verified: true,
        helpfulCount: 198
      }
    ]
  },
  {
    id: 'prod-anker-powerbank',
    title: 'Anker Prime 20,000mAh Power Bank (200W Output, Smart Digital Display, 3-Port Fast Charger)',
    brand: 'Anker',
    category: 'Electronics',
    price: 89.99,
    listPrice: 129.99,
    rating: 4.7,
    reviewsCount: 11250,
    inStock: true,
    stockCount: 34,
    prime: true,
    bestSeller: true,
    dealTag: 'Limited time deal · 31% off',
    image: 'https://images.unsplash.com/photo-1609592424361-b530c1be16ea?w=800&auto=format&fit=crop&q=80',
    description: 'Equipped with two high-powered USB-C ports and one USB-A port totaling 200W output. Quickly charge two laptops simultaneously at 100W each.',
    features: [
      '200W Total Output: Charge two laptops fast via 100W USB-C ports',
      'Smart Digital Display: Real-time battery status, input, output, and estimated charging time',
      '20,000mAh Massive Capacity: Charges an iPhone 16 nearly 4 times or MacBook Air once',
      'ActiveShield 2.0 temperature monitoring 3 million times per day'
    ],
    specs: {
      'Capacity': '20,000 mAh / 72Wh',
      'Ports': '2x USB-C, 1x USB-A',
      'Dimensions': '4.9 × 2.1 × 1.9 inches',
      'Recharge Time': '75 minutes at 100W input'
    },
    colors: ['Titanium Gray', 'Phantom Black'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Derrick M.',
        rating: 5,
        date: 'August 24, 2026',
        title: 'Essential for digital nomads',
        comment: 'Keeps my MacBook and phone alive through long cross-country flights without taking up space.',
        verified: true,
        helpfulCount: 88
      }
    ]
  },
  {
    id: 'prod-atomic-habits',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones Hardcover',
    brand: 'James Clear',
    category: 'Books',
    price: 14.99,
    listPrice: 27.00,
    rating: 4.9,
    reviewsCount: 154200,
    inStock: true,
    stockCount: 120,
    prime: true,
    bestSeller: true,
    amazonChoice: true,
    dealTag: '44% off publisher price',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies to form good habits, break bad ones, and master tiny behaviors.',
    features: [
      'Over 15 million copies sold worldwide',
      '#1 New York Times Bestseller for over 200 weeks',
      'Practical framework: Make it obvious, make it attractive, make it easy, make it satisfying',
      'Includes downloadable habit tracking templates and cheat sheets'
    ],
    specs: {
      'Format': 'Hardcover, 320 pages',
      'Publisher': 'Avery; 1st edition',
      'Language': 'English',
      'ISBN-10': '0735211299'
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'Rebecca Foster',
        rating: 5,
        date: 'July 14, 2026',
        title: 'Actionable, research-backed, life altering',
        comment: 'I reread this every single January. The 1% incremental improvement concept fundamentally changed how I run my days.',
        verified: true,
        helpfulCount: 1240
      }
    ]
  },
  {
    id: 'prod-rain-jacket',
    title: 'Arc\'teryx Beta Lightweight Waterproof Gore-Tex Shell Jacket',
    brand: 'Arc\'teryx',
    category: 'Fashion',
    price: 399.00,
    listPrice: 450.00,
    rating: 4.8,
    reviewsCount: 4210,
    inStock: true,
    stockCount: 9,
    prime: true,
    bestSeller: false,
    dealTag: 'Save $51 with Prime',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    description: 'Versatile waterproof, windproof, breathable Gore-Tex shell delivers complete weather protection across a wide range of alpine activities and city downpours.',
    features: [
      'GORE-TEX fabric with GORE C-KNIT backer technology is quiet, soft, and exceptionally breathable',
      'Low profile StormHood adjusts with a single pull for full peripheral visibility',
      'WaterTight pit zips enable rapid thermal ventilation',
      'Dual lower hem adjusters seal out cold drafts and moisture'
    ],
    specs: {
      'Material': '3-layer GORE-TEX with ePE membrane',
      'Fit': 'Trim, hip length with articulated patterning',
      'Weight': '300 g (10.6 oz)',
      'Care': 'Machine wash warm, tumble dry gentle'
    },
    colors: ['Black Sapphire', 'Graphite Slate', 'Solitude Gray', 'Alpine Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    reviews: [
      {
        id: 'rev-9',
        author: 'Liam O\'Connor',
        rating: 5,
        date: 'September 5, 2026',
        title: 'Bone dry through Pacific Northwest monsoons',
        comment: 'Lightweight enough to pack into a briefcase yet totally stormproof on mountain hikes.',
        verified: true,
        helpfulCount: 76
      }
    ]
  },
  {
    id: 'prod-mechanical-keyboard',
    title: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard (QMK/VIA CNC Aluminum, Hot-Swappable)',
    brand: 'Keychron',
    category: 'Computers & Accessories',
    price: 189.99,
    listPrice: 219.99,
    rating: 4.7,
    reviewsCount: 5310,
    inStock: true,
    stockCount: 15,
    prime: true,
    amazonChoice: true,
    dealTag: 'Limited time deal · 14% off',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    description: 'A fully customizable 75% layout wireless mechanical keyboard engineered with double-gasket acoustic mounting and full CNC machined aluminum body.',
    features: [
      'Full CNC aluminum 6063 body with anodized finish and double-gasket sound damping',
      'Broadcom Bluetooth 5.1 & Type-C wired connection for up to 3 devices',
      'Hot-swappable sockets support 3-pin and 5-pin MX mechanical switches',
      'QMK & VIA support for endless macro customization and key remapping'
    ],
    specs: {
      'Layout': '75% (81 keys with programmable rotary knob)',
      'Battery': '4000mAh rechargeable Li-polymer',
      'Switch Type': 'K Pro Red (Linear) / Brown (Tactile)',
      'Compatibility': 'macOS, Windows, Linux, iOS, Android'
    },
    colors: ['Carbon Black', 'Retro Gray', 'Silver White'],
    reviews: [
      {
        id: 'rev-10',
        author: 'Nathaniel V.',
        rating: 5,
        date: 'August 18, 2026',
        title: 'The acoustic thock is intoxicating',
        comment: 'Heavy solid slab of aluminum that never shifts on the desk. Mac keycaps included right in the box.',
        verified: true,
        helpfulCount: 142
      }
    ]
  },
  {
    id: 'prod-skincare-oil',
    title: 'Pai Skincare Organic Rosehip BioRegenerate Universal Facial Oil (1.0 Fl Oz)',
    brand: 'Pai Skincare',
    category: 'Beauty & Care',
    price: 44.00,
    listPrice: 49.00,
    rating: 4.6,
    reviewsCount: 6890,
    inStock: true,
    stockCount: 40,
    prime: true,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1608248597359-50669c6f2a64?w=800&auto=format&fit=crop&q=80',
    description: 'Condition and restore compromised, sensitive skin with pure Andean rosehip seed and fruit extract packed with omegas 3, 6, 7 and 9 plus protective carotenoids.',
    features: [
      'Certified organic and cruelty-free formula specifically for sensitive skin',
      'Rich in regenerative Omegas 3, 6, 7 & 9 for deep hydration',
      'Volcanic CO2 extraction preserves high concentrations of active nutrients',
      'Non-comedogenic, fast absorbing without greasy residue'
    ],
    specs: {
      'Volume': '30ml / 1.0 fl. oz',
      'Skin Type': 'All skin types, especially sensitive and dry',
      'Certification': 'Cosmos Organic, Leaping Bunny',
      'Origin': 'Made in London, UK'
    },
    reviews: [
      {
        id: 'rev-11',
        author: 'Chloe G.',
        rating: 5,
        date: 'October 11, 2026',
        title: 'Restored my damaged moisture barrier in 4 days',
        comment: 'Deep amber color proves how fresh the extraction is. Wakes up dull skin like nothing else.',
        verified: true,
        helpfulCount: 63
      }
    ]
  },
  {
    id: 'prod-air-fryer',
    title: 'Ninja Foodi 6-in-1 8-qt. 2-Basket Air Fryer with DualZone Technology',
    brand: 'Ninja',
    category: 'Home & Kitchen',
    price: 149.99,
    listPrice: 199.99,
    rating: 4.8,
    reviewsCount: 38100,
    inStock: true,
    stockCount: 20,
    prime: true,
    bestSeller: true,
    dealTag: 'Save 25% · Limited time deal',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
    description: 'The first air fryer with 2 independent baskets that let you cook 2 foods, 2 ways, at the same time, without back-to-back cooking like a traditional single-basket air fryer.',
    features: [
      '2 independent 4-quart cooking baskets with Smart Finish or Match Cook feature',
      '6 versatile cooking functions: Air Fry, Air Broil, Roast, Bake, Reheat, and Dehydrate',
      'Up to 75% less fat than traditional deep frying methods',
      'Easy-to-clean baskets and dishwasher-safe crisper plates'
    ],
    specs: {
      'Capacity': '8 Quarts total (Two 4-qt baskets)',
      'Wattage': '1690 Watts',
      'Dimensions': '13.86” D x 15.63” W x 12.4” H',
      'Temperature Range': '105°F to 450°F'
    },
    colors: ['Black Matte', 'Slate Stainless'],
    reviews: [
      {
        id: 'rev-12',
        author: 'Tom Henderson',
        rating: 5,
        date: 'September 29, 2026',
        title: 'Smart Finish syncs dinner automatically',
        comment: 'Chicken tenders in basket 1 and crispy fries in basket 2 finish at the exact same second. Huge time saver for families.',
        verified: true,
        helpfulCount: 520
      }
    ]
  },
  {
    id: 'prod-smart-tv',
    title: 'Samsung 65-Inch Class OLED 4K S90D Series Smart TV (Dolby Atmos, 144Hz Gaming)',
    brand: 'Samsung',
    category: 'Electronics',
    price: 1597.99,
    listPrice: 2197.99,
    rating: 4.7,
    reviewsCount: 2950,
    inStock: true,
    stockCount: 8,
    prime: true,
    dealTag: 'Save $600 with Prime',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    description: 'Pure blacks, vibrant colors, and incredible contrast powered by Samsung OLED technology with NQ4 AI Gen2 Processor for 4K AI upscaling.',
    features: [
      'OLED Technology: Over 8 million specially engineered self-illuminating pixels',
      'NQ4 AI Gen2 Processor with 20 AI neural networks for instant 4K upscaling',
      'Motion Xcelerator 144Hz provides silky-smooth action for gaming and sports',
      'Dolby Atmos and Object Tracking Sound Lite with 40W sound output'
    ],
    specs: {
      'Screen Size': '65 Inches',
      'Resolution': '4K UHD (3,840 x 2,160)',
      'Refresh Rate': '144 Hz native',
      'HDMI Ports': '4x HDMI 2.1 (supports 4K 144Hz, eARC)'
    },
    reviews: [
      {
        id: 'rev-13',
        author: 'Kevin Zhang',
        rating: 5,
        date: 'October 15, 2026',
        title: 'Reference grade black levels and blinding highlights',
        comment: 'PS5 looks jaw dropping at 120Hz HDR. The anti-glare screen handles daytime reflections effortlessly.',
        verified: true,
        helpfulCount: 165
      }
    ]
  }
];

export const POPULAR_SEARCH_TERMS = [
  'Echo Studio',
  'Noise Canceling Headphones',
  'Kindle Paperwhite',
  'Espresso Machine',
  'iPad Air M2',
  'Mechanical Keyboard',
  'Gore-Tex Jacket',
  'Anker Power Bank'
];

export const CATEGORIES_LIST: ProductCategory[] = [
  'All',
  'Electronics',
  'Computers & Accessories',
  'Home & Kitchen',
  'Books',
  'Fashion',
  'Beauty & Care',
  'Smart Home'
];
