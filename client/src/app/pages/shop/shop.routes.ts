import { Routes } from "@angular/router"
import { ShopComponent } from "./shop.component"

export const ShopRoutes: Routes = [
  {
    path: '',
    /* providers: [
      provideState('shop', reducers),
      provideEffects(effects)
    ], */
    component: ShopComponent
  }
];