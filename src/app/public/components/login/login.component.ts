import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/serices/auth.service';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private _AuthService: AuthService, private dialog: MatDialog, private _Router: Router) {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      this._AuthService.login(formValues).subscribe({
        next: (response) => {
          if (response.status) {
            console.log(response);
             
            this.navigateBasedOnRole();
          }
          this.openDialog(response.status, response.message);
        },
        error: (err) => {
          this.openDialog("failed", err.message);
        },
      });
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

  private navigateBasedOnRole(): void {
    const role = this._AuthService.getRole();
    if (role === 'ADMIN') {
      this._Router.navigate(['admin']);
    } else if (role === 'INSTRUCTOR') {
      this._Router.navigate(['/instructor']);
    } else if (role === 'USER') {
      this._Router.navigate(['/user']);
    } else {
      this._Router.navigate(['/login']);
    }
  }
}
