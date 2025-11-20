// 
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input/input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,  InputComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy, OnInit {
  flag: boolean = true;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  msgError: string = '';
  isLoading: boolean = false;
  sub?: Subscription;

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  
  initForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("^01[0-2,5]{1}[0-9]{8}$")])
    }, { validators: this.confirmPassword });
  }


  confirmPassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get rePassword() { return this.registerForm.get('rePassword'); }
  get phone() { return this.registerForm.get('phone'); }
 
  submitForm(): void {
    if (this.registerForm.valid) {
      if (this.sub) this.sub.unsubscribe();

      this.isLoading = true;
      this.sub = this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.msgError = '';
            this.router.navigate(['/login']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.msgError = err.error.message;
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
