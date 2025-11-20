import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // injection httpclient

  private readonly httpClient = inject(HttpClient);
  getAllProduct(pageNumber: number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?page=${pageNumber}`
      
    );
  }

  // بعدها اسال نفسى عايز تعمل ريتيرن اللى راجع من ال جيت دا امتى؟ اما افتح الهوم, يبقى اروح الهوم
}
