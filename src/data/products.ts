export type ProductCategory =
  | 'Pantalons'
  | 'Tricots'
  | 'T-Shirts'
  | 'Jackets'
  | 'Boots'
  | 'Spadri'
  | 'Cuir'
  | 'Chemises';

export type ProductCondition = 'A' | 'B' | 'C';

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  price: number;
  size: string;
  condition: ProductCondition;
  isNew: boolean;
  isOneOfOne: boolean;
  isSoldOut: boolean;
  description: string;
  measurements: string;
  defects?: string;
  images: string[];
};

export const categories: ProductCategory[] = [
  'Pantalons',
  'Tricots',
  'T-Shirts',
  'Jackets',
  'Boots',
  'Spadri',
  'Cuir',
  'Chemises'
];

// Static types and categories remain
// Products data is now loaded from products.json via src/lib/db.ts

