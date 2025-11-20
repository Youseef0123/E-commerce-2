import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { CategoriesService } from '../../../../core/services/categories/categories.service';

import { Categories } from '../../../../core/models/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {
 categoriesList:Categories[]=[]
  private readonly categoriesService  = inject(CategoriesService)



  categoriesOptions: OwlOptions = {
    margin:15,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true ,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData():void{

this.categoriesService.getAllCategories().subscribe({

  next:(res)=>{
    console.log(res.data)
    this.categoriesList=res.data
  },
  error:(err)=>{
    console.log(err);
    
  }


})



  }
}
