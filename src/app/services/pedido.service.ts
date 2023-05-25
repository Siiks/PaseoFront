import { Injectable } from '@angular/core';
import { OrderItem } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/api/orderItems';

  async getOrderItems(id: number): Promise<OrderItem[]> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.get<OrderItem[]>(`${this.url}/${id}`, { headers }).toPromise();
  }
}
