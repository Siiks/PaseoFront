import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { EditAddProductComponent } from './edit-add-product/edit-add-product.component';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


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
    const options: NgbModalOptions = {
      size: 'lg',
    };
    const modalRef = this.modalService.open(EditAddProductComponent, options);
    console.log(this.productos[0]);
    modalRef.componentInstance.producto = product;
  }
}
