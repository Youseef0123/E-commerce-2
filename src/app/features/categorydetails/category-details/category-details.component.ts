import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { CurrencyPipe} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../cart/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  imports: [CurrencyPipe, RouterLink,NgxPaginationModule, SearchPipe,FormsModule,CardComponent],
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService: CategoriesService = inject(CategoriesService);
  private readonly cartService: CartService = inject(CartService);
  private readonly authService: AuthService = inject(AuthService);

  private readonly toastrService = inject(ToastrService)
  private readonly dialog = inject(MatDialog);

  isLoading: boolean = false;
  text:string='';
  pageSize!:number;
  p!:number;
  total!:number;
  categoryId!: string;
  categoryDetails: any = {};
  categoryProducts: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('id')!;
      this.loadCategoryData();
    });
  }

  loadCategoryData(): void {
  
    this.categoriesService.getSpecificCategories(this.categoryId).subscribe({
      next: res => this.categoryDetails = res.data,
      error: err => console.log(err)
    });

  
    this.categoriesService.getProductsByCategory(this.categoryId).subscribe({
      next: res => this.categoryProducts = res.data,
      error: err => console.log(err)
    });
  }
}
