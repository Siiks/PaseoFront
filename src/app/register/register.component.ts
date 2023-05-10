import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
