import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://localhost:8080/api/orders'

  constructor(private http: HttpClient) { }

  async createOrder(order: Order): Promise<Order> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<Order>(this.url, order, { headers }).toPromise();
  }
}
