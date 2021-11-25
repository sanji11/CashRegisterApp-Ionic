import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Product } from '../classes/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.page.html',
  styleUrls: ['./restock.page.scss'],
})
export class RestockPage implements OnInit {

  productList: Product[];
  selectedProduct : Product;
  newQuantity: number;

  constructor(private service: ProductService, public alertController: AlertController) { }

  ngOnInit() {
    this.productList = this.service.getAllProducts();
  }
  restockButtonClicked(){
    //Check if the user entered any quantity
    if(typeof this.newQuantity != 'undefined'){
      //Check if the user selected a product
      if(this.selectedProduct){
        //Find the index of selected product from the product List
        var index = this.productList.findIndex( ({name})=> name === this.selectedProduct.name );
        /*Update the product's quantity
        New Quantity = New Quantity + Purchased amount*/
        this.productList[index].quantity = Number(this.productList[index].quantity) + Number(this.newQuantity);
        //Reset the variables
        this.selectedProduct = null;
        
      }else{
        //Handel Misusing : showing alert if the user does not select a product
        this.presentAlert("You have to select an item and provide a new quantity");
        console.log(this.selectedProduct);
      }

    }else{
      //Handel Misusing : showing alert if the user does not enter any quantity
      this.presentAlert("You have to select an item and provide a new quantity")
    }


  }

  productSelected(sp: Product){
    this.selectedProduct = sp;
    console.log("product selected" + this.selectedProduct);
  }

  async presentAlert(msg: string){
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
