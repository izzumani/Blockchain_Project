import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {ProductAddCart} from '../../model/productaddcartmodel'
import * as _ from 'lodash'
import QRCode from 'qrcode';
// import * as io from 'socket.io-client';"socket.io-client": "^2.2.0",
import {environment} from '../../../environments/environment';

import { Socket } from 'ngx-socket-io';
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

blockchainUrl = `${environment.socketioapiUrl}`; //replace with environment variable in production
 private transactionChar:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
 private transactionID :string="";
public qrcode: any;
  // constructor(private socket: Socket) { 
     constructor(private socket: Socket) { 
    // this.socket = io(this.blockchainUrl);
    // this.socket.connect();
    
    // this.socket
    //         .fromEvent(this.transactionID)
    //         .pipe(map( (data) =>{

    //           console.log('Confirm Payments for transactionid: ', data);
    //         }  ))
            
    
    
    
  }

  ngOnInit() {

    console.log('socket connection to ',this.blockchainUrl );

    for (var i = 0; i < 50; i++){
      this.transactionID += this.transactionChar.charAt(Math.floor(Math.random() * this.transactionChar.length));
    }
    
    console.log('transactionid: ',this.transactionID)


    // console.log('loading view cart data in ngOnInit ', this.viewCartProducts);
    this.merchantCode = this.viewCartProducts[0].MerchantHashCode;
    this.calculateSubtotal(this.viewCartProducts);
    this.calculateproductTax ();
    this.calculateTotalAmount ();

    this.socket.on(this.transactionID, (message) => {
      console.log('Received confirmed connection from server: ',message );
      this.socket.removeListener(this.transactionID);
    });

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

    // console.log(`item ${viewCartProduct} is on index: ${removeItemIndex}`);

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


      this.socket.emit("PaymentDetails", {MerchantCode:this.merchantCode,Amount:this.totalAmount.toString(),OrderReferenceID:this.transactionID});

      // this.socket
      // .fromEvent("ConfirmPayment")
      // .subscribe((data)=>{
      //   console.log(data);
      // });
      
      // this.socket.emit('PaymentDetails', {MerchantCode:this.merchantCode,Amount:this.totalAmount.toString()});

      // this.socket.on(this.merchantCode, (message) => {
      //   console.log('Received confirmed messaged: ',message );
      // });
    })

  
  .catch(err => {
    console.error(err)
  })

  
    //   if (err) {
    //     console.log();
    //   }
     
    //   var container = document.getElementById('QRCodeID')
    //   container.appendChild(canvas)
    // })

    
  //   QRCode.toDataURL(this.totalAmount.toString())
  // .then(url => {
  //   console.log(url)
  // })
  // .catch(err => {
  //   console.error(err)
  // })
  }
  closeModal ()
  {
    this.socket.disconnect();   
    console.log('socket disconnect') ;
  }
}
