import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-add-product',
  templateUrl: './edit-add-product.component.html',
  styleUrls: ['./edit-add-product.component.scss']
})
export class EditAddProductComponent {
  @Input() public producto: Product;

  constructor(public activeModal: NgbActiveModal) {}
}
