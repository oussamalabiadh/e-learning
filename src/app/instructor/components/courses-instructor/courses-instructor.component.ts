import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';
import { AuthService } from 'src/app/shared/serices/auth.service';
import { CoursesService } from 'src/app/shared/serices/courses.service';

@Component({
  selector: 'app-courses-instructor',
  templateUrl: './courses-instructor.component.html',
  styleUrls: ['./courses-instructor.component.css']
})
export class CoursesInstructorComponent implements OnInit {
  instructorId:number=0
  courseForm: FormGroup;
  submitted = false;
  imageBase64: string | null = null;
  imageError: string | null = null;
  imageBytes: string | undefined;
 courses:any[]=[]
 selectedCourse: any; // Pour stocker les détails du cours sélectionné

 coursesCount:any
constructor(private _CoursesService:CoursesService ,private _AuthService:AuthService, private fb: FormBuilder,
  private dialog: MatDialog, private router:Router){
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
  ngOnInit(): void {
    this.instructorInfoId()
    this.loadCourses()
  }
  instructorInfoId(){
    this.instructorId= this._AuthService.getUserInfo().sub
   }
  loadCourses(){
    this._CoursesService.getCoursesByInstructor(this.instructorId).subscribe({
      next:(value)=> {
        console.log(value);
        this.courses= value.data;
        this.coursesCount=this.courses.length
      },
      error(err) {
        console.log(err);
        
      },
    })

  }
  updateCourse(courseId:any){
// Récupérer les détails du cours en utilisant courseId, si nécessaire
this.selectedCourse = this.courses.find(c => c.id === courseId);

// Pré-remplir le formulaire avec les valeurs actuelles
this.courseForm.patchValue({
  title: this.selectedCourse.title,
  description: this.selectedCourse.description,
  prix: this.selectedCourse.prix,
  solde: this.selectedCourse.solde
});    
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
  deleteCourse(ele:any){
    console.log(ele);
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez supprimer cette cours "+ele.name+"?" }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._CoursesService.deleteCourse(ele.id).subscribe(
        {
          next:(response)=> {
            console.log(response);
            
  this.openDialog(response.state , response.message)
  this.loadCourses()
          },
          error:(error) => {
            console.log(error);
            
            this.openDialog("failed", error.message);
  
          }
        }
        );
      }
    });
  }
  viewCourse(id:any){
    this.router.navigate(['/instructor/coursesInstructorDetails',id])
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
    this._CoursesService.updateCourse(this.selectedCourse.id,course).subscribe({
      next:(response) =>{
        console.log(response);
        this.closeModal("updateModal")
        this.openDialog(response.status , response.message)
        this.loadCourses()
      },
      error:(err) =>{
        console.log(err);
        this.closeModal("updateModal")
        this.openDialog("failed" , err.message)
        
      },
    })
  }


}
