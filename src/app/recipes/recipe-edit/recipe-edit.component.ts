import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm:FormGroup;

  constructor(private route: ActivatedRoute, private recpieService:RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params["id"]);
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }
  initForm(){
    let recipeName="";
    let recipeImgPath='';
    let recipeDescription='';
    let  recipeIngredient=new FormArray([]);
  if(this.editMode){
      const recipe=this.recpieService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImgPath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredient.push(new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[Validators.required])
      
          }));
        }
      }

    }else{

    }
this.recipeForm=new FormGroup({
'name':new FormControl(recipeName,Validators.required),
'imagePath':new FormControl(recipeImgPath,Validators.required),
'description':new FormControl(recipeDescription ,Validators.required),
'ingredients':recipeIngredient
});
  }
  onSubmit(){
    const newRecipe= new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients']
    )
    if(this.editMode){
      this.recpieService.updateRecipe(this.id ,newRecipe)
    }else{
      this.recpieService.addRecipe(newRecipe);
    }
  }
  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
            'name':new FormControl(null,Validators.required),
            'amount':new FormControl(null,[Validators.required])
         
      })
    )
  }
}
