import { UserToken } from './../../core/models/user-token.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly cartService =inject(CartService)
  private readonly authService =inject(AuthService)
  tokenData:UserToken={} as UserToken
  userId!:string
  allOrders:any


ngOnInit(): void {
  this.getOrders();
}


  getOrders():void{
    const tokenData= this.authService.tokenDecode();
    const userId = tokenData?.id
    
    
if(userId){
this.cartService.getUserOrder(userId).subscribe({
  next:(res)=>{
    console.log(res)
    this.allOrders=res;
  },
  error:(err)=>{
    console.log(err)
  },


})

}


  }

}
