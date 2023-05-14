import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
}
