
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  sizes?: string[];
  description: string;
  brand?: string;
  rating?: number;
  inStock: boolean;
}
