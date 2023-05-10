export interface User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    telefono: string;
}

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface AuthenticationResponse {
    token: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface PasswordForgot {
    email: string;
}

export interface PasswordForgotValidate {
    token: string;
    newPassword: string;
    newPasswordConfirm: string; 
}

export  interface PasswordForgotConfirm {
    token: string;
}

export interface DecodedToken {
    roles: string[];
    // Add other properties here if needed
  }