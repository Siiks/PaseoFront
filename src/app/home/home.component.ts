import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  productos: Product[] = [];
  carouselOptions = {
    items: 1,
    dots: true,
    nav: true
  };
  cartItems: CartItem[] = [];
  cartItem: CartItem;
  productoEnCarrito: number = 0;
  precioProductoEnCarrito: number = 0;
  constructor(private productService: ProductService,
    private readonly authService: AuthService,
    private readonly cartItemService: CartService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly sharedService: SharedService) {
    this.cartItem = {
      id: 0,
      product: null,
      user: null,
      quantity: 1
    }
  }
  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      10001: {
        items: 2
      }
    },
  }

  ngOnInit(): void {
    this.getProductos();
  }

  async getProductos() {
    await this.productService.getProductos(0, 8)
      .then((result: any) => {
        this.productos = result.content;
        console.log(result.content);

      });
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

}
