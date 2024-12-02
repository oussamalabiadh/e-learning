import { Component, OnInit } from '@angular/core';
import { ManagmentInstructorService } from '../../services/managment-instructor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  instructors:any[] =[]
  registerForm: FormGroup;
  showPassword: boolean = false;
  selectedInstructorId: number | null = null;  // Track selected category

  constructor(private _ManagmentInstructorService: ManagmentInstructorService ,private fb: FormBuilder, private dialog: MatDialog,private _Router:Router)
  {
    
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    this.loadInstructors()
  }
  loadInstructors(){
    this._ManagmentInstructorService.getAllInstructor().subscribe({
      next:(response)=> {
        console.log(response);
        this.instructors= response.data
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
  }
  // Method to check if passwords match
  passwordsMatch(): boolean {
    return this.registerForm.get('userPassword')?.value === this.registerForm.get('confirmPassword')?.value;
  }
  truncateText(text: string, wordCount: number): string {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  }
  // Method to handle form submission
  addInstructor() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      const formValues = this.registerForm.value;
      console.log('Form Submitted', formValues);
      this._ManagmentInstructorService.addInstructor(formValues).subscribe({
        next:(response)=> {
          console.log(response);
          this.closeModal("updateModal")
           this.openDialog(response.state,response.message);
           this.loadInstructors()
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
  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
      document.querySelector('.modal-backdrop')?.remove();
    } else {
      console.error(`Modal with ID '${modalId}' not found.`);
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
  view(instructor:any){
    console.log(instructor);
    
    this.selectedInstructorId =instructor.userID;
    console.log(this.selectedInstructorId);
    

    // Remove the yellow background from any previously selected card
  const previousCard = document.querySelector('.card.bg-warning');
  if (previousCard) {
    previousCard.classList.remove('bg-warning');
  }

  // Find the card corresponding to the clicked element using the provided id
  const selectedCard = document.querySelector(`#card-${instructor.userID}`);
  if (selectedCard) {
    selectedCard.classList.add('bg-warning');
  }
  }

}
