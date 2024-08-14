import { environment } from '@env/environment';
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
  // 处理静态资源路径
  if (reqUrl.substring(0, 6) === 'assets') {
    return `./${reqUrl.startsWith('/') ? reqUrl.substring(1) : reqUrl}`;
  } else if (!reqUrl.startsWith('https://') && !reqUrl.startsWith('http://')) {
    // 处理后端请求URL
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

// 处理HTTP响应的数据
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

    // 克隆出一个带有新的URL的请求
    const newReq = req.clone({ url });


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
