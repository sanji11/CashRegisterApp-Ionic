import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Product } from '../classes/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.page.html',
  styleUrls: ['./add-new-product.page.scss'],
})
export class AddNewProductPage implements OnInit {

  form :FormGroup;
  newProduct: Product;
  products: Product[];
  constructor(private service: ProductService, private alertController:AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      quantity: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  saveButtonClicked(){

    if (this.form.invalid){
     this.presentAlert('Error', 'All values are needed');
    }else {
      this.newProduct = {
        name: this.form.get('name').value,
        quantity: this.form.get('quantity').value,
        price: this.form.get('price').value
      }
      this.service.addNewProduct(this.newProduct);
      this.presentAlert('Success', 'New Product is added successfully!');
    }
  }

  cancelButtonClicked(){
    this.form.reset();
  }

  async presentAlert(header:string, msg: string){
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }


}
