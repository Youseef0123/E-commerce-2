import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const toastrService =inject(ToastrService)
// REQ


  return next(req).pipe(catchError(  (err)=>{
// logic


toastrService.error(err.error.message)


return throwError(  ()=>err  )

  }  ))
};


// كدا اكون هندلت كل الايرور فى الابلكيشن من مكان واحد