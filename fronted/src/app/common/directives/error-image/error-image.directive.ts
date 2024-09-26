import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * 图片加载失败时显示默认图片
 */
@Directive({
  selector: 'img[cmErrorImage]',
})
export class ErrorImageDirective {

  @Input() appErrorImage: string = ''; // 默认图片地址

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.appErrorImage || '/assets/images/default-empty.png';
  }

}
