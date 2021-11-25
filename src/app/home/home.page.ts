import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { History } from '../classes/History';
import { HistoryService } from '../services/history.service';
import { Product } from '../classes/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  selectedProduct: Product;
  listofProducts: Product[];
  aHistory : History;
  nameLabel: string = "Type";
  qtyLabel: string = "Qty";
  totalLabel: string = "Total";

  constructor(private service: ProductService, private hService: HistoryService, public alertController: AlertController) {}

  ionViewDidEnter(){
    this.listofProducts = this.service.getAllProducts();
  }
  ngOnInit(){
    this.listofProducts = this.service.getAllProducts();
  }

  productSelected(sp: Product){
    this.selectedProduct = sp;
    this.nameLabel = this.selectedProduct.name;
    console.log(this.selectedProduct.quantity);

    //Update the total if quantity is selected: Total = amount * item price
    if(this.qtyLabel != "Qty"){
      var qtyNum = Number(this.qtyLabel);
      this.totalLabel = ((this.selectedProduct.price * qtyNum).toFixed(2)).toString();
    }
  }
  numberButtonClicked(num: string){
    //Update quantity label with selected quantity
    if(this.qtyLabel != "Qty"){
      this.qtyLabel += num;
      console.log(this.qtyLabel);
    }else{
      this.qtyLabel = num;
      console.log(this.qtyLabel);
    }

    if(this.selectedProduct){
      //Update the total: Total = amount * item price
      var qtyNum = Number(this.qtyLabel);
      this.totalLabel = ((this.selectedProduct.price * qtyNum).toFixed(2)).toString();
    }
    
  }
  buyButtonClicked(){
    //Check if the quantity is entered and the product is selected
    if(this.qtyLabel != "Qty" && this.nameLabel != "Type"){
      
      var qtyNum = Number(this.qtyLabel);
      //Check if the quantity of the selected product is avaialble in the stock
      if(this.selectedProduct.quantity >= qtyNum){

        //Find the index of selected product from the product List
        var index = this.listofProducts.findIndex( ({name})=> name === this.selectedProduct.name );
        /*Update the product's quantity
        New Quantity = Old Quantity - Purchased amount*/
        this.listofProducts[index].quantity = this.listofProducts[index].quantity - qtyNum;
        //Save the purchased product to the history
        this.aHistory = 
        { name: this.listofProducts[index].name, 
          quantity: this.listofProducts[index].quantity,
          price: this.listofProducts[index].price,
          totalPrice: Number(this.totalLabel),
          dateTime: new Date()
        }
        this.hService.addHistory(this.aHistory);

      }else{
       this.presentAlert("The selected quantity is more than the available quantity in the stock");
      }

      //reset the UI
      this.nameLabel = "Type";
      this.qtyLabel = "Qty";
      this.totalLabel = "Total";

    }else{
      this.presentAlert("Please select a product and enter a quantity to buy the product");
    }
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
