import { Component, OnInit,ViewChild,Directive } from '@angular/core';
import {MerchandiseDataService} from '../../services/MerchandiseDataService';
import {Product} from '../../model/productmodel'
import {ProductAddCart} from '../../model/productaddcartmodel'
import {NgbModal, ModalDismissReasons,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GroceriesProduct} from '../../model/types/types_groceriesproduct';
import {Merchant} from '../../model/types/types_merchantdetails'

@Component({
  selector: 'merchandiselist',
  templateUrl: './merchandiselist.component.html',
  styleUrls: ['./merchandiselist.component.css'],
  
})
// export class MerchandiselistComponent implements Observer<Product[]>, OnInit {
  export class MerchandiselistComponent implements OnInit {
    // @ViewChild(ViewcartmodalComponent ) viewCartModal: ViewcartmodalComponent ; 
    productLists:GroceriesProduct[]=[];
    CartProductList:ProductAddCart[]=[];
    MerchantDetails : Merchant;
  // cartproductlist:AddCartProductList;
  numberOfItemsInCart:number =0;
  private closeResult:string;
  constructor(private modalService: NgbModal,
                 private merchandiseDataService : MerchandiseDataService) { 
  }

  ngOnInit()
  {
    
     this.numberOfItemsInCart = this.CartProductList.length;
    
    this.merchandiseDataService.getMerchandiseData().subscribe(
      (data) =>{
        
        this.productLists = data as GroceriesProduct[];

        
        
      }
    );

    this.merchandiseDataService.getMerchantDetails().subscribe(
      (data) =>{
        
        this.MerchantDetails = data as Merchant;
        
      }
    );
    
    // console.log('Payment timestamp: ',new Date().toLocaleDateString());
    // console.log('Payment timestamp: ',new Date().toLocaleTimeString());
    // console.log('Payment timestamp: ',new Date().toJSON("yyyy/MM/dd HH:mm:ss TT") );

    // dateFormat(now, "dd, mm, yyyy, h:MM:ss TT"); 
    
  }

  fnbuynow(addCartproduct:Product)
  {
    addCartproduct.addedToCart=true;
    let productAddCart:ProductAddCart=
    {
      MerchantHashCode:this.MerchantDetails.MerchantBitcoinKey,
      MerchantName :  this.MerchantDetails.MerchantName,
      ProductCode : addCartproduct.ProductCode,
      ProductDescription : addCartproduct.ProductDescription,
      Quantity : 1,
      Price : addCartproduct.Price,
      TotalAmount : addCartproduct.Price};
    
    


    this.CartProductList.push(productAddCart);
    this.numberOfItemsInCart = this.CartProductList.length;


    
  }
  
  removedCartItem(viewCartProduct)
  {
    console.log('remove items in the view cart at parent level: ',viewCartProduct);

    const removeItemIndex:number =this.CartProductList.indexOf(viewCartProduct);

    // console.log(`item ${viewCartProduct} is on index: ${removeItemIndex}`);

    if (removeItemIndex !== -1) {
      this.CartProductList.splice(removeItemIndex, 1);
  }

  this.numberOfItemsInCart = this.CartProductList.length;

  this.productLists.forEach((el)=>{
    if (el.ProductCode==viewCartProduct.ProductCode){
      el.addedToCart=false;
    }
  });

  }
  openModal(template)
  {
    console.log("click to open modal");

    this.modalService.open(template, 
          {
            ariaLabelledBy: 'modal-basic-title',
            centered: true,
            size: 'lg'
          })
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // this.viewCartModal.closeModal();
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // this.viewCartModal.closeModal();
      console.log(this.closeResult);
    });
    
  
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}





/*
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      }
  }
}


=================================================================================

mport { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class NumberValidator {

    public static isInteger(control: FormControl): ValidationResult {
        // check if string has a dot
        let hasDot:boolean = control.value.indexOf('.') >= 0 ? true : false;
        // convert string to number
        let number:number = Math.floor(control.value);
        // get result of isInteger()
        let integer:boolean = Number.isInteger(number);
        // validate conditions 
        let valid:boolean = !hasDot && integer && number>0;
        console.log('isInteger > valid', hasDot, number, valid);
        if (!valid) {
            return { isInteger: true };
        }
        return null;
    }        
}


this.merchandise.getMerchandiseData().subscribe(
      (data)=>{
      console.log(data);
      this.merchandiseData =data;

      for (let productValue of this.merchandiseData )
        {
            //0.00026
            productValue.ProductCoinsPrice= productValue.ProductDollarPrice *0.00026;
            productValue.ProductTotalAmount= productValue.ProductCoinsPrice * productValue.ProductQuantity;

        }
       
    },
    (error)=>{
      console.log(error);
    }
    );


    productquantity (event):boolean
  {
   
   const charCode = (event.which) ? event.which : event.keyCode;
   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
     return false;
   }
   
   
    return true;
  }

  calculatetotalamount (ProductCode,quantity) :void
  {
   console.log (ProductCode);   
   let rowIndex =0;
   this.merchandiseData.forEach(element => {
     
      if (element.ProductCode ===ProductCode)
      {
        
     
       this.merchandiseData[rowIndex].ProductQuantity = quantity;
       this.merchandiseData[rowIndex].ProductTotalAmount= this.merchandiseData[rowIndex].ProductCoinsPrice * this.merchandiseData[rowIndex].ProductQuantity;
     
      }
      rowIndex ++;
     
    });
   
  }
  
*/
