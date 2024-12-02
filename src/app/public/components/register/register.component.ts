import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../../shared/serices/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private _AuthService:AuthService,private dialog: MatDialog,private _Router:Router) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Method to check if passwords match
  passwordsMatch(): boolean {
    return this.registerForm.get('userPassword')?.value === this.registerForm.get('confirmPassword')?.value;
  }

  // Method to handle form submission
  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      const formValues = this.registerForm.value;
      console.log('Form Submitted', formValues);
      this._AuthService.register(formValues).subscribe({
        next:(response)=> {
          console.log(response);
           this.openDialog(response.state,response.message);
          if (response.state==="failed") {
            this._Router.navigate(["/public/register"])
            console.log("failed");
            
          } else {
            this._Router.navigate(["/public/login"])


          }
        },
        error:(err)=> {
          console.log(err);
          this.openDialog("failed",err.message);
 
        },
      })
    } else {
      console.log('Form is invalid');
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  openDialog(state: string, message: string) {
    this.dialog.open(ResponseDialogComponent, {
      data: { state, message },
      width: '600px'
    });
  }
}
