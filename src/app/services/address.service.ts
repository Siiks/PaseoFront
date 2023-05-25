import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AriaDescriber } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:8080/api/user-addresses'

  async getUserAddresses(id: number): Promise<Address[]> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.get<Address[]>(`${this.apiUrl}/address/${id}`, { headers }).toPromise();
  }

  async deleteUserAddress(id: number): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).toPromise();
  }

  async addAddress(address: Address): Promise<Address> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.post<Address>(`${this.apiUrl}`, address, { headers }).toPromise();
  }

  async editAddress(address: Address): Promise<Address> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.http.put<Address>(`${this.apiUrl}/${address.id}`, address, { headers }).toPromise();
  }
}
