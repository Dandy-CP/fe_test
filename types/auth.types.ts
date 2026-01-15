export interface SignInBody {
  username: string;
  password: string;
}

export interface SignInResponse {
  status: boolean;
  message: string;
  code: number;
  is_logged_in: number;
  token: string;
}
