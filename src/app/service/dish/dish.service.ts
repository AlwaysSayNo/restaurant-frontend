import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Dish} from "../../shared.model/Dish";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private allFoodMenuUrl = '/api/foodmenu';
  private butDishUrl = '/api/buyproduct';

  constructor(private http: HttpClient) { }

  getAllFoodMenu(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.allFoodMenuUrl);
  }

  buyDish(dish: Dish): Observable<Dish> {
    let params = new HttpParams()
      .set('id', dish.id);

    return this.http.get<Dish>(this.butDishUrl);
  }

}
