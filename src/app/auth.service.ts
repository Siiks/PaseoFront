import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationRequest, AuthenticationResponse } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:8080/api/v1/auth'

  login(auth: AuthenticationRequest): Promise<AuthenticationResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Headers', 'Content-Type');

    const body = auth;
    
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, body, {headers}).toPromise();
  }
  
  
}
