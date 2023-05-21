import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { EditAddCategoryComponent } from './edit-add-category/edit-add-category.component';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent {
    title: string;
    categories: Category[];
    errorMessage: string;
    successMessage: string;
    page: number = 0;
    totalPages: number = 0;
    currentPage: number = 0;
    size: number = 5;

  constructor(private categoryService: CategoriesService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    this.getCategories();
    this.getPageNumbers();
  }

  async getCategories() {
    await this.categoryService.getCategories(this.page-1, this.size)
    .then((result: any) => {
      this.categories = result.content;
      this.totalPages = result.totalPages;
      this.currentPage = result.pageable.pageNumber+1;
    })
  }

  changePage(page): void {
    this.page = page.innerText;

  }

  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  openModal(category?: Category) {
    const modalRef = this.modalService.open(EditAddCategoryComponent, {size: 'lg'});
    modalRef.componentInstance.category = category;
    modalRef.result
    .then((result) => {
      if(!result) {
        this.getCategories();
      }
    })

  }

  openDeleteModal(category) {
    let modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.result
    .then(result => {
      if(result) {
        this.categoryService.deleteCategory(category).then(async () => {
          this.successMessage = "Se ha borrado el usero con exito";
          await this.getCategories();
          window.location.reload();
        })
        .catch(error => {
          this.errorMessage = error.message;
        })
        }
      })
      modalRef = null;
  }

}

