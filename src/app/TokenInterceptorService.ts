import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService, private toastr:ToastrService ) {}
  intercept(request: HttpRequest<any>,next: HttpHandler
  ): Observable<HttpEvent<any>> {
      const token =
        localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-api-key': `${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 500) {
          this.userService.logout();
        }
        if (err.status === 409 || err.status === 401 ) {
          this.toastr.error(err.error.message) 
          this.userService.logout()
        } else if (err.status === 400 || err.status === 404) {
          this.toastr.error(err.error.message); 
          
        }
        const error = err.message||  err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
