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
  password: string;
  title: string = '';
  userId: number = 0;
  myForm: FormGroup;
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private readonly userService: UserService, private readonly router: Router) {
    this.myForm = this.formBuilder.group({
      // Define your form controls here
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telefono: [0, Validators.required]

      // Add more form controls as needed
    });
   }

  ngOnInit() {
    if(this.user){
      this.title = "Editar usuario"
      console.log(this.user);

    } else {
      this.title = "Añadir usuario"
      this.user = {
        email: '',
        id: 0,
        firstName: '',
        lastName: '',
        role: Role.USER,
        telefono: '',
      }
    }
  }

  async saveUser() {
    if (this.myForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }
    
    if (this.title == "Añadir usuario") {
      this.registerRequest = {
        email: this.user.email,
        firstname: this.user.firstName.toString(),
        lastname: this.user.lastName,
        password: this.password
      }
      this.userService.addUser(this.registerRequest).then(result => {
        this.userId = result.id;
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      });
    } else {
      console.log(this.user);

      this.userService.editUser(this.user)
      .then((result) => {
        this.userId = result.id;
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        this.router.navigate[('dashboard')]
        this.activeModal.close();
      })
      this.title = "Editar usuario"
    }
  }
}
