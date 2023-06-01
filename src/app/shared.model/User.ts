import {Role} from "./Role";

export class User {
  id!: number;
  nameEN!: string;
  username!: string;
  password!: string;
  funds!: number; //in US pennies
  ordersNumber!: number;
  ordersTotalCost!: number;
  authorities!: Role[];

}
