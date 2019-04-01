import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {ProductAddCart} from '../../model/productaddcartmodel'
import * as _ from 'lodash'
import QRCode from 'qrcode';
// import * as io from 'socket.io-client';"socket.io-client": "^2.2.0",
import {environment} from '../../../environments/environment';


import { map } from 'rxjs/operators'

@Component({
  selector: 'viewcartmodal',
  templateUrl: './viewcartmodal.component.html',
  styleUrls: ['./viewcartmodal.component.css']
})
export class ViewcartmodalComponent implements OnInit {
@Input() viewCartProducts:ProductAddCart[];
@Output() removeCartItemEvent = new EventEmitter();
subTotal:number =0;
productTax:number=0;
totalAmount:number=0;
merchantCode:string;
isDivVisible:boolean =true ;  
isPayVisible = false;
paymentMessage :string ="";
 private transactionChar:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
 private transactionID :string="";
public qrcode: any;
 
     
  ngOnInit() {



    for (var i = 0; i < 50; i++){
      this.transactionID += this.transactionChar.charAt(Math.floor(Math.random() * this.transactionChar.length));
    }
    
    console.log('transactionid: ',this.transactionID)



    this.merchantCode = this.viewCartProducts[0].MerchantHashCode;
    this.calculateSubtotal(this.viewCartProducts);
    this.calculateproductTax ();
    this.calculateTotalAmount ();



  }

  calculateSubtotal (cartProducts:ProductAddCart[])
  {
    cartProducts.forEach(productCart => {
      this.subTotal += parseFloat(productCart.TotalAmount.toString());
      
    });
  }


  calculateproductTax ()
  {
    this.productTax = this.subTotal * 0.11;
  }


  calculateTotalAmount ()
  {
    this.totalAmount = this.subTotal + this.productTax;
  }

  calculatetotalamount(viewCartProduct:ProductAddCart, quantity)
  {

    console.log('Text Quantity: ',quantity);
    viewCartProduct.Quantity = quantity;
    viewCartProduct.TotalAmount = parseInt(viewCartProduct.Quantity.toString()) * parseFloat(viewCartProduct.Price.toString());
    console.log('TotalAmount: ',viewCartProduct.TotalAmount);
    console.log('Quantity: ',viewCartProduct.Quantity);
    console.log('Price: ',viewCartProduct.Price);
    this.subTotal =0;
    this.productTax=0;
    this.totalAmount=0;


    this.calculateSubtotal(this.viewCartProducts);
    this.calculateproductTax ();
    this.calculateTotalAmount ();

    var container = document.getElementById('QRCodeID');
    container.innerHTML = '';
  }

  removeItem (viewCartProduct:ProductAddCart)
  {
    const removeItemIndex:number =this.viewCartProducts.indexOf(viewCartProduct);

    if (removeItemIndex !== -1) {
      this.viewCartProducts.splice(removeItemIndex, 1);
  }
  
  this.subTotal =0;
  this.productTax=0;
  this.totalAmount=0;


  this.calculateSubtotal(this.viewCartProducts);
  this.calculateproductTax ();
  this.calculateTotalAmount ();

  this.removeCartItemEvent.emit(viewCartProduct);

  var container = document.getElementById('QRCodeID');
  container.innerHTML = '';
  }

  checkout(){
    
    QRCode.toCanvas(JSON.stringify({MerchantCode:this.merchantCode,Amount:this.totalAmount.toString(),OrderReferenceID:this.transactionID}), { errorCorrectionLevel: 'H' })
    .then(canvas => {
        var container = document.getElementById('QRCodeID');
        
        container.innerHTML = '';
      container.appendChild(canvas);
      this.isDivVisible=false;
      this.isPayVisible = true;
      this.paymentMessage =`Payment Amount ${this.totalAmount.toString()}. Please do not Close`;

    })

  
  .catch(err => {
    console.error(err)
  })


  }
  closeModal ()
  {

    
  }
}
