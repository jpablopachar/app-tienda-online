import { Dictionaries } from "@app/models/client/dictionary"

export interface DictionariesState {
  entities: Dictionaries | null;
  loading : boolean | null;
  error: string | null;
}