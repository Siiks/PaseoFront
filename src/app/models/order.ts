import { Address } from "./address";
import { Product } from "./product";
import { User } from "./user";

export interface Order {
  id?: number;
  user: User;
  total: number;
  orderStatus?: string;
  orderDate?: Date;
  userAddress: Address;
  orderPayed: number;
}

export interface OrderItem {
  quantity?: any;
  id?: number;
  orderId: Order;
  product: Product;
}

export interface orderProducts {
  order: Order;
  product: Product[];
}
