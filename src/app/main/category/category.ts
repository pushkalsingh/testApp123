import { Component, computed, inject, Signal } from '@angular/core';
import { NumberUpdate } from '../../number-update';

// Define an interface for the data structure of each row
interface MathRow {
  number: number;
  isPrime: boolean;
  square: number;
  cube: number;
  runningSum: number;
}

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})


export class Category {
readonly counterService = inject(NumberUpdate);
  /**
   * Computed signal that generates an array of MathRow objects.
   * This array will contain all the calculated values for each number
   * from 1 up to the current count from the service.
   */
  readonly mathRows: Signal<MathRow[]> = computed(() => {
    const count = this.counterService.count();
    if (count <= 0) {
      return [];
    }

    const rows: MathRow[] = [];
    let currentSum = 0; // Initialize running sum

    for (let i = 1; i <= count; i++) {
      currentSum += i; // Update running sum for the current number

      rows.push({
        number: i,
        isPrime: this.isPrime(i),
        square: i * i,
        cube: i * i * i,
        runningSum: currentSum
      });
    }
    return rows;
  });

  /**
   * Helper function to check if a number is prime.
   * Reused logic from previous components.
   * @param num The number to check.
   * @returns True if prime, false otherwise.
   */
  private isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true; // 2 and 3 are prime
    if (num % 2 === 0 || num % 3 === 0) return false; // Divisible by 2 or 3
    // Check for primes of the form 6k ± 1
    for (let i = 5; i * i <= num; i = i + 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }
}
