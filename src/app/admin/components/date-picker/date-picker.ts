import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  imports: [FormsModule, NgbDatepickerModule],
  standalone: true,
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css'
})
export class DatePicker implements OnChanges {
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  datePicker: NgbDateStruct | null = null;
  maxDate: NgbDateStruct;
  minDate: NgbDateStruct;
  dateObject: NgbDateStruct | null = null;

  constructor() {
    const today = new Date();
    this.maxDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.minDate = { year: 1900, month: 1, day: 1 };
  }
 

  ngOnChanges(changes: SimpleChanges) {
    console.log('DatePicker.ngOnChanges', this.value); 
    if (changes['value'] && this.value) {
      this.dateObject = this.parseDate(this.value);
      this.datePicker = this.dateObject;//asigna el valor al datePicker
    }
  }

  onDateChange() {
    console.log('DatePicker.onDateChange', this.datePicker);
    if (this.datePicker) {
      this.valueChange.emit(this.formatDate(this.datePicker));
    } else {
      this.valueChange.emit('');
    }
  }

  private formatDate(date: NgbDateStruct): string {
    return `${date.year}/${date.month.toString().padStart(2, '0')}/${date.day.toString().padStart(2, '0')}`;
  }

  private parseDate(dateStr: string): NgbDateStruct | null {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return {
        year: parseInt(parts[0]),
        month: parseInt(parts[1]),
        day: parseInt(parts[2])
      };
    }
    return null;
  }
}
