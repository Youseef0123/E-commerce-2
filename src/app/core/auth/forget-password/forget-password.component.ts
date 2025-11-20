import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input/input.component";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router)

  verifyEmail!:FormGroup
  verifyCode!:FormGroup
  resetPass!:FormGroup
step:number=1;
ngOnInit(): void {
  this.initForm()
}



  initForm():void{

this.verifyEmail=this.fb.group({
  email:[null,[Validators.required,Validators.email]]
})
this.verifyCode=this.fb.group({
  resetCode:[null,[Validators.required]]
})
this.resetPass=this.fb.group({
  email:[null,[Validators.required,Validators.email]],
  newPassword:[null,[Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]]
})


  }


formStep1():void{
if(this.verifyEmail.valid){

  this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
  next:(res)=>{
    console.log(res)
    this.step=2;
  }
})
}



}
formStep2():void{
if(this.verifyCode.valid){

  this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
  next:(res)=>{
    console.log(res)
    this.step=3;

   
    this.resetPass.get('email')?.setValue(
      this.verifyEmail.get('email')?.value)
  }
})
}



}
formStep3():void{
if(this.resetPass.valid){

  this.authService.submitResetPassword(this.resetPass.value).subscribe({
  next:(res)=>{
    console.log(res)
// save token
this.cookieService.set('token',res.token)
// navigate to home
 this.router.navigate(['/home']);
  }
})
}



}

}
