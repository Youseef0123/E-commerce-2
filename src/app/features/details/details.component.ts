import { LoginComponent } from './../../core/auth/login/login.component';
import { AuthService } from './../../core/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { Products } from '../../core/models/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-details',
  imports: [MatDialogModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
id:string | null =null
productDetails:Products = { } as Products
  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly detailsService = inject(DetailsService)
  private readonly cartService= inject(CartService)
  private readonly toastrService= inject(ToastrService)
  private readonly authService= inject(AuthService)
  private readonly dialog = inject(MatDialog);


ngOnInit(): void {
  this.getDetails();
  this.getProductDetails()
}


  addProductToCart(id: string): void {
    if (!this.authService.isLogged()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '90%',
        minWidth: '700px',
      });
  
      dialogRef.afterClosed().subscribe(() => {
        if (this.authService.isLogged()) {
          this.addProductToCart(id); 
        }
      });
  
      return;
    }
  
   
  
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message, 'FreshCart');
        }
       
      },
      error: (err) => {
        console.log(err);
        
      }
    });
  }
  



getDetails():void{
this.activatedRoute.paramMap.subscribe({
next:(urlParams)=>{

  this.id=urlParams.get('id');
  
}
 



})



}



getProductDetails():void{


  this.detailsService.getSpecificProduct(this.id).subscribe({
    next:(res)=>{
      this.productDetails=res.data;
      
    },

    error:(err)=>{
      console.log(err);
      
    }



  })
}


}
