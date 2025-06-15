import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  imports: [FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
// Signals to bind to the input fields. Using string type for easier input handling.
  num1: WritableSignal<string> = signal('');
  num2: WritableSignal<string> = signal('');

  // Signal to store the result of the calculation
  result: WritableSignal<number | string | null> = signal(null); // Can be number or error message string

  // Signal to store any error messages
  errorMessage: WritableSignal<string | null> = signal(null);

  /**
   * Resets the result and error messages before a new calculation.
   */
  private clearResults(): void {
    this.result.set(null);
    this.errorMessage.set(null);
  }

  /**
   * Parses the input string signals into numbers.
   * Returns an object with parsed numbers, or null if parsing fails.
   */
  private parseInputs(): { n1: number | null, n2: number | null } {
    const parsedN1 = parseFloat(this.num1());
    const parsedN2 = parseFloat(this.num2());
    return {
      n1: isNaN(parsedN1) ? null : parsedN1,
      n2: isNaN(parsedN2) ? null : parsedN2
    };
  }

  /**
   * Performs addition of num1 and num2.
   */
  add(): void {
    this.clearResults();
    const { n1, n2 } = this.parseInputs();
    if (n1 === null || n2 === null) {
      this.errorMessage.set('Please enter valid numbers in both fields for addition.');
      return;
    }
    this.result.set(n1 + n2);
  }

  /**
   * Performs subtraction of num2 from num1.
   */
  subtract(): void {
    this.clearResults();
    const { n1, n2 } = this.parseInputs();
    if (n1 === null || n2 === null) {
      this.errorMessage.set('Please enter valid numbers in both fields for subtraction.');
      return;
    }
    this.result.set(n1 - n2);
  }

  /**
   * Performs multiplication of num1 and num2.
   */
  multiply(): void {
    this.clearResults();
    const { n1, n2 } = this.parseInputs();
    if (n1 === null || n2 === null) {
      this.errorMessage.set('Please enter valid numbers in both fields for multiplication.');
      return;
    }
    this.result.set(n1 * n2);
  }

  /**
   * Performs division of num1 by num2. Handles division by zero.
   */
  divide(): void {
    this.clearResults();
    const { n1, n2 } = this.parseInputs();
    if (n1 === null || n2 === null) {
      this.errorMessage.set('Please enter valid numbers in both fields for division.');
      return;
    }
    if (n2 === 0) {
      this.errorMessage.set('Error: Cannot divide by zero.');
      return;
    }
    this.result.set(n1 / n2);
  }

  /**
   * Calculates the square of num1.
   */
  square(): void {
    this.clearResults();
    const parsedN1 = parseFloat(this.num1());
    if (isNaN(parsedN1)) {
      this.errorMessage.set('Please enter a valid number in the first field for square operation.');
      return;
    }
    this.result.set(parsedN1 * parsedN1);
  }

  /**
   * Calculates the square root of num1. Handles negative numbers.
   */
  squareRoot(): void {
    this.clearResults();
    const parsedN1 = parseFloat(this.num1());
    if (isNaN(parsedN1)) {
      this.errorMessage.set('Please enter a valid number in the first field for square root operation.');
      return;
    }
    if (parsedN1 < 0) {
      this.errorMessage.set('Error: Cannot calculate square root of a negative number.');
      return;
    }
    this.result.set(Math.sqrt(parsedN1));
  }
}
