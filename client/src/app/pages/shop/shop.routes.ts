import { Routes } from "@angular/router"
import { provideEffects } from "@ngrx/effects"
import { provideState } from "@ngrx/store"
import { ShopComponent } from "./shop.component"
import { productsEffects, productsReducers } from "./store"

export const ShopRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState('shop', productsReducers),
      provideEffects(productsEffects)
    ],
    component: ShopComponent
  }
];