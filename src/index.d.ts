export interface UserInterface {
  basket: {
    items: ProductInterface;
    totalCount: number;
    totalPrice: number;
  };
  currency: string;
}

export interface ProductInterface {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
  count?: number;
}
