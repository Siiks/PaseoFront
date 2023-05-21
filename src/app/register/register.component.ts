import { Component, OnInit } from '@angular/core';
import { DecodedToken, RegisterRequest } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  registerRequest: RegisterRequest;

  constructor(private authService: AuthService,
    private router: Router) {
      this.registerRequest = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    }
  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.register(this.registerRequest)
    .then(data => {
      // El usuario se ha autenticado correctamente
      const token: any = data.token;
      const decodedToken: DecodedToken  = jwtDecode(token);
      const roles = decodedToken.roles;
      // Guarda el token y los roles en el almacenamiento local
      localStorage.setItem('access_token', token);
      localStorage.setItem('roles', JSON.stringify(roles));
      // Redirige al usuario a la página de inicio
      this.successMessage = "Te haz registrado con exito"
    })
    .catch(err => {
    console.log(err.message);
    this.errorMessage = "El registro ha fallado";
  });
  }
}
