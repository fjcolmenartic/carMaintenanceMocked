import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.css']
})
export class ListBoxComponent implements OnInit {

  @Input() title:string = '';
  @Input() name:string = '';
  @Input() values:string[] = [];
  @Input() selectedValue:string = '';
  @Input() selected:boolean = false;
  @Input() control: FormControl | any;

  constructor() {}

  ngOnInit(): void {}

}
