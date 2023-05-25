import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Support } from '../models/support';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  apiUrl = 'http://localhost:8080/api/support'

  constructor(private http: HttpClient) { }

  async postMessage(message: Support): Promise<any> {
    return this.http.post<Support>(this.apiUrl, message).toPromise();
  }
}
