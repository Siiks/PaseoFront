import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ProductService } from '../services/product.service';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  categorias: Category[] = [];
  productos: Product[] = [];
  page: number = 0;
  totalPages: number = 0;
  size: number = 5;
  currentPage: number = 0;
  numberOfElements: number = 0;
  buscar: string = '';
  constructor(private readonly categoryService: CategoriesService,
    private readonly productService: ProductService){}

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
  }
  async getDatos() {
    await this.getCategorias();
    await this.getProductos();
  }
  async getCategorias(){
    this.categoryService.getCategories(0, 100).then((res: any) => {
      this.categorias = res.content;
    });
  }

  async getProductos(categoria?: number){
    console.log(this.buscar);

    this.productService.getProductos(0, 9, categoria, this.buscar).then((res: any) => {
      this.productos = res.content;
      this.totalPages = res.totalPages;
      this.currentPage = res.number+1;
      this.numberOfElements = res.totalElements;
      console.log(res);

    });
    }

  changePage(page): void {
    this.page = page.innerText;
    this.getProductos();
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
