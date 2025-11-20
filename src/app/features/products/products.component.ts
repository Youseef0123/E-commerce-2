import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../core/models/products.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CardComponent,NgxPaginationModule, SearchPipe,CurrencyPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {


  productList:WritableSignal<Products[]>=signal([]) ;
  text:string='';
  pageSize!:number;
  p!:number;
  total!:number;
  private readonly productsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.getAllProductData();
  }

  getAllProductData(pageNumber: number = 1): void {
    this.ngxSpinnerService.show()
    this.productsService.getAllProduct(pageNumber).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
        this.p = res.metadata.currentPage;
        this.pageSize = res.metadata.limit;
        this.total = res.results;
        this.ngxSpinnerService.hide()
        
        // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
      },
      error: (err) => {
        console.log(err);
        this.ngxSpinnerService.hide()
      },
    });
  }
}
