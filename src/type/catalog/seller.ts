export interface Seller {
  id: string;
  name: string;
  logo: string;
  cover: string;
  verified: boolean;
  rating: number;
  productsCount: number;
  location: string;
  joinedYear: number;
  followersCount: number;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
  reply: string | null;
}
