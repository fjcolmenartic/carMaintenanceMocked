import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ListBoxComponent } from './list-box/list-box.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // NavigationBarComponent
  
    ListBoxComponent,
    TextBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // NavigationBarComponent
  ]
})

export class SharedModule { }
