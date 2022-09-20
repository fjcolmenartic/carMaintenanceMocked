import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxComponent } from './list-box/list-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListBoxComponent
  ]
})

export class SharedModule { }
