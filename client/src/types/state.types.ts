export interface RegisterFormData {
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface GlobalState {
  loading: boolean;
  accessToken: string | null;
}
