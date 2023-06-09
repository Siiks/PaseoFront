import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  userId: number;
  subtotal: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private cartItemsService: CartService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  async getCartItems() {
    this.subtotal = 0;
    const emailString = localStorage.getItem("email");
    const email = JSON.parse(emailString);
    if (!email) {
      this.router.navigate(['login']);
    }
    await this.userService.getUserByEmail(email)
      .then(res => {
        this.userId = res.id;
      })
      .catch(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
      });
    this.cartItems = await this.cartItemsService.getCartItems(this.userId);
    this.cartItems.forEach(item => {
      this.subtotal += item.quantity * item.product.price
    })
  }

  async deleteCartItems(idCartItem: number) {
    this.successMessage = undefined;
    this.cartItemsService.deleteCartItem(idCartItem).then(async () => {
      this.successMessage = "El producto se ha borrado con éxito"
      await this.getCartItems();
    });
  }

  async updateCartItems(cartItem: CartItem[]) {
    this.successMessage = undefined;
    this.cartItemsService.editCartItem(cartItem)
      .then(() => {
        this.successMessage = "El carrito se ha actualizado con éxito"
        this.getCartItems();
      })
  }
  incrementQuantity(item: CartItem) {
    item.quantity += 1;
  }

  decrementQuantity(item: CartItem) {
    item.quantity -= 1;
  }
}
