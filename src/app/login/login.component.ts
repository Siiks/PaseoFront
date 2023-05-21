import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest, DecodedToken } from '../models/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

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
    private router: Router,
    private readonly sharedService: SharedService) {
    this.authRequest = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.authRequest)
      .then(data => {
        const token: any = data.token;
        const decodedToken: DecodedToken = jwtDecode(token);
        const roles = decodedToken.roles;
        const email = decodedToken.sub;
        // Guarda el token y los roles en el almacenamiento local
        localStorage.setItem('access_token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('email', JSON.stringify(email));
        this.successMessage = "Te haz logueado con exito"
        this.router.navigate(['']);
        this.sharedService.triggerUpdate();
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('roles');
        localStorage.removeItem('email');
        this.errorMessage = "Crendeciales incorrectos";
      })
  }
}
