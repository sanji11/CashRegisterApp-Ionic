import { Injectable, OnInit } from '@angular/core';
import { History } from '../classes/History'

@Injectable({
  providedIn: 'root'
})
export class HistoryService{

  private histories: History[] = [];
  constructor() { }

  getAllHistories(){
    return [...this.histories];
  }

  getHistoryProdByName(name){
    return{...this.histories.find(
      histry =>{return histry.name === name;}
    )}
  }
  addHistory(history: History){
    this.histories.push(history);
  }
}
