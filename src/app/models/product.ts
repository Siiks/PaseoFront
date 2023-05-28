import { Category } from "./category";

export interface Product {
  id: number;
  category: Category;
  name: string;
  description: string;
  price: number;
  inventoryQuantity: number;
  fotos: any[];

}

export interface ProductDto {
  id: number;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  inventoryQuantity: number;
}
