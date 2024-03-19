import { User } from "@app/models/server"

export interface UserState {
  entity : User | null;
  id : string | null;
  loading: boolean | null;
  error : string | null;
}