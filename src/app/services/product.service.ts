import { Injectable } from '@angular/core';
import { Product } from '../classes/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [{
    name:"Pants",
    quantity: 20,
    price: 50.7
  },{
    name:"Shoes",
    quantity: 50,
    price: 90

  },{
    name: "Hats",
    quantity: 10,
    price: 20.5
  },{
    name: "Tshirts",
    quantity: 10,
    price: 24.99
  },{
    name: "Dresses",
    quantity: 24,
    price: 140.3

  }];

  constructor() { }

  getAllProducts(){
    return [...this.products];
  }
  addNewProduct(newProd){
    this.products.push(newProd);
  }
}
