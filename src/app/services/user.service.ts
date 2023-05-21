import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient) { }

  async getUsers(page: number, size: number = 10): Promise<Array<User>> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.get<Array<User>>(`${this.apiUrl}?page=${page}&size=${size}`, { headers }).toPromise();
  }

  async addUser(user: RegisterRequest): Promise<User> {
    return this.http.post<User>(`http://localhost:8080/api/v1/auth/register`, user).toPromise();

  }

  async editUser(user: User): Promise<User> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.put<User>(`${this.apiUrl}/update/${user.id}`, user, { headers }).toPromise();
  }

  async deleteUser(user: User): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.delete(`${this.apiUrl}/${user.id}`, { headers }).toPromise();
  }

  async getUserById(idUser: number): Promise<User> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.get<User>(`${this.apiUrl}/${idUser}`, { headers }).toPromise();
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.get<User>(`${this.apiUrl}/email/${userEmail}`, { headers }).toPromise();
  }
}
