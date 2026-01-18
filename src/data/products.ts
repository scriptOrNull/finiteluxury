import productShirtBlack from '@/assets/product-shirt-black.jpg';
import productShirtWhite from '@/assets/product-shirt-white.jpg';
import productSlidesWhite from '@/assets/product-slides-white.jpg';
import productSneakersWhite from '@/assets/product-sneakers-white.jpg';
import productPerfumeNoir from '@/assets/product-perfume-noir.jpg';
import productTopBlack from '@/assets/product-top-black.jpg';
import productCapBlack from '@/assets/product-cap-black.jpg';
import productShoesBlack from '@/assets/product-shoes-black.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  images: string[]; // Add multiple images: [mainImage, image2, image3, ...]
  sizes: string[];
  colors?: string[];
  description?: string;
}

/**
 * HOW TO ADD NEW CATEGORIES:
 * 1. Add the category object to the 'categories' array below
 * 2. The CategoryId type will automatically update
 * 3. Add products with the new category id
 * 
 * Example:
 * { id: 'watches', name: 'Watches', description: 'Luxury timepieces for men' }
 */

export const products: Product[] = [
  // Shirts
  {
    id: 'shirt-001',
    name: 'Black Oxford Shirt',
    price: 25000,
    category: 'shirts',
    images: [productShirtBlack],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    description: 'Classic oxford shirt in premium cotton.'
  },
  {
    id: 'shirt-002',
    name: 'White Linen Shirt',
    price: 28000,
    category: 'shirts',
    images: [productShirtWhite],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White'],
    description: 'Breathable linen for warm days.'
  },
  {
    id: 'shirt-003',
    name: 'Charcoal Dress Shirt',
    price: 32000,
    category: 'shirts',
    images: [productShirtBlack],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal'],
    description: 'Sophisticated slim-fit dress shirt.'
  },
  // Tops
  {
    id: 'top-001',
    name: 'Minimal Tank Top',
    price: 12000,
    category: 'tops',
    images: [productTopBlack],
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Black'],
    description: 'Essential layering piece.'
  },
  {
    id: 'top-002',
    name: 'Oversized Tee',
    price: 15000,
    category: 'tops',
    images: [productTopBlack],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    description: 'Relaxed fit premium cotton tee.'
  },
  {
    id: 'top-003',
    name: 'Ribbed Long Sleeve',
    price: 18000,
    category: 'tops',
    images: [productTopBlack],
    sizes: ['S', 'M', 'L'],
    colors: ['Grey'],
    description: 'Textured ribbed knit top.'
  },
  // Slides
  {
    id: 'slide-001',
    name: 'White Leather Slides',
    price: 18000,
    category: 'slides',
    images: [productSlidesWhite],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['White'],
    description: 'Minimalist leather slides.'
  },
  {
    id: 'slide-002',
    name: 'Black Pool Slides',
    price: 14000,
    category: 'slides',
    images: [productSlidesWhite],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['Black'],
    description: 'Comfortable everyday slides.'
  },
  // Shoes
  {
    id: 'shoe-001',
    name: 'Black Derby Shoes',
    price: 45000,
    category: 'shoes',
    images: [productShoesBlack],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Black'],
    description: 'Classic leather derby shoes.'
  },
  {
    id: 'shoe-002',
    name: 'White Minimalist Sneakers',
    price: 38000,
    category: 'shoes',
    images: [productSneakersWhite],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['White'],
    description: 'Clean design leather sneakers.'
  },
  {
    id: 'shoe-003',
    name: 'Grey Suede Loafers',
    price: 42000,
    category: 'shoes',
    images: [productShoesBlack],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Grey'],
    description: 'Elegant suede loafers.'
  },
  // Caps
  {
    id: 'cap-001',
    name: 'Black Baseball Cap',
    price: 8000,
    category: 'caps',
    images: [productCapBlack],
    sizes: ['One Size'],
    colors: ['Black'],
    description: 'Classic cotton baseball cap.'
  },
  {
    id: 'cap-002',
    name: 'White Dad Cap',
    price: 8500,
    category: 'caps',
    images: [productCapBlack],
    sizes: ['One Size'],
    colors: ['White'],
    description: 'Relaxed fit cotton cap.'
  },
  // Perfume
  {
    id: 'perfume-001',
    name: 'Noir Essence',
    price: 55000,
    category: 'perfume',
    images: [productPerfumeNoir],
    sizes: ['50ml', '100ml'],
    description: 'Deep woody fragrance with amber notes.'
  },
  {
    id: 'perfume-002',
    name: 'Blanc Signature',
    price: 48000,
    category: 'perfume',
    images: [productPerfumeNoir],
    sizes: ['50ml', '100ml'],
    description: 'Fresh citrus and white musk.'
  },
];

/**
 * CATEGORIES - Add new categories here
 * The category id becomes available for products automatically
 */
export const categories = [
  { id: 'shirts', name: 'Shirts', description: 'Premium tailored shirts for the modern gentleman' },
  { id: 'tops', name: 'Tops', description: 'Essential everyday pieces for men' },
  { id: 'slides', name: 'Slides', description: 'Comfort meets masculine style' },
  { id: 'shoes', name: 'Shoes', description: 'Refined footwear for distinguished men' },
  { id: 'caps', name: 'Caps', description: 'Finishing touches for the modern man' },
  { id: 'perfume', name: 'Perfume', description: 'Signature scents for men' },
  // Add more categories here, e.g.:
  // { id: 'watches', name: 'Watches', description: 'Luxury timepieces for men' },
  // { id: 'bags', name: 'Bags', description: 'Premium leather bags and accessories' },
] as const;

export type CategoryId = typeof categories[number]['id'];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};
