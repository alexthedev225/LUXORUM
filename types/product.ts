// types/product.ts
import type { IProduct } from "@/models/Product";


export interface ProductWithId extends IProduct {
  _id: string;
}
