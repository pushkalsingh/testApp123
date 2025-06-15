import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit {
// Signal to store the selected date of birth as a string (YYYY-MM-DD)
  // This matches the format of input type="date"
  selectedDob: WritableSignal<string | null> = signal(null);

  // Signal to store the calculated age
  age: WritableSignal<number | null> = signal(null);

  // Optional: A message for invalid input
  errorMessage: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    // You could pre-fill with a default date or retrieve from storage here if needed
  }

  onDobChange(): void {
    this.errorMessage.set(null); // Clear previous errors
    const dobString = this.selectedDob();

    if (!dobString) {
      this.age.set(null);
      this.errorMessage.set("Please select a date of birth.");
      return;
    }

    const birthDate = new Date(dobString);
    const today = new Date();

    // Basic validation: Check if birthDate is a valid date and not in the future
    if (isNaN(birthDate.getTime())) {
      this.age.set(null);
      this.errorMessage.set("Invalid date format.");
      return;
    }
    if (birthDate > today) {
      this.age.set(null);
      this.errorMessage.set("Date of birth cannot be in the future.");
      return;
    }

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    this.age.set(calculatedAge);
  }
}
