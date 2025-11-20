import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CartService } from '../../cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private readonly httpClient= inject(HttpClient)
  

  getSpecificProduct(id:string | null):Observable<any>{

    return this.httpClient.get(environment.baseUrl +`products/${id}`);
  


  }
 
  getSpecificCategory(id:string | null):Observable<any>{

    return this.httpClient.get(environment.baseUrl +`products/${id}`);
  


  }


  

 
  
}
