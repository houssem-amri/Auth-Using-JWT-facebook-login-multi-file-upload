import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = 'http://localhost:3000/product';


  constructor(private httpClient: HttpClient) { }
  addProduct(product: any, image: File) {
    const formdata = new FormData();
    formdata.append('nom', product.nom);
    formdata.append('categorie', product.categorie);
    formdata.append('prix', product.prix);
    formdata.append('description', product.description);
    formdata.append('image', image);

    return this.httpClient.post<{ message: string }>(this.productUrl, formdata);
  }
  getProductById(id: any) {
    return this.httpClient.get<{ product: any }>(`${this.productUrl}/${id}`);

  }
  updateProduct(product: any) {
    return this.httpClient.put<{ message: string }>(`${this.productUrl}/${product._id}`, product);
  }
  deleteProduct(id: any) {
    return this.httpClient.delete<{ message: string }>(`${this.productUrl}/${id}`);
  }
  getAllProduct() {
    return this.httpClient.get<{ product: any }>(this.productUrl);

  }
}
