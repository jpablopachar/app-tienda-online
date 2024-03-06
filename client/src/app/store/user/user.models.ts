import { User } from "@app/models/server"

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface UserRequest extends User {
  password: string;
}

export type UserCreateRequest = Omit<UserRequest, 'id' | 'token' | 'image' | 'admin' >;