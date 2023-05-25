import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { AddEditDireccionComponent } from './add-edit-direccion/add-edit-direccion.component';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  addresses: Address[] = []
  user: User;
  constructor(private userService: UserService,
    private modalService: NgbModal,
    private readonly addressService: AddressService) { }

  ngOnInit() {
    this.getAdresses();
  }

  async getAdresses() {
    const emailString = localStorage.getItem("email");
    const email = JSON.parse(emailString);
    this.user = await this.userService.getUserByEmail(email);
    this.addresses = await this.addressService.getUserAddresses(this.user.id);
  }

  deleteAddress(addressId: number) {
    this.addressService.deleteUserAddress(addressId)
      .then(() => {
        this.getAdresses();
        this.successMessage = 'Dirección eliminada';
      })
      .catch(() => {
        this.errorMessage = 'Error al eliminar la dirección';
      })
  }

  openModal(address?: Address) {
    const modalRef = this.modalService.open(AddEditDireccionComponent, {size: 'lg'});
    console.log();

    modalRef.componentInstance.address = address;
    modalRef.componentInstance.user = this.user;
    modalRef.result
    .then((result) => {
      if(!result) {
        this.getAdresses();
      }
    })

  }
}
