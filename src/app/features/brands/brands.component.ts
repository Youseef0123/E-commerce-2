
import { RouterLink } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [RouterLink, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  private readonly brandsService=inject(BrandsService)
  brands: any[] = [];


  ngOnInit(): void {
    this.getBrands();
  }

 
  getBrands(): void {
    this.brandsService.getAllbrands().subscribe({
      next: (res) => {
        this.brands = res.data;  
      },
      error: (err) => console.log(err),
    });
  }
}
