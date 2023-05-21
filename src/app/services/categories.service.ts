import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrl: string = 'http://localhost:8080/api/categories'

  constructor(private http: HttpClient) { }

  async getCategories(page: number, size: number): Promise<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}?page=${page}&size=${size}`).toPromise()
  }

  async deleteCategory(category: Category): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.delete(`${this.apiUrl}/${category.id}`, { headers }).toPromise()
  }


  async addCategory(category: Category): Promise<Category> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<Category>(`${this.apiUrl}/add`, category, { headers }).toPromise();

  }

  async editCategory(category: Category): Promise<Category> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category, { headers }).toPromise();
  }
}
