import { Ingredient } from "../shared/ingredient-model";
import { Subject } from "rxjs";
import { NgModule } from "@angular/core";

export class ShoppinglistService {
  startEditing=new Subject<number>();

  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 5)
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  onIngredientsAdded(ingredients: Ingredient[]) {
    // ingredients.forEach(ingredient => {
    //   this.onIngredientAdded(ingredient);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredietn(index:number){
    return this.ingredients[index];

  }
  updateIngredients(inde:number,newIngredient:Ingredient){
    this.ingredients[inde]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());

  }
  deletIngredients(index:number){
this.ingredients.splice(index,1);
this.ingredientsChanged.next(this.ingredients.slice())
  }
}
