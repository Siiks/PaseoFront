import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl: string = 'http://localhost:8080/api/cartItems'

  constructor(private http: HttpClient) { }

  async getCartItems(idUsuario: number): Promise<CartItem[]> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.get<CartItem[]>(`${this.apiUrl}`, { headers }).toPromise()
  }

  async addCartItem(cartItem: CartItem): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post(`${this.apiUrl}`, cartItem, { headers }).toPromise()
  }

  async deleteCartItem(idCartItem: number): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.delete(`${this.apiUrl}/${idCartItem}`, { headers }).toPromise()
  }

  async editCartItem(cartItem: CartItem[]): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.put(`${this.apiUrl}/edit`, cartItem, { headers }).toPromise()
  }

  async deleteCartItems(userId: number): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.delete(`${this.apiUrl}/user/${userId}`, { headers }).toPromise()
  }
}
