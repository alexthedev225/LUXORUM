// types.ts

export interface ProductCategory {
  _id: string;
  name: string;
}

export interface ProductSpecifications {
  materials?: string;
  finish?: string;
  certificate?: string;
  additionalDetails?: string[];
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: ProductCategory | string;
  specifications?: ProductSpecifications;
}

export interface Category {
  _id: string;
  name: string;
}
