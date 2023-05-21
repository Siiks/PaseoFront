import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit, OnDestroy  {

  productoEnCarrito: number = 0;
  precioProductoEnCarrito: string = '0.00';
  private updateSubscription: Subscription;

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly cartItemService: CartService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.esAdministrador();
    this.getCartItems();
    this.subscribeToUpdateNotification();
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

  esAdministrador(): boolean {
    return localStorage.getItem('roles')?.includes("ADMIN") || false;
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('roles');
    localStorage.removeItem('email');
    this.router.navigate(['']);
    window.location.reload();
  }

  async getCartItems() {
    const emailString = localStorage.getItem("email");
    if (!emailString) {
      return;
    }
    const email = JSON.parse(emailString);
    const user = await this.userService.getUserByEmail(email);
    const carrito = await this.cartItemService.getCartItems(user.id);

    let totalQuantity = 0;
    let totalPrice = 0;

    carrito.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.product.price;
    });

    this.productoEnCarrito = totalQuantity;
    this.precioProductoEnCarrito = totalPrice.toFixed(2);
  }

  private subscribeToUpdateNotification() {
    this.updateSubscription = this.sharedService.updateNotification$.subscribe(() => {
      this.getCartItems().then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        this.cdr.detectChanges();
      });
    });
  }
}
