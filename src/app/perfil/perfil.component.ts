import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  user: User;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly modalService: NgbModal) {
      this.user = {
        email: null,
        firstName: null,
        id: null,
        lastName: null,
        role: null,
        telefono: null,
      }
     }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    const emailString = localStorage.getItem("email");
    const email = JSON.parse(emailString);
    this.user = await this.userService.getUserByEmail(email);
  }

  saveUser() {
    this.successMessage = '';
    this.errorMessage = '';
    this.userService.editUser(this.user)
      .then(() => {
        this.successMessage = "Cambios guardados con éxito"
        this.getUser();
      })
      .catch(() => {
        this.errorMessage = "Han habido problemas al guardar los cambios"
      })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
    });
   }

   openDeleteModal() {
    let modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.result.then(result => {
      if(result) {
        this.userService.deleteUser(this.user).then(() => {
          this.logout();
        })
        }
      })
      modalRef = null;
  }
}
