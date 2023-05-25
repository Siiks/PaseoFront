import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { SharedService } from '../services/shared.service';
import { CartItem } from '../models/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  idProducto: number = 0;
  product: Product;
  cartItem: CartItem;
  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly cartItemService: CartService,
    private readonly sharedService: SharedService) {
    this.idProducto = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.cartItem = {
      id: null,
      product: null,
      quantity: 1,
      user: null
    }
  }

  ngOnInit(): void {
    this.getProducto();
  }

  async getProducto() {
    this.productService.getProductoById(this.idProducto)
      .then(producto => {
        this.product = producto;
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
    this.cartItemService.addCartItem(this.cartItem);
    this.sharedService.triggerUpdate();
  }
}
