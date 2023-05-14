import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:8080/api/products'

  constructor(private http: HttpClient) { }

  async getProductos(page: number, size: number = 10): Promise<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.apiUrl}?page=${page}&size=${size}`).toPromise();
  }
}
