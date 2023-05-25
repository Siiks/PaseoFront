import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterRequest, Role, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-add-user',
  templateUrl: './edit-add-user.component.html',
  styleUrls: ['./edit-add-user.component.scss']
})
export class EditAddUserComponent {
  @Input() user: User;
  registerRequest: RegisterRequest;
  password: string = '';
  title: string = '';
  userId: number = 0;
  myForm: FormGroup;
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private readonly userService: UserService, private readonly router: Router) {
    this.myForm = this.formBuilder.group({
      // Define your form controls here
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telefono: [0, Validators.required]
    });

   }

  ngOnInit() {
    if(this.user){
      this.title = "Editar usuario"
      this.myForm = this.formBuilder.group({
        // Define your form controls here
        email: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        telefono: [0, Validators.required]
      });
    } else {
      this.title = "Añadir usuario"
      this.user = {
        email: '',
        id: 0,
        firstName: '',
        lastName: '',
        role: Role.ADMIN,
        telefono: '',
        password: ''
      }
      this.myForm = this.formBuilder.group({
        // Define your form controls here
        email: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        telefono: [0, Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  async saveUser() {
    this.errorMessage = '';
    if (this.myForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    if (this.title == "Añadir usuario") {
      this.user.password = this.password;
      this.userService.addUser(this.user).then(result => {
        this.userId = result.id;
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      })
      .catch(() => {
        this.errorMessage = 'El email ya esta en uso';
      });
    } else {
      this.userService.editUser(this.user)
      .then((result) => {
        this.userId = result.id;
      })
      .catch(err => {
      })
      .finally(() => {
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      })
      this.title = "Editar usuario"
    }
  }
}
