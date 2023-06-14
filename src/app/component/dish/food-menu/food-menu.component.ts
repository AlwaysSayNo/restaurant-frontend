import { Component, OnInit } from '@angular/core';
import {Dish} from "../../../shared.model/Dish";
import {DishService} from "../../../service/dish/dish.service";

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})
export class FoodMenuComponent implements OnInit {

  dishes!: Dish[];

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.getAllFoodMenu()
      .subscribe((dishes) => {
        this.dishes = dishes;
      })
  }

  onAddDish(dish: Dish) {
    this.dishService.buyDish(dish)
      .subscribe();
  }

}
