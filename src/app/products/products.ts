import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';

// Interface to structure the elapsed time data
interface ElapsedTimeData {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-products',
  imports: [DatePipe],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit, OnDestroy {
currentDateTime: WritableSignal<Date> = signal(new Date());

  // Define the fixed start date (January 1, 2000, 00:00:00)
  private readonly date2000: Date = new Date('2000-01-01T00:00:00');

  // This will be calculated dynamically in ngOnInit for the current year
  private currentYearStartDate: Date = new Date();

  // Signals to hold the calculated elapsed time data
  elapsedFrom2000: WritableSignal<ElapsedTimeData | null> = signal(null);
  elapsedFromCurrentYear: WritableSignal<ElapsedTimeData | null> = signal(null);

  private intervalId: any; // To store the interval ID for cleanup

  ngOnInit(): void {
    // Set the start date for the current year (Jan 1st of the current year, 00:00:00)
    const now = new Date();
    this.currentYearStartDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0);

    // Perform an initial update immediately
    this.updateTimeDisplays();

    // Set up an interval to update the display every second
    this.intervalId = setInterval(() => {
      this.updateTimeDisplays();
    }, 1000); // Update every 1000 milliseconds (1 second)
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Updates all time displays based on the current time.
   */
  private updateTimeDisplays(): void {
    const now = new Date();
    this.currentDateTime.set(now); // Update the current date/time signal

    // Calculate elapsed time from Jan 1, 2000
    this.elapsedFrom2000.set(this.calculateElapsedTime(this.date2000, now));

    // Calculate elapsed time from the start of the current year
    this.elapsedFromCurrentYear.set(this.calculateElapsedTime(this.currentYearStartDate, now));
  }

  /**
   * Calculates the elapsed time between two dates and breaks it down into components.
   *
   * This implementation calculates:
   * - `years`, `months`, `days`: As a "duration" (e.g., 2 years, 3 months, 10 days).
   * - `weeks`, `hours`, `minutes`, `seconds`: As total counts (e.g., total seconds, total minutes, etc.).
   *
   * This combination generally matches the common understanding of such a request.
   *
   * @param startDate The starting Date object.
   * @param endDate The ending Date object.
   * @returns An ElapsedTimeData object.
   */
  private calculateElapsedTime(startDate: Date, endDate: Date): ElapsedTimeData {
    // Calculate total milliseconds difference
    const diffMillis = endDate.getTime() - startDate.getTime();

    // Calculate total counts for smaller units directly from milliseconds
    const totalSeconds = Math.floor(diffMillis / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);

    // For years and months, use calendar-aware difference to be more precise about "duration"
    // (e.g., Feb 1 to Mar 1 is 1 month, not just ~30 days)
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate(); // This will be the remaining days within the month

    // Adjust for negative days (e.g., if end date's day is smaller than start date's day)
    if (days < 0) {
      months--; // Decrement month as a full month hasn't passed since the day of month
      // Add the number of days in the *previous* month of the endDate to 'days'
      const prevMonthDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prevMonthDate.getDate();
    }
    // Adjust for negative months
    if (months < 0) {
      years--; // Decrement year as a full year hasn't passed since the month of year
      months += 12; // Add 12 months to get positive value
    }

    return {
      years: years,
      months: months,
      weeks: totalWeeks,    // Total number of full weeks passed
      days: totalDays,      // Total number of full days passed
      hours: totalHours,    // Total number of full hours passed
      minutes: totalMinutes, // Total number of full minutes passed
      seconds: totalSeconds  // Total number of full seconds passed
    };
  }
}
