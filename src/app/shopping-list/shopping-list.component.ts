import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient-model";
import { ShoppinglistService } from "./shopping-list.service";
import {  Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;

  constructor(private shoppinglistService: ShoppinglistService) {}

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igChangeSub = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEdditItem(index:number){
 this.shoppinglistService.startEditing.next(index);
  }
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
}
