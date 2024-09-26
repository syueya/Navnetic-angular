/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[cmHide]'
})
export class CmHideDirective {
  private originDisplay = '';

  constructor(private elementRef: ElementRef<any>) {
    this.originDisplay = elementRef.nativeElement.style.display;
  }

  @Input() set cmHide(condition: boolean) {
    {
      if (this.elementRef.nativeElement.style) {
        if (condition) {
          this.elementRef.nativeElement.style.display = 'none';
        } else {
          this.elementRef.nativeElement.style.display = this.originDisplay;
        }
      }
    }
  }
}
