// src/types.d.ts
export interface LoginResponse {
  AccountStatus: boolean;
  PasswordStatus: boolean;
  Token: string;
}

export interface LoginData {
  accountNumber: string;
  password: string;
  rememberMe: boolean;
}
