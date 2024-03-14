import { ControlItem } from "../control-item"
import { Item } from "../item"

export interface Dictionaries {
  categories : Dictionary,
  brands: Dictionary
}

export interface Dictionary {
    items: Item[];
    controlItems: ControlItem[];
}