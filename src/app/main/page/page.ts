import { Component, computed, inject, Signal } from '@angular/core';
import { NumberUpdate } from '../../number-update';

@Component({
  selector: 'app-page',
  imports: [],
  templateUrl: './page.html',
  styleUrl: './page.scss'
})
export class Page {
readonly counterService = inject(NumberUpdate);
  // Computed signal for the first N prime numbers
  readonly firstNPrimes: Signal<number[]> = computed(() => {
    const count = this.counterService.count();
    if (count <= 0) {
      return [];
    }
    // Limit to a reasonable number to avoid performance issues for very large counts
    // You can adjust this limit based on expected use and performance needs
    const limit = Math.min(count, 1000); // e.g., don't try to find more than 1000 primes
    return this.getPrimes(limit);
  });

  // Computed signal for the first N Fibonacci numbers
  readonly firstNFibonacci: Signal<number[]> = computed(() => {
    const count = this.counterService.count();
    if (count <= 0) {
      return [];
    }
    // Limit to a reasonable number to avoid very large Fibonacci numbers or performance issues
    const limit = Math.min(count, 90); // Fibonacci(93) is the first that exceeds Number.MAX_SAFE_INTEGER
    return this.getFibonacci(limit);
  });

  /**
   * Helper function to check if a number is prime.
   * Optimized for better performance.
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

  /**
   * Generates an array containing the first 'n' prime numbers.
   * @param n The number of prime numbers to generate.
   * @returns An array of prime numbers.
   */
  private getPrimes(n: number): number[] {
    const primes: number[] = [];
    let num = 2; // Start checking from the first prime number
    while (primes.length < n) {
      if (this.isPrime(num)) {
        primes.push(num);
      }
      num++;
    }
    return primes;
  }

  /**
   * Generates an array containing the first 'n' Fibonacci numbers.
   * @param n The number of Fibonacci numbers to generate.
   * @returns An array of Fibonacci numbers.
   */
  private getFibonacci(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const fib: number[] = [0, 1];
    while (fib.length < n) {
      const nextFib = fib[fib.length - 1] + fib[fib.length - 2];
      // Prevent overflow for very large numbers
      // Fibonacci(93) is the first that exceeds Number.MAX_SAFE_INTEGER
      if (nextFib > Number.MAX_SAFE_INTEGER || nextFib < 0) { // Check for potential negative due to overflow
        console.warn(`Fibonacci sequence stopped at ${fib.length} elements due to exceeding MAX_SAFE_INTEGER.`);
        break;
      }
      fib.push(nextFib);
    }
    return fib;
  }
}
