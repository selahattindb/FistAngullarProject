import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todoitem';
import { Model } from './todomodel';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
 
  model = new Model();
  displayAll:boolean=false;
  txtInput:string="";

  constructor() {
    this.model.items=this.getItemsFromLocalStorage();
  
   }
 
  getBtnClasses(){
    return {
      'disabled': this.txtInput.length == 0,
      'btn-secondary': this.txtInput.length == 0,
      'btn-primary': this.txtInput.length > 0
  }
  }
  addItem() {
    let data={ decsription: this.txtInput, action: false };
    let items = this.getItemsFromLocalStorage();
    items.push(data);
    localStorage.setItem("items",JSON.stringify(items));
    this.model.items.push(data);
    this.txtInput = "";
    
  }

  onChanged(item: TodoItem) {   
    let items = this.getItemsFromLocalStorage();
    localStorage.clear();
    items.forEach(i =>
      {
      if(i.decsription==item.decsription)
      i.action=item.action;
    });
    localStorage.setItem("items",JSON.stringify(items));
  }

  getItemsFromLocalStorage():TodoItem[] {
    let items:TodoItem[]=[];
    let value = localStorage.getItem("items");
  return value!=null ? JSON.parse(value):items;
  }
  getItems() {
   
    return this.displayAll? this.model.items: this.model.items.filter(i=>!i.action);
  }
}
