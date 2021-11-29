import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient-model";
import { ShoppinglistService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged =new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Spaghetti",
      "Pasta with a lovely tomato sauce!",
      "https://cdn.pixabay.com/photo/2016/06/17/19/10/pasta-1463929_960_720.jpg",
      [
        new Ingredient("Spagetti", 500),
        new Ingredient("Tomato", 4),
        new Ingredient("Cheese", 1)
      ]
    ),
    new Recipe(
      "Veggie burger",
      "A wonderful burger full of vegetables",
      "https://i.ytimg.com/vi/a19EY3YNStA/maxresdefault.jpg",
      [
        new Ingredient("Buns", 1),
        new Ingredient("Veggie burger", 1),
        new Ingredient("Lettuce", 1),
        new Ingredient("Tomato", 1),
        new Ingredient("Cheese", 1)
      ]
    )
  ];

  constructor(private shoppinglistService: ShoppinglistService) {}

  getRecipes() {
    // By using ".slice()" you actually return a copy of the array, thus when you make changes to it you don't change the array within this service
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistService.onIngredientsAdded(ingredients);
  }
  addRecipe(recipe:Recipe){
   this.recipes.push(recipe);
   this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe){
this.recipes[index]=newRecipe;
this.recipeChanged.next(this.recipes.slice());

  }
}
