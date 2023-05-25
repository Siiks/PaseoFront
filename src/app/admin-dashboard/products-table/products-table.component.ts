import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { EditAddProductComponent } from './edit-add-product/edit-add-product.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {

  productos: Product[] = [];
  page: number = 0;
  totalPages: number = 0;
  size: number = 5;
  currentPage: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private productService: ProductService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    this.getProductos();
    this.getPageNumbers();
  }

  async getProductos () {
    await this.productService.getProductos(this.page-1, this.size).then((result: any) => {
      this.productos = result.content;
      this.totalPages = result.totalPages;
      this.currentPage = result.pageable.pageNumber+1;

    });
  }

  changePage(page): void {
    this.page = page.innerText;
    this.getProductos();
  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  openModal(product?: Product) {
    const modalRef = this.modalService.open(EditAddProductComponent, {size: 'lg'});
    modalRef.componentInstance.producto = product;
    modalRef.result.then((result) => {
      if(!result) {
        this.getProductos();
      }
    })
  }

  openDeleteModal(product: any) {
    let modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.result.then(result => {
      if(result) {
        this.productService.deleteProduct(product).then(async () => {
          this.successMessage = "Se ha borrado el producto con exito";
          await this.getProductos();
        })
        .catch(error => {
          this.errorMessage = error.message;
        })
        }
      })
      modalRef = null;
  }
}
