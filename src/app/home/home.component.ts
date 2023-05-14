import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  productos: Product[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
   this.getProductos();
  }

 async getProductos () {
  await this.productService.getProductos(0, 8).then((result: any) => {
    this.productos = result.content;
  });
  }

}
