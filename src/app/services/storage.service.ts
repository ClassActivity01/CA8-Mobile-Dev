import { Injectable } from '@angular/core'; 
import { IonicStorageModule, Storage } from '@ionic/storage';

export interface Item {
  id : number;  
  question : string; 
  answer : string; 
  topic : string;  
  author : string; 
  ansrer : string;   
  modified : number
} 

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { } 

  //Create new item 
  addItem(item: Item): Promise<any> { 
    //first check whats in the repo and return it as an array
    return this.storage.get(ITEMS_KEY).then((items :Item[]) => {
      if(items) { //if there are items 
        items.push(item)                          //push new items to array
        return this.storage.set(ITEMS_KEY, items); //write items to back to storage
      } 
      else { //if not items
        return this.storage.set(ITEMS_KEY, [item]); 
      } 

    }); 
  }
  
  //Read items from SQLite 
  getItems(): Promise<Item[]>  {    //return value to function
    return this.storage.get(ITEMS_KEY); 
  } 

  //update repository
  UpdateItem(item: Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items :Item[]) => {
     if (!items || items.length === 0){
       return null;                           // no item can be updated
     } 
     else {
       let newItems: Item[] = [];       // new area created
       
       for (let i of items){ 
         if(i.id === item.id) {      // item array equal to item we want to update 
           newItems.push(item);      // push to newItem array
         } 
         else{
          newItems.push(i);
         }
       } 
       return this.storage.set(ITEMS_KEY, newItems); 
     }
    }); 
  } 

  //Delete an item from repo 
  deleteItem(id: number): Promise<Item> {
    //first check whats in the repo and return it as an array
    return this.storage.get(ITEMS_KEY).then((items :Item[]) => {
      if (!items || items.length === 0){
        return null;                           // no item can be updated
      } 

      let toKeep: Item[] = []; 

      for(let i of items) { 
        if (i.id !== id) {
          toKeep.push(i);
        }
      } 
      return this.storage.set(ITEMS_KEY, toKeep)
    });
  }

}
