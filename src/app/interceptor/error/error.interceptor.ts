import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}
