import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:8080/api/products'

  constructor(private http: HttpClient) { }

  async getProductos(page: number, size: number = 10, idCategoria?: number, nombre?: string): Promise<Array<Product>> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    if (idCategoria) {
      url += `&idCategoria=${idCategoria}`;
    }
    if (nombre) {
      url += `&nombre=${nombre}`;
    }
    return this.http.get<Array<Product>>(url).toPromise();
  }

  async addProduct(product: ProductDto): Promise<number> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<any>(`${this.apiUrl}/add`, product, { headers }).toPromise();

  }

  async editProduct(product: ProductDto): Promise<ProductDto> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.put<any>(`${this.apiUrl}/update`, product, { headers }).toPromise();
  }

  async deleteProduct(product: ProductDto): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.delete(`${this.apiUrl}/${product.id}`, { headers }).toPromise();
  }
}
