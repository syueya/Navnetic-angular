import { environment } from '../../../environments/environment';
import { Injector, inject } from '@angular/core';
import { Observable, of, throwError, mergeMap, catchError } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpResponseBase
} from '@angular/common/http';





// 处理URL
function processUrl(reqUrl: string, backEndUrl: string): string {
  // 统一处理URL，提高代码的清晰度和可维护性
  if (reqUrl.substring(0, 6) === 'assets') {
    return `./${reqUrl.startsWith('/') ? reqUrl.substring(1) : reqUrl}`;
  } else if (!reqUrl.startsWith('https://') && !reqUrl.startsWith('http://')) {
    // 确保backEndUrl是安全的，避免潜在的注入风险
    if (typeof backEndUrl !== 'string' || backEndUrl.trim() === '') {
      throw new Error('Invalid backend URL');
    }
    const adjustedBackEndUrl = backEndUrl.endsWith('/') ? backEndUrl.slice(0, -1) : backEndUrl;
    return adjustedBackEndUrl + (adjustedBackEndUrl.endsWith('/') && reqUrl.startsWith('/')
                                 ? reqUrl.substring(1)
                                 : reqUrl);
  }
  return reqUrl;
}

// 处理数据
function handleData(injector: Injector, ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  if (ev instanceof HttpResponse) {
    const body = ev.body;

    if (body && body.code > 20000) {
      // 处理错误，仅打印错误信息
      console.error('Error:', body.message);
    }

    // 不管有没有错误，都返回响应体
    return of(ev);
  }

  if (ev instanceof HttpErrorResponse) {
    // 打印未知错误
    console.warn('Unknown error occurred:', ev);
    return throwError(() => ev);
  }

  return of(ev);
}


// 默认拦截器
export const defaultInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const injector = inject(Injector);

  // 统一加上服务端前缀
  const url = processUrl(req.url, environment.backEndUrl);

    // 将请求发送给下一个拦截器或后端服务
    const newReq = req.clone({
      url, headers: req.headers.set('Authorization', 'Bearer your-token-here')
    });


    // 统一错误处理
    return next(newReq).pipe(
      mergeMap((response: HttpEvent<any>) => {
        // 允许统一对请求错误处理
        if (response instanceof HttpResponseBase) {
          return handleData(injector, response, newReq, next);
        }
        // 若一切都正常，则后续操作
        return of(response);
      }),
      catchError((err: HttpErrorResponse) => handleData(injector, err, newReq, next))
    );



}
