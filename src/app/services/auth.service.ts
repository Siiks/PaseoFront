import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationRequest, AuthenticationResponse, RegisterRequest } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:8080/api/v1/auth'

  async login(auth: AuthenticationRequest): Promise<AuthenticationResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    const body = auth;

    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, body, { headers }).toPromise();
  }

  async register(auth: RegisterRequest): Promise<AuthenticationResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    const body = auth;

    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, body, { headers }).toPromise();
  }
}
