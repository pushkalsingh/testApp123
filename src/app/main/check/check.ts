import { Component, computed, inject, Signal } from '@angular/core';
import { NumberUpdate } from '../../number-update';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-check',
  imports: [DecimalPipe],
  templateUrl: './check.html',
  styleUrl: './check.scss'
})
export class Check {
  readonly counterService = inject(NumberUpdate);

  /**
   * Generates an array of numbers from 1 up to the given maxNumber.
   * This is used by the @for loop in the template.
   */
  getNumbersArray(maxNumber: number): number[] {
    if (maxNumber <= 0) {
      return [];
    }
    const numbers = [];
    for (let i = 1; i <= maxNumber; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  // --- Calculation Helper Functions ---

  calculateSquare(num: number): number {
    return num * num;
  }

  calculateSquareRoot(num: number): number {
    // We already handle num <= 0 with the @if condition in the template,
    // so no need to check here for Math.sqrt.
    return Math.sqrt(num);
  }

  calculateFactorial(num: number): number | null {
    if (num < 0 || !Number.isInteger(num)) {
      return null; // Should not happen with current logic, but good for robustness
    }
    if (num === 0) {
      return 1;
    }
    // Handle large numbers that might exceed JavaScript's safe integer limit
    // For very large numbers, factorial can quickly become 'Infinity'
    if (num > 20) { // Factorial of 21 is already too large for standard Number
      return null; // Indicate that it's too large to calculate accurately
    }
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  }
}
