import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  async uploadImage(uploadedImage: File, productId: number): Promise<any> {
    const imageFormData = new FormData();
    imageFormData.append('productId', productId.toString());
    imageFormData.append('image', uploadedImage, uploadedImage.name);

    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);

    return this.httpClient.post(`http://localhost:8080/api/products/${productId}/fotos`, imageFormData, { headers }).toPromise();
  }

  async viewImage(idProducto: number): Promise<any[]> {

    return this.httpClient.get<any[]>('http://localhost:8080/api/products/image/info/' + idProducto).toPromise();
  }

  async deleteImage(idImagen: number): Promise<any> {
    let accessToken: string = localStorage.getItem("access_token")
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken);
    return this.httpClient.delete('http://localhost:8080/api/products/image/delete/' + idImagen).toPromise();
  }
}
