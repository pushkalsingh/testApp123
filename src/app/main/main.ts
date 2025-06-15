import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NumberUpdate } from '../number-update';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  // Inject the service using the `inject` function (recommended in modern Angular)
  readonly counterService = inject(NumberUpdate);

  // You can also expose the signal directly if you prefer, but often it's
  // cleaner to access it through the service instance in the template.
  // myCountSignal = this.counterService.count; // Example if you wanted a direct reference

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }

  reset() {
    this.counterService.setCount(0);
  }

}
