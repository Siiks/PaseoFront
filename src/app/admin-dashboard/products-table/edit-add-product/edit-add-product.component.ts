import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductDto } from 'src/app/models/product';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-edit-add-product',
  templateUrl: './edit-add-product.component.html',
  styleUrls: ['./edit-add-product.component.scss']
})
export class EditAddProductComponent implements OnInit {
  @Input() public producto: ProductDto;
  title: string = '';
  productId: number = 0;
  myForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private readonly productoService: ProductService) {
    this.myForm = this.formBuilder.group({
      // Define your form controls here
      name: ['', Validators.required],
      description: ['', Validators.required],
      idCategory: [0, Validators.required],
      cantidad: [0, Validators.required],
      price: [0, Validators.required],

      // Add more form controls as needed
    });
    this.producto = {
      description: '',
      id: 0,
      idCategory: 0,
      inventoryQuantity: 0,
      name: '',
      price: 0
    }
   }

  ngOnInit(): void {
    if(this.producto){
      this.title = "Editar producto"
    }
    this.title = "Añadir producto"
  }

  async saveProduct() {
    if (!this.producto) {
      this.producto = {
        id: 0,
        description: this.myForm.controls['description'].value,
        idCategory: this.myForm.controls['idCategory'].value,
        inventoryQuantity: this.myForm.controls['inventoryQuantity'].value,
        name: this.myForm.controls['name'].value,
        price: this.myForm.controls['price'].value
      }
      this.productoService.addProduct(this.producto).then(result => {
        this.productId = result;
      });
      console.log(this.producto);
    } else {
      this.productoService.editProduct(this.producto).then((result: ProductDto) => {
        this.productId = result.id;
      })
      this.title = "Editar producto"
    }
  }
}
