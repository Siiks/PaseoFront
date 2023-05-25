import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntent } from '../models/paymentIntent';
import { OrderItem } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = 'http://localhost:8080/api/payment'

  constructor(private http: HttpClient) { }

  async confirmar(id: string, order: OrderItem[]): Promise<string> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<string>(`${this.url}/confirm/${id}`, order, { headers }).toPromise();
  }

  async cancelar(id: string): Promise<string> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<string>(`${this.url}/cancel/${id}`, { headers }).toPromise();
  }

  async pagar(payment: PaymentIntent): Promise<string> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<string>(`${this.url}/pay`, payment, { headers }).toPromise();
  }
}
