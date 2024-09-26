/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

/**
 * 点击节流指令
 */
@Directive({
  selector: '[click.debounceTime]'
})
export class DebounceTimeDirective implements OnDestroy {
  // eslint-disable-next-line @angular-eslint/prefer-output-readonly
  @Output('click.debounceTime') stopPropEvent = new EventEmitter<Event>();
  private $clickSubjector = new Subject<Event>();
  private subscription: Subscription;

  constructor() {
    this.subscription = this.$clickSubjector.pipe(debounceTime(200)).subscribe(e => {
      this.stopPropEvent.emit(e);
    });
  }

  @HostListener('click', ['$event']) onClick(e: Event) {
    this.$clickSubjector.next(e);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
