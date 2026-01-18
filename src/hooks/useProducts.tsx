import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
  category_id: string;
  images: string[];
  sizes: string[];
  colors: string[] | null;
  description: string | null;
  is_active: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  sale_price: number | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryId: string;
  images: string[];
  sizes: string[];
  colors?: string[];
  description?: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  salePrice?: number;
  createdAt: string;
}

export const useProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      // Fetch active products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      const cats = categoriesData || [];
      setCategories(cats);
      
      // Transform products to match the expected format
      const transformedProducts: Product[] = (productsData || []).map((p: DbProduct) => {
        const category = cats.find(c => c.id === p.category_id);
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          category: category?.name.toLowerCase() || 'uncategorized',
          categoryId: p.category_id,
          images: p.images,
          sizes: p.sizes,
          colors: p.colors || undefined,
          description: p.description || undefined,
          isNewArrival: p.is_new_arrival,
          isBestSeller: p.is_best_seller,
          isOnSale: p.is_on_sale,
          salePrice: p.sale_price || undefined,
          createdAt: p.created_at,
        };
      });
      
      setProducts(transformedProducts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const formattedCategories = useMemo(() => {
    return categories.map(c => ({
      id: c.name.toLowerCase(),
      name: c.name,
      description: c.description || `${c.name} collection`,
      dbId: c.id,
    }));
  }, [categories]);

  // Collection filters
  const newArrivals = useMemo(() => 
    products.filter(p => p.isNewArrival), [products]);
  
  const bestSellers = useMemo(() => 
    products.filter(p => p.isBestSeller), [products]);
  
  const saleProducts = useMemo(() => 
    products.filter(p => p.isOnSale), [products]);

  return {
    products,
    categories: formattedCategories,
    loading,
    newArrivals,
    bestSellers,
    saleProducts,
  };
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};