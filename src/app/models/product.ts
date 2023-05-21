import { Category } from "./category";

export class Product {
  id: number;
  category: Category;
  name: string;
  description: string;
  price: number;
  inventoryQuantity: number;
  fotos: any[];
}

export class ProductDto {
  id: number;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  inventoryQuantity: number;
}
