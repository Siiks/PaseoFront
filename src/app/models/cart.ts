import { Product } from "./product";
import { User } from "./user";

export class CartItem {
  id: number;
  user: User;
  product: Product;
  quantity: number;
}
