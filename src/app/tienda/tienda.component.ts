import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ProductService } from '../services/product.service';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { CartItem } from '../models/cart';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SharedService } from '../services/shared.service';

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
  cartItem: CartItem;
  constructor(private readonly categoryService: CategoriesService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly cartItemService: CartService,
    private readonly sharedService: SharedService) {
    this.cartItem = {
      id: 0,
      product: null,
      user: null,
      quantity: 1
    }
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
  }
  async getDatos() {
    await this.getCategorias();
    await this.getProductos();
  }
  async getCategorias() {
    this.categoryService.getCategories(0, 100).then((res: any) => {
      this.categorias = res.content;
    });
  }

  async getProductos(categoria?: number, page?: number) {

    this.productService.getProductos(page, 9, categoria, this.buscar).then((res: any) => {
      this.productos = res.content;
      this.totalPages = res.totalPages;
      this.currentPage = res.number + 1;
      this.numberOfElements = res.totalElements;
      console.log(res);

    });
  }

  changePage(page): void {
    console.log(page.innerText);

    this.getProductos(null, page.innerText - 1);
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  async addCartItem(product: Product) {
    const emailString = localStorage.getItem("email");
    const email = JSON.parse(emailString);
    if (!email) {
      this.router.navigate(['login']);
    }
    const user = await this.userService.getUserByEmail(email);
    this.cartItem.user = user;
    this.cartItem.product = product;
    this.cartItem.quantity = 1;
    this.cartItemService.addCartItem(this.cartItem);
    this.sharedService.triggerUpdate();
  }

  async getProduct(id: number) {
    this.router.navigate(['product/' + id]);
  }
}
