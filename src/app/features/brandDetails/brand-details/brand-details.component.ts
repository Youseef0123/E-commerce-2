import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe} from '@angular/common';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { CartService } from '../../cart/services/cart.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink,NgxPaginationModule, SearchPipe,FormsModule,CardComponent],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent implements OnInit {
  private readonly brandsService: BrandsService = inject(BrandsService);
  private readonly cartService: CartService = inject(CartService);
  private readonly authService: AuthService = inject(AuthService);

  private readonly toastrService = inject(ToastrService)
  private readonly dialog = inject(MatDialog);


  private readonly activatedRoute = inject(ActivatedRoute);
  isLoading: boolean = false;
  text:string='';
  pageSize!:number;
  p!:number;
  total!:number;
  brandId!: string;
  brandDetails: any = {};
  brandProducts: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.brandId = params.get('id')!;
      this.loadBrandData();
    });
  }

  loadBrandData(): void {
  
    this.brandsService.getSpecificBrand(this.brandId).subscribe({
      next:(res)  => this.brandDetails = res.data,
      error: (err) => console.log(err)
    });

   
    this.brandsService.getProductsByBrand(this.brandId).subscribe({
      next: res => {
        console.log('Brand Products:', res.data);
        this.brandProducts = res.data;
      },
      error: err => console.log(err)
    });
  }
}
