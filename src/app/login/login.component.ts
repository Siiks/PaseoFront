import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest, DecodedToken } from '../models/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, 
    private router: Router) {
      this.authRequest = {
        email: '',
        password: ''
      }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.authRequest).then(
      data => {
        // El usuario se ha autenticado correctamente
        const token = data.token;
        const decodedToken: DecodedToken  = jwtDecode(token);
        const roles = decodedToken.roles;
        // Guarda el token y los roles en el almacenamiento local
        localStorage.setItem('access_token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
        // Redirige al usuario a la página de inicio
        this.successMessage = "Te haz logueado con exito"
      }
    ).catch(err => {
      this.errorMessage = err.message;
    });
  }
}
