export interface Product {
  id: string
  slug: string
  name: string
  category: 'backpacks' | 'duffels' | 'luggage'
  price: number
  mrp: number
  badge?: 'NEW' | 'SALE' | 'BESTSELLER' | null
  rating: number
  reviews: number
  image: string
  hoverImage: string
  description: string
  colors: string[]
  sizes?: string[]
  features: string[]
  inStock: boolean
}

export const products: Product[] = [
  // BACKPACKS
  {
    id: 'bp-001',
    slug: 'city-commuter-pro',
    name: 'City Commuter Pro 35L',
    category: 'backpacks',
    price: 2499,
    mrp: 3999,
    badge: 'NEW',
    rating: 4.5,
    reviews: 124,
    image: 'https://picsum.photos/seed/bp001a/600/700',
    hoverImage: 'https://picsum.photos/seed/bp001b/600/700',
    description: 'The perfect urban companion. Dedicated padded laptop compartment, hidden anti-theft pockets, and ergonomic shoulder straps make this the go-to bag for daily commuters.',
    colors: ['Black', 'Navy', 'Charcoal'],
    features: ['Fits 15.6" Laptop', 'Water Repellent', 'USB Charging Port', 'Anti-Theft Pocket', 'Ergonomic Straps'],
    inStock: true,
  },
  {
    id: 'bp-002',
    slug: 'techguard-laptop-pack',
    name: 'TechGuard Laptop Pack 40L',
    category: 'backpacks',
    price: 3299,
    mrp: 4999,
    badge: null,
    rating: 4.7,
    reviews: 89,
    image: 'https://picsum.photos/seed/bp002a/600/700',
    hoverImage: 'https://picsum.photos/seed/bp002b/600/700',
    description: 'Built for the tech professional. Accommodates up to 17" laptops with padded protection, multiple organiser pockets, and a TSA-friendly layout.',
    colors: ['Black', 'Dark Grey'],
    features: ['Fits 17" Laptop', 'TSA-Friendly', 'Water Repellent', 'USB Port', 'Luggage Sleeve'],
    inStock: true,
  },
  {
    id: 'bp-003',
    slug: 'explorer-weekend',
    name: 'Explorer Weekend 45L',
    category: 'backpacks',
    price: 1899,
    mrp: 2999,
    badge: 'SALE',
    rating: 4.2,
    reviews: 67,
    image: 'https://picsum.photos/seed/bp003a/600/700',
    hoverImage: 'https://picsum.photos/seed/bp003b/600/700',
    description: 'Adventure-ready weekend bag with external frame support and modular compartments. Ideal for short treks or weekend getaways.',
    colors: ['Olive Green', 'Rust Orange', 'Navy'],
    features: ['45L Capacity', 'Rain Cover Included', 'Hip Belt', 'Multiple Compartments', 'Cruelty-Free Materials'],
    inStock: true,
  },
  {
    id: 'bp-004',
    slug: 'executive-slim-pack',
    name: 'Executive Slim Pack',
    category: 'backpacks',
    price: 2999,
    mrp: 4499,
    badge: null,
    rating: 4.8,
    reviews: 201,
    image: 'https://picsum.photos/seed/bp004a/600/700',
    hoverImage: 'https://picsum.photos/seed/bp004b/600/700',
    description: 'Slim, professional, and stylish. Designed for the modern executive who needs to carry their essentials in a bag that looks as sharp as they do.',
    colors: ['Black', 'Brown', 'Tan'],
    features: ['Premium Vegan Leather', 'Fits 15" Laptop', 'Magnetic Closure', 'Quick-Access Pockets'],
    inStock: true,
  },
  {
    id: 'bp-005',
    slug: 'street-style-daypack',
    name: 'Street Style Daypack',
    category: 'backpacks',
    price: 1599,
    mrp: 2499,
    badge: 'NEW',
    rating: 4.3,
    reviews: 45,
    image: 'https://picsum.photos/seed/bp005a/600/700',
    hoverImage: 'https://picsum.photos/seed/bp005b/600/700',
    description: 'Casual, lightweight, and street-ready. Perfect for day trips, college, or exploring the city. Available in bold colour options.',
    colors: ['Black/Red', 'Black/Blue', 'All Black'],
    features: ['Lightweight 600g', 'Padded Back Panel', 'Reflective Strips', 'Water Bottle Pockets'],
    inStock: true,
  },
  {
    id: 'bp-006',
    slug: 'hikepro-adventure',
    name: 'HikePro Adventure 55L',
    category: 'backpacks',
    price: 4499,
    mrp: 6999,
    badge: null,
    rating: 4.6,
    reviews: 156,
    image: 'https://picsum.photos/seed/bp006a/600/700',
    hoverImage: 'https://picsum.photos/seed/bp006b/600/700',
    description: 'Serious gear for serious adventurers. The HikePro 55L features an aluminium frame, ventilated back panel, and waterproof base — built to handle the toughest trails.',
    colors: ['Forest Green', 'Navy', 'Black'],
    features: ['55L Capacity', 'Aluminium Frame', 'Waterproof Base', 'Hip & Chest Straps', 'Rain Cover'],
    inStock: true,
  },

  // DUFFELS
  {
    id: 'df-001',
    slug: 'urban-weekend-duffel',
    name: 'Urban Weekend Duffel',
    category: 'duffels',
    price: 2199,
    mrp: 3499,
    badge: null,
    rating: 4.4,
    reviews: 78,
    image: 'https://picsum.photos/seed/df001a/600/700',
    hoverImage: 'https://picsum.photos/seed/df001b/600/700',
    description: 'Your weekend, your style. The Urban Weekend Duffel offers a spacious main compartment, separate shoe pocket, and premium canvas construction for the discerning traveller.',
    colors: ['Black', 'Tan', 'Olive'],
    features: ['Separate Shoe Compartment', 'Detachable Shoulder Strap', 'Water Repellent Canvas', 'Interior Pockets'],
    inStock: true,
  },
  {
    id: 'df-002',
    slug: 'flexfit-gym-bag',
    name: 'FlexFit Gym Bag',
    category: 'duffels',
    price: 1799,
    mrp: 2799,
    badge: 'NEW',
    rating: 4.5,
    reviews: 93,
    image: 'https://picsum.photos/seed/df002a/600/700',
    hoverImage: 'https://picsum.photos/seed/df002b/600/700',
    description: 'From gym to street. The FlexFit features ventilated side pockets, a wet/dry compartment, and bold colorways that stand out in any locker room.',
    colors: ['Black/Red', 'Grey/Blue', 'All Black'],
    features: ['Ventilated Pocket', 'Wet/Dry Compartment', 'Padded Handles', 'Reflective Details'],
    inStock: true,
  },
  {
    id: 'df-003',
    slug: 'voyager-travel-duffel',
    name: 'Voyager Travel Duffel XL',
    category: 'duffels',
    price: 3499,
    mrp: 4999,
    badge: null,
    rating: 4.7,
    reviews: 112,
    image: 'https://picsum.photos/seed/df003a/600/700',
    hoverImage: 'https://picsum.photos/seed/df003b/600/700',
    description: 'Designed for long trips. The Voyager XL features a full-width opening, TSA lock compatible zipper pockets, and convertible shoulder straps that transform into backpack straps.',
    colors: ['Navy', 'Black', 'Forest Green'],
    features: ['Convertible Backpack Straps', 'TSA Lock Pocket', 'Padded Base', 'Carry-On Compatible'],
    inStock: true,
  },
  {
    id: 'df-004',
    slug: 'foldaway-duffel',
    name: 'FoldAway Duffel',
    category: 'duffels',
    price: 1299,
    mrp: 1999,
    badge: 'SALE',
    rating: 4.0,
    reviews: 34,
    image: 'https://picsum.photos/seed/df004a/600/700',
    hoverImage: 'https://picsum.photos/seed/df004b/600/700',
    description: 'The perfect travel companion that fits in your suitcase. The FoldAway Duffel compresses into its own pocket and expands to a full 40L bag in seconds.',
    colors: ['Black', 'Navy', 'Teal'],
    features: ['Folds Into Own Pocket', '40L When Expanded', 'Lightweight 350g', 'Ripstop Nylon'],
    inStock: true,
  },

  // LUGGAGE
  {
    id: 'lg-001',
    slug: 'aeroglide-cabin',
    name: 'AeroGlide Cabin 20"',
    category: 'luggage',
    price: 5999,
    mrp: 8999,
    badge: null,
    rating: 4.6,
    reviews: 187,
    image: 'https://picsum.photos/seed/lg001a/600/700',
    hoverImage: 'https://picsum.photos/seed/lg001b/600/700',
    description: 'Lightweight cabin luggage with 360° spinner wheels and a TSA-approved combination lock. Fits in all major airline overhead bins.',
    colors: ['Black', 'Navy', 'Silver'],
    sizes: ['20"'],
    features: ['360° Spinner Wheels', 'TSA Lock', 'Expandable', 'Polycarbonate Shell', 'Airline Approved'],
    inStock: true,
  },
  {
    id: 'lg-002',
    slug: 'aeroglide-medium',
    name: 'AeroGlide Medium 24"',
    category: 'luggage',
    price: 7499,
    mrp: 10999,
    badge: 'BESTSELLER',
    rating: 4.8,
    reviews: 324,
    image: 'https://picsum.photos/seed/lg002a/600/700',
    hoverImage: 'https://picsum.photos/seed/lg002b/600/700',
    description: 'Our best-selling medium suitcase. Perfect for trips up to 10 days. The AeroGlide 24" combines lightweight polycarbonate shell with smooth silent spinner wheels.',
    colors: ['Black', 'Navy', 'Rose Gold', 'Silver'],
    sizes: ['24"'],
    features: ['360° Spinner Wheels', 'TSA Lock', 'Expandable +20%', 'Polycarbonate Shell', 'Interior Divider'],
    inStock: true,
  },
  {
    id: 'lg-003',
    slug: 'aeroglide-large',
    name: 'AeroGlide Large 28"',
    category: 'luggage',
    price: 8999,
    mrp: 12999,
    badge: null,
    rating: 4.5,
    reviews: 145,
    image: 'https://picsum.photos/seed/lg003a/600/700',
    hoverImage: 'https://picsum.photos/seed/lg003b/600/700',
    description: 'Maximum capacity for the extended traveller. Generous 110L capacity with dual compression straps and a dedicated laundry bag.',
    colors: ['Black', 'Navy', 'Silver'],
    sizes: ['28"'],
    features: ['110L Capacity', '360° Spinner Wheels', 'TSA Lock', 'Dual Compression Straps', 'Laundry Bag'],
    inStock: true,
  },
  {
    id: 'lg-004',
    slug: 'travelset-combo',
    name: 'TravelSet Combo 20"+28"',
    category: 'luggage',
    price: 13999,
    mrp: 18999,
    badge: 'SALE',
    rating: 4.9,
    reviews: 256,
    image: 'https://picsum.photos/seed/lg004a/600/700',
    hoverImage: 'https://picsum.photos/seed/lg004b/600/700',
    description: 'The complete travel solution. Our best-value combo includes the AeroGlide Cabin 20" and AeroGlide Large 28" as a matching set at an unbeatable price.',
    colors: ['Black Set', 'Navy Set'],
    sizes: ['20"', '28"'],
    features: ['2-Piece Set', 'Matching Design', '360° Spinner Wheels', 'TSA Lock on Both', 'Save ₹5,000'],
    inStock: true,
  },
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}

export const categories = [
  {
    name: 'Backpacks',
    slug: 'backpacks',
    description: 'From daily commuters to weekend explorers',
    image: 'https://picsum.photos/seed/cat-backpack/800/600',
    count: 6,
  },
  {
    name: 'Duffel Bags',
    slug: 'duffels',
    description: 'Gym, travel, and everything in between',
    image: 'https://picsum.photos/seed/cat-duffel/800/600',
    count: 4,
  },
  {
    name: 'Luggage',
    slug: 'luggage',
    description: 'Sleek trolleys for every journey',
    image: 'https://picsum.photos/seed/cat-luggage/800/600',
    count: 4,
  },
  {
    name: 'Corporate Gifting',
    slug: 'corporate-gifting',
    description: 'Bespoke gifting solutions for your team',
    image: 'https://picsum.photos/seed/cat-corporate/800/600',
    count: 0,
  },
]
