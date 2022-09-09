import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
  // viewProviders: [
  //   {
  //     provide: ControlContainer,
  //     useExisting: FormGroupDirective
  //   }
  // ]
})
export class TextBoxComponent implements OnInit {
  
  @Input() placeholder:string = '';
  @Input() type:string = '';
  @Input() label:string = '';
  @Input() name:string = '';
  @Input() valid:boolean = true;
  @Input() control: FormControl | any;

  @Input() disabled:boolean = false;

  @Input() group:FormGroup | undefined;
  @Input() inputName:FormControl = new FormControl();

  @Input() errorMessage:string = '';
  @Input() instruction:string = '';
  @Input() value:string = '';
  // @Input() title:string = '';

  constructor() { }

  ngOnInit(): void {
    console.log('A component is loaded');
  }

  printErrors() {
    const { dirty, touched, errors } = this.control;
    console.log(dirty, touched, errors);
    return dirty && touched && errors;
  }

}
