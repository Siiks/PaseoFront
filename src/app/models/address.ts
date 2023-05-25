import { User } from "./user";

export class Address {
  id: number;
  user: User;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
}
