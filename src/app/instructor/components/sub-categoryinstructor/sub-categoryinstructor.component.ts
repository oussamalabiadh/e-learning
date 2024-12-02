import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/serices/auth.service';
import { InstructorService } from '../../services/instructor.service';
import { CoursesService } from 'src/app/shared/serices/courses.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as bootstrap from 'bootstrap';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';

@Component({
  selector: 'app-sub-categoryinstructor',
  templateUrl: './sub-categoryinstructor.component.html',
  styleUrls: ['./sub-categoryinstructor.component.css']
})
export class SubCategoryinstructorComponent implements OnInit {
  subCategoryId: number =0;
  instructorId: number = 0;
  instructorInfo: any;
  courseForm: FormGroup;
  submitted = false;
  imageBase64: string | null = null;
  imageError: string | null = null;
  imageBytes: string | undefined;
  courses:any[]=[]
  nombreCourses :any
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService,
    private instructorService: InstructorService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [null],
      prix: [0, Validators.required],
      solde: [0],
    });
  }
  truncateText(text: string, wordCount: number): string {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the "data:image/jpeg;base64," or similar prefix
        this.imageBytes = base64String.split(',')[1];
      };
      reader.readAsDataURL(file);
    }}
    load(){
      this.getInstructorInfo().pipe(
        switchMap((instructor) => {
          this.instructorInfo = instructor;
          return this.route.paramMap;
        }),
        switchMap((params) => {
          this.subCategoryId = +params.get('id')!;
          if (this.subCategoryId && this.instructorInfo) {
            return this.coursesService.getCoursesByInstructorAndSubCategoryId(this.instructorInfo.userID,this.subCategoryId );
          } else {
            return of([]); // Return an empty observable if no valid subCategoryId or instructorInfo
          }
        })
      ).subscribe({
        next: (response) => {
          console.log(response);
          this.courses=response.data
          this.nombreCourses = this.courses.length
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  ngOnInit(): void {
    this.instructorId = this.authService.getUserInfo().sub;
  this.load()
   
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
  openDialog(state: string, message: string) {
    this.dialog.open(ResponseDialogComponent, {
      data: { state, message },
      width: '600px'
    });
  }
  getInstructorInfo() {
    return this.instructorService.getInstructorById(this.instructorId);
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.courseForm.invalid) {
      return;
    }

    const course = {
      title: this.courseForm.get('title')?.value,
      description:  this.courseForm.get('description')?.value,
      imageUrl: this.imageBytes,
      prix:  this.courseForm.get('prix')?.value,
      solde:  this.courseForm.get('solde')?.value,
    };
    this.coursesService.addCourse(this.subCategoryId,this.instructorId,course).subscribe({
      next:(response) =>{
        console.log(response);
        this.closeModal("ajouteModal")
        this.openDialog(response.status , response.message)
        this.load()
      },
      error:(err) =>{
        console.log(err);
        this.closeModal("ajouteModal")
        this.openDialog("failed" , err.message)
        
      },
    })
  }
}
