import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {AuthGuard} from "../../guard/auth.guard";
import {FoodMenuComponent} from "./food-menu/food-menu.component";

const routes: Routes = [
  {
    path: 'food-menu',
    component: FoodMenuComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
