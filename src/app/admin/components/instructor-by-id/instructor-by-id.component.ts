import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ManagmentInstructorService } from '../../services/managment-instructor.service';
import { MatDialog } from '@angular/material/dialog';
import * as bootstrap from 'bootstrap';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';

@Component({
  selector: 'app-instructor-by-id',
  templateUrl: './instructor-by-id.component.html',
  styleUrls: ['./instructor-by-id.component.css']
})
export class InstructorByIdComponent implements OnChanges {
  showAbout: boolean = false;
  showPublications: boolean = false;
  isActive: string = '';  // Pour suivre quel onglet est actif

  viewAbout() {
    this.showAbout = true;
    this.showPublications = false;
    this.isActive = 'about';  // Définir 'about' comme l'onglet actif

  }

  viewPublication() {
    this.showAbout = false;
    this.showPublications = true;
    this.isActive = 'publication';  // Définir 'publication' comme l'onglet actif

  }
  instructorDetails:any
  @Input() instructorId: number | null = null;
  constructor(private _ManagmentInstructorService:ManagmentInstructorService ,  private dialog: MatDialog){}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instructorId'] && this.instructorId !== null) {
      this.loadInstructor(this.instructorId);
    }
  }
  loadInstructor(id:any){
    this._ManagmentInstructorService.getInstructorById(id).subscribe({
      next:(response)=> {
        console.log(response);
        this.instructorDetails=response
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
  }
  updateInstructor(id:any , instructor:any){
    this._ManagmentInstructorService.updateInstructor(id,instructor).subscribe({
      next:(response) =>{
        console.log(response);
        this.closeModal("updateModal")
        this.openDialog(response.state, response.message)
        this.loadInstructor(id)
      },
      error:(err)=> {
        console.log(err);
        
      },
    })
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
  onFileSelected(event: any, imageType: string): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Vérifier le format des données base64
        console.log('Data URL:', reader.result);
        if (imageType === 'imageprofile') {
          this.instructorDetails.imageprofile = reader.result?.toString().split(',')[1];
        } else if (imageType === 'imageCouvertir') {
          this.instructorDetails.imageCouvertir = reader.result?.toString().split(',')[1];
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  
}
