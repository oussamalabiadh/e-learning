import { PublicationComponent } from './../../../admin/components/publication/publication.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/serices/auth.service';
import { PublicationService } from 'src/app/shared/serices/publication.service';
import { InstructorService } from '../../services/instructor.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-publication-instructor',
  templateUrl: './publication-instructor.component.html',
  styleUrls: ['./publication-instructor.component.css']
})
export class PublicationInstructorComponent implements OnInit {
deletePublication(pub: any) {
  console.log(pub);
  const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez supprimer cette publication "+pub.id+"?" }});
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.publicationService.deletePublication(pub.id).subscribe(
      {
        next:(response)=> {
          console.log(response);
          
this.loadPublication()
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
updatePublication(arg0: any) {
}
  publicationForm: FormGroup;
  selectedFile: File | null = null;
  fileUploadVisible = false;
  instructorId:number=0
  publication:any[]=[]
  instructor:any
  instructorInfoId(){
    this.instructorId= this._AuthService.getUserInfo().sub
   }
  constructor(private fb: FormBuilder, private publicationService: PublicationService,private dialog: MatDialog,
     private http: HttpClient, private _AuthService:AuthService, private _InstructorService:InstructorService ) {
    this.publicationForm = this.fb.group({
      description: [''],
      objectType: [''],
      file: [null]
    });;
  }
  ngOnInit(): void {
    this.instructorInfoId()
    this.loadPublication()
    this._InstructorService.getInstructorById(this.instructorId).subscribe({
      next:(value)=> {
        console.log(value);
         this.instructor=value
      },
      error(err) {
        console.log(err);
        
      },
    })
  }

  onObjectTypeChange(event: any): void {
    const selectedObjectType = event.target.value;
    this.fileUploadVisible = selectedObjectType === 'image' || selectedObjectType === 'pdf' || selectedObjectType === 'video';
  }



  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.publicationForm.patchValue({ file: file });
  }

  onSubmit(): void {
    const publicationData = {
      description: this.publicationForm.get('description')?.value,
      objectType: this.publicationForm.get('objectType')?.value
    };

    const file = this.publicationForm.get('file')?.value;

    this.publicationService.addPublication(this.instructorId, publicationData, file).subscribe({
      next:(value)=> {
        console.log(value);
        this.closeModal("staticBackdrop")
        this.openDialog(value.status,value.message)
        this.loadPublication()
      },
      error(err) {
        console.log(err);
        
      },
    });
  }
  loadPublication(){
    this.publicationService.getPublicationByInstructor(this.instructorId).subscribe({
      next:(value)=> {
        console.log("value",value);
        this.publication=value.data
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
  }
  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
  getPdfDownloadLink(base64String: string): string {
    return `data:application/pdf;base64,${base64String}`;
  }
  getPdfSrc(base64String: string): string {
    return `data:application/pdf;base64,${base64String}`;
  }
}
