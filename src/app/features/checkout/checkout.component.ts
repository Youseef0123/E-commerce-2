import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  private readonly fb=inject(FormBuilder)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly cartService=inject(CartService)
  private readonly router=inject(Router)
  private readonly toastrService=inject(ToastrService)
id:string |null =null
checkOutForm!:FormGroup;



ngOnInit(): void {
  this.initForm();
  this.getCartId();
}
 

checkoutByVisa(): void {
  if (this.checkOutForm.valid && this.id) {
    this.cartService.checkOutSessionByVisa(this.id, this.checkOutForm.value).subscribe({
      next: (res) => {
        if (res.status === "success") {
          window.open(res.session.url, "_self");
        }
      },
      error: (err) => console.log(err),
    });
  } else {
    console.log('Form invalid or ID missing');
  }
}


checkoutByCash(): void {
  if (this.checkOutForm.valid && this.id) {
    this.cartService.checkOutByCash(this.id, this.checkOutForm.value).subscribe({
      next: (res) => {
        if (res.status === "success") {
         this.toastrService.success(res.message, 'FreshCart')
         this.checkOutForm.reset()
         this.router.navigateByUrl('/allorders');

        }

      },
      error: (err) => console.log(err),
    });
  } else {
    console.log('Form invalid or ID missing');
  }
}





  




getCartId():void{

this.activatedRoute.paramMap.subscribe({

  next:(urlParams)=>{
    this.id=urlParams.get('id')

  }
})


}


initForm():void{

this.checkOutForm=this.fb.group({

  shippingAddress:this.fb.group({
    details:[null, [Validators.required]],
    phone:[null, [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
    city:[null, [Validators.required]],

  }),



})


}




}