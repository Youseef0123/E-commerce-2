import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Products } from '../../../core/models/products.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
cartNumber:WritableSignal<number>=signal(0);


  addToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',

      {
        productId: id,
      }
    );
  }

  cartLogged(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${id}`,

      {
        count: count,
      }
    );
  }

  checkOutSessionByVisa(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`,
      data
    ).pipe(
      tap(() => {
        // نصفر الكارت بعد نجاح إنشاء جلسة الدفع
        this.cartNumber.set(0);
      })
    );
  }
  
  checkOutByCash(id: string, data: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}`, {
      shippingAddress: data.shippingAddress
    }).pipe(
      tap(() => {
        // إعادة تعيين الكارت بعد الدفع
        this.cartNumber.set(0);
      })
    );
  }
  


  getUserOrder(userId:string|null=null):Observable<any>{

    return this.httpClient.get(environment.baseUrl + `orders/user/${userId}`);
  }
}