import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-utils',
  imports: [],
  templateUrl: './utils.html',
  styleUrl: './utils.css'
})
export class Utils {

  public convertToYyyyMmDd(date: NgbDateStruct | null): string {
    if (!date) return '';
    
    const year = date.year;
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    
    return `${year}/${month}/${day}`;
  }

}
