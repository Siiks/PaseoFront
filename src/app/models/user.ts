export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    telefono: string;
    role: Role;
    password?: string;
}
export enum Role {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
}
export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    telefono?: string;
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
    sub: string;
  }
