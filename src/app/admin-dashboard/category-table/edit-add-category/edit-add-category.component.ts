import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-add-category',
  templateUrl: './edit-add-category.component.html',
  styleUrls: ['./edit-add-category.component.scss']
})
export class EditAddCategoryComponent {
  @Input() category: Category;
  password: string;
  title: string = '';
  userId: number = 0;
  myForm: FormGroup;
  categoryId: number = 0;
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private readonly categoryService: CategoriesService,
    private readonly router: Router) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.category) {
      this.title = "Editar categoria"
      console.log(this.category);

    } else {
      this.title = "Añadir categoria"
      this.category = {
        id: 0,
        name: '',
      }
    }
  }

  async saveCategory() {
    if (this.myForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }
    if (this.title == "Añadir categoria") {
      this.categoryService.addCategory(this.category).then(result => {
        this.category = result;
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      });
    } else {
      this.categoryService.editCategory(this.category).then((result: Category) => {
        this.categoryId = result.id;
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      })
    }
  }
}
