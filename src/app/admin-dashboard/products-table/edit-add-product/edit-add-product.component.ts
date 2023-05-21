import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Product, ProductDto } from 'src/app/models/product';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { FileService } from 'src/app/services/file.service';
import { ImageData } from 'src/app/models/images';


@Component({
  selector: 'app-edit-add-product',
  templateUrl: './edit-add-product.component.html',
  styleUrls: ['./edit-add-product.component.scss']
})
export class EditAddProductComponent implements OnInit {
  @Input() public producto: any;
  title: string = '';
  productId: number = 0;
  myForm: FormGroup;
  errorMessage: string = '';
  categories: Category[] = [];
  uploadedImage: File;
  productImages: ImageData[] = [];

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private readonly productoService: ProductService,
    private readonly categoryService: CategoriesService,
    private readonly fileService: FileService,
    private changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router) {
    this.myForm = this.formBuilder.group({
      // Define your form controls here
      name: ['', Validators.required],
      description: ['', Validators.required],
      cantidad: [0, Validators.required],
      price: [0, Validators.required],
      inventoryQuantity: [0, Validators.required]

      // Add more form controls as needed
    });
  }

  ngOnInit(): void {
    this.getCategories();
    if (this.producto) {
      this.title = "Editar producto"
      this.viewImage();
    } else {
      this.title = "Añadir producto"
      this.producto = {
        description: '',
        id: 0,
        idCategory: 0,
        inventoryQuantity: 0,
        name: '',
        price: 0
      }
    }
  }

  async getCategories() {
    const res: any = await this.categoryService.getCategories(0, 100);
    if (this.producto.id > 0) {
      this.categories = res.content.filter(category => category.id != this.producto.category.id);
    } else {
      this.categories = res.content;
      console.log("ghasd");

    }

    console.log(res);
  }

  async saveProduct() {
    if (this.myForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }
    if (this.title == "Añadir producto") {
      this.productoService.addProduct(this.producto).then(result => {
        this.productId = result;
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      });
    } else {
      this.productoService.editProduct(this.producto).then((result: ProductDto) => {
        this.productId = result.id;
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      })
      this.title = "Editar producto"
    }
  }

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }

  imageUploadAction() {
    this.fileService.uploadImage(this.uploadedImage, this.producto.id)
      .then(res => {
        this.viewImage();

      })
  }

  async viewImage() {
    this.productImages.length = 0;
    this.fileService.viewImage(this.producto.id)
      .then((res) => {
        console.log(res);

        res.forEach(resultado => {
          this.productImages.push(resultado);
        })
      })
  }

  deleteImage(imageId) {
    this.fileService.deleteImage(imageId)
      .then(() => {
        this.viewImage();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
