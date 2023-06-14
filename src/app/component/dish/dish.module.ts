import { NgModule } from '@angular/core';

import { DishRoutingModule } from './dish-routing.module';
import {FoodMenuComponent} from "./food-menu/food-menu.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    FoodMenuComponent,
  ],
  imports: [
    RouterModule,
    DishRoutingModule,
  ]
})
export class DishModule { }
