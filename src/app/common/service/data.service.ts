import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Category } from '@common/interfaces/dataJson';
import { HttpRespone} from '@common/interfaces/HttpRespone';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 使用 BehaviorSubject 来存储数据
  private dataSubject = new Subject<Category[]>();

  // 将 BehaviorSubject 转换为 Observable
  public data$: Observable<Category[]> = this.dataSubject.asObservable();


  private destroy$ = new Subject<void>();

  // 构造函数
  constructor(private httpClient: HttpClient) {}

  // 加载数据
  loadData(): void {
    this.httpClient.get<HttpRespone<Category[]>>(`/read`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res && res.data) {
          // 发布数据到所有订阅者
          this.dataSubject.next(res.data);
        } else {
          console.error('Invalid response data:', res);
        }
      });
  }

  // 确保服务销毁时取消所有订阅
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.dataSubject.complete(); // 完成 BehaviorSubject 的通知
  }
}
