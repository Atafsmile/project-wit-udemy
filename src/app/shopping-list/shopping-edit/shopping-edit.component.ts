import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient-model";
import { ShoppinglistService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('form') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editItmIndex:number;
  editItem:Ingredient;
  //@ViewChild("nameInput", { static: true }) nameInputRef!:ElementRef;
 // @ViewChild("amountInput", { static: true }) amountInputRef!:ElementRef;

  onAddItem(formL:NgForm) {
  /*  const newIngredient = new Ingredient(
   this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );*/
const value=formL.value;
const newIngredient=new  Ingredient(value.name,value.amount);
if(this.editItem){
  this.shoppinglistService.updateIngredients(this.editItmIndex,newIngredient)
}else{
    this.shoppinglistService.onIngredientAdded(newIngredient);
}
formL.reset();
this.editMode=false;
  }

  constructor(private shoppinglistService: ShoppinglistService) {}

  ngOnInit() {
    this.subscription= this.shoppinglistService.startEditing.subscribe((index:number)=>{
this.editMode=true;
this.editItmIndex=index;
this.editItem=this.shoppinglistService.getIngredietn(index);
this.slForm.setValue({
  name:this.editItem.name,
  amount:this.editItem.amount
})
    });
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.shoppinglistService.deletIngredients(this.editItmIndex);
    this.onClear();
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
