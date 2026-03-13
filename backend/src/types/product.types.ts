export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface ProductQueryParams {
  search?: string;
  sort?: "price_asc" | "price_desc";
  category?: string;
  available?: string;
}
