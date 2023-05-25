import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-direccion',
  templateUrl: './add-edit-direccion.component.html',
  styleUrls: ['./add-edit-direccion.component.scss']
})
export class AddEditDireccionComponent implements OnInit {

  @Input() address: Address;
  @Input() user: User;
  successMessage: string = '';
  errorMessage: string = '';
  title: string = '';
  myForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly addressService: AddressService) {

    this.myForm = this.formBuilder.group({
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.address) {
      this.title = "Editar dirección";
    } else {
      this.title = "Agregar dirección";
      this.address = {
        id: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        country: null,
        postalCode: null,
        user: null,
      }
    }
  }

  addAddress() {
    if (!this.myForm.invalid) {
      if (!this.address.id) {
        this.address.user = this.user;
        this.addressService.addAddress(this.address)
          .then(() => {
            this.addressService.getUserAddresses(this.user.id);
            this.activeModal.close();
          });
      } else {
        this.addressService.editAddress(this.address)
          .then(() => {
            this.addressService.getUserAddresses(this.user.id);
            this.activeModal.close();
          });
      }
    } else {
      this.errorMessage = "Por favor complete todos los campos";
    }
  }


}
