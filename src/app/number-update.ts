import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberUpdate {

  constructor() { }
private _count = signal(0); // Private writable signal

  // Expose a read-only version of the signal for consumers
  readonly count: WritableSignal<number> = this._count;

  increment() {
    this._count.update((value: number) => value + 1);
  }

  decrement() {
    this._count.update((value: number) => value - 1);
  }

  setCount(newCount: number) {
    this._count.set(newCount);
  }
}
