import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Order, OrderItem } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { PaymentIntent } from 'src/app/models/paymentIntent';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  order: Order;
  user: User;
  addresses: Address[] = [];
  cart: CartItem[] = [];
  products: Product[] = [];
  checkboxes: boolean[] = [];
  selectedAddress: Address;
  total: number = 0;
  successMessage: string = '';
  errorMessage: string = '';
  pago: string = '';
  id: string = '';
  descripcion: string = '';
  orderItem: OrderItem[] = [];
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  stripeTest: FormGroup;

  constructor(private paymentService: PaymentService,
    private cartService: CartService,
    private addressService: AddressService,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private stripeService: StripeService,
    private fb: FormBuilder,) {
     }

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#dc3545',
        color: '#dc3545',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.getUser().then(async () => {
      await this.getAddresses();
      await this.getCartItems();
    });

  }

  async getUser() {
    const emailString = localStorage.getItem("email");
    const email = JSON.parse(emailString);
    if (!email) {
      this.router.navigate(['login']);
    }
    this.user = await this.userService.getUserByEmail(email);
  }

  async getCartItems() {
    this.cart = await this.cartService.getCartItems(this.user.id);
    this.cart.forEach(item => {
      this.total += item.quantity * item.product.price;
    })
  }

  async getAddresses() {
    this.addresses = await this.addressService.getUserAddresses(this.user.id)
    this.checkboxes = new Array(this.addresses.length).fill(false);
  }

  check(index: number) {
    console.log(index);
    this.checkboxes = this.checkboxes.map((state, i) => i === index);

    if (this.checkboxes[index]) {
      this.selectedAddress = this.addresses[index];
      console.log(this.selectedAddress);

    }
  }

  async createOrder() {
    if (!(this.total >= 0.50)) {
      this.errorMessage = 'El total debe ser mayor a 0.50€';
      return;
    }

    if (this.selectedAddress == null || this.selectedAddress == undefined) {
      this.errorMessage = 'Debe seleccionar una dirección';
      return;
    }

    if (this.stripeTest.invalid) {
      this.errorMessage = 'Rellene el nombre';
      return;
    }

    this.order = {
      id: 0,
      user: this.user,
      userAddress: this.selectedAddress,
      orderPayed: 0,
      total: this.total
    }
    await this.orderService.createOrder(this.order)
      .then(async (order: Order) => {
        this.cartService.deleteCartItems(this.user.id);
        this.successMessage = "Su pedido ha sido realizado"
        this.order = order;
        console.log(this.order);

      })
      .catch(() => {
        this.errorMessage = "Ha ocurrido un error";
      });
    await this.createToken(this.order)
  }


  actualizarPago(resultado: string) {
    this.pago = resultado;
  }

  confirmar(id: string, order: Order) {
    console.log(order);
debugger
    this.cart.forEach(item =>{
      const orderItem: OrderItem = {
        orderId: order,
        product: item.product
      }
      this.orderItem.push(orderItem);
    });
    this.paymentService.confirmar(id, this.orderItem)
      .then(() => {
        this.successMessage = "Pago realizado";
      })
      .catch(() => {
        this.errorMessage = "Ha ocurrido un error";
      });
  }

  cancelar(id: string) {
    this.paymentService.cancelar(id)
      .then(() => {
        this.successMessage = "Pago cancelado";
      })
      .catch(() => {
        this.errorMessage = "Ha ocurrido un error";
      });
  }

  async createToken(order?: Order) {
    const name = this.stripeTest.get('name').value;
    const result = await this.stripeService.createToken(this.card.element, { name }).toPromise();
    if (result.token) {
      const payment: PaymentIntent = {
        token: result.token.id,
        amount: this.total * 100,
        description: this.descripcion,
        currency: 'EUR'
      };

      this.paymentService.pagar(payment)
        .then((res: any) => {
          this.confirmar(res.id, order);
        });
      setTimeout(() => {
        this.router.navigate(['pedidos']);
      }, 3000);
    } else if (result.error) {
      this.errorMessage = result.error.message;
    }
  }
}
