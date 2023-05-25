import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem, orderProducts } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

  user: User;
  pedidos: OrderItem[] = [];
  productos: orderProducts[] = [];

  constructor(private userService: UserService,
    private modalService: NgbModal,
    private readonly pedidosService: PedidoService) { }

  ngOnInit() {
    this.getDatos();
  }

  async getDatos() {
    const emailString = localStorage.getItem("email");
    const email = JSON.parse(emailString);
    this.user = await this.userService.getUserByEmail(email);
    const allOrderItems = await this.pedidosService.getOrderItems(this.user.id);

    // Agrupar los pedidos por el order.id y los productos
    const groupedPedidos = this.groupPedidos(allOrderItems);

    this.productos = Array.from(groupedPedidos.values()).filter(order => {
      return order.product.length > 0 && order.product.every(product => typeof product === 'object');
    });
    console.log(this.productos);

  }

  groupPedidos(orderItems: OrderItem[]): Map<string, orderProducts> {
    const groupedMap = new Map<string, orderProducts>();

    for (const orderItem of orderItems) {
      if (orderItem && orderItem.order && orderItem.order.id !== undefined) {
        const key = orderItem.order.id.toString();

        if (groupedMap.has(key)) {
          const existingOrder = groupedMap.get(key);
          existingOrder.product.push(orderItem.product);
        } else {
          const newOrder: orderProducts = {
            order: orderItem.order,
            product: [orderItem.product]
          };
          groupedMap.set(key, newOrder);
        }
      }
    }

    return groupedMap;
  }
}
