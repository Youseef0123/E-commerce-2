import { Category } from './../../core/models/products.interface';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {


  private readonly categoriesService=inject(CategoriesService)
 
  categories: any[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data; 
      },
      error: (err) => console.log(err),
    });
  }
}
