import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;
  @Input() patternMatchMessage: string;
  @Input() value: any;

  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    const { touched, errors } = this.control;
    return touched && errors;
  }

  showErrorsDetails() {
    const error = `      
      touched: ${this.control.touched},
      errors: ${JSON.stringify(this.control.errors)}
    `;
    return error;
  }
}
