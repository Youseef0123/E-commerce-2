import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, NgClass, ɵEmptyOutletComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input() control!:any;
  @Input() labelInput!:string;
  @Input() idInput!:string;
  @Input() typeInput!:string;
  @Input() element:string='input';
  flag:boolean=true;
  
}
