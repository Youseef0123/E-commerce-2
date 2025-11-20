import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Products } from '../../../../core/models/products.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit{
  

  productList:Products[]=[];

   private readonly productsService =inject(ProductsService)



   ngOnInit(): void {
     this.getAllProductData();
   }


getAllProductData():void{

this.productsService.getAllProduct().subscribe({

  next:(res)=>{
console.log(res.data);
this.productList=res.data
    
  },
  error:(err)=>{

console.log(err)
  }





})



}



}
