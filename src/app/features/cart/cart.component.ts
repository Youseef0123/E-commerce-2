import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartData } from './models/cart-data.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
cartDetails:CartData={} as CartData



  ngOnInit(): void {
    this.getLoggedCartData();
  }



  getLoggedCartData(): void {
    this.cartService.cartLogged().subscribe({
      next: (res) => {
        console.log(res);


        this.cartDetails= res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


removeProductInCart(id:string):void{

  this.cartService.removeSpecificCartItem(id).subscribe({

    next:(res)=>{
console.log(res)

this.cartService.cartNumber.set(res.numOfCartItems)
// عشان التغيير يسمع و اكون عرضته بعد ما الداتا  رجعت من الباك اند
this.cartDetails= res.data

    },
    error:(err)=>{

      console.log(err)
    }
  })



}



updateCart(id:string,count:number):void{

this.cartService.updateCartCount(id,count).subscribe({


  next: (res) => {
    console.log(res);


    this.cartDetails= res.data
  },
  error: (err) => {
    console.log(err);
  }
})


}

}