import { Category } from "./category";

export class Product {
    id: number;
    category: Category;
    name: string;
    description: string;
    price: number;
    inventoryQuantity: number;
  }
