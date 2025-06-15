import { Component, computed, inject, Signal } from '@angular/core';
import { NumberUpdate } from '../../number-update';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-system',
  imports: [DecimalPipe],
  templateUrl: './system.html',
  styleUrl: './system.scss'
})
export class System {
 readonly counterService = inject(NumberUpdate);
  // The number signal is now directly from the service
  // You no longer need an @Input() for the number here, as it's directly accessible.
  // readonly number = this.counterService.count; // If you wanted a local signal reference

  // Computed signals now directly depend on counterService.count()
  readonly square: Signal<number | null> = computed(() => {
    const num = this.counterService.count(); // Get value from service signal
    if (typeof num === 'number' && !isNaN(num)) {
      return num * num;
    }
    return null;
  });

  readonly squareRoot: Signal<number | null> = computed(() => {
    const num = this.counterService.count(); // Get value from service signal
    if (typeof num === 'number' && !isNaN(num) && num >= 0) {
      return Math.sqrt(num);
    }
    return null;
  });

  readonly factorial: Signal<number | null> = computed(() => {
    const num = this.counterService.count(); // Get value from service signal
    if (typeof num !== 'number' || isNaN(num) || num < 0 || !Number.isInteger(num)) {
      return null;
    }
    if (num === 0) {
      return 1;
    }
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  });
}
