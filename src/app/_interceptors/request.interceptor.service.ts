import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class RequestInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if( localStorage.getItem('token') != null ) {
        const clonedReq = req.clone( {
            headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        } );
        return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
