import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private deBouncer: Subject<string> = new Subject<string>();
  private deBouncerSubscription? : Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue : string ='';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.deBouncerSubscription = this.deBouncer.pipe(debounceTime(1000)).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.deBouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.deBouncerSubscription?.unsubscribe();
  }
}
