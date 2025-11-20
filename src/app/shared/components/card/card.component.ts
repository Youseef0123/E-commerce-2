import { AuthService } from './../../../core/auth/services/auth.service';

import { Component, inject, Input} from '@angular/core';
import { Products } from '../../../core/models/products.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../../../core/auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe,TermPipe,MatDialogModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private readonly cartService = inject(CartService)
  private readonly authService = inject(AuthService)
  private readonly toastrService = inject(ToastrService)
  private readonly dialog = inject(MatDialog);

  isLoading: boolean = false;
 
  @Input({required:true}) product:Products ={} as Products;
 


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
  
    this.isLoading = true; 
  
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message, 'FreshCart');
        }
        this.isLoading = false; 
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false; 
      }
    });
  }
  

}
