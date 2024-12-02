import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';
import { CategoryService } from 'src/app/shared/serices/category.service';
import * as bootstrap from 'bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit,OnInit {
  subcategoryDataSource = new MatTableDataSource<any>(); // Data source for the table
  displayedColumns: string[] = ['id', 'name', 'image', 'numberOfCourses','Delete' , 'Update' , 'View']; // Columns to display
  totalSubcategories: number = 0; // Total number of subcategories
  pageSize = 5; // Number of items per page
  currentPage = 0; // Current page index
  categoryForm: FormGroup;
idCategoryGlobal:any
  imageBytes: string | undefined; // Base64 string for image
  carouselItems: any[][] = [];
categoryData :any[] =[]
categoryDetails:any
updateCategoryForm: FormGroup;
selectedCategory: any;
  private modalElement!: HTMLElement; // To hold reference to the Bootstrap modal

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private dialog: MatDialog) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required]
    });
    this.updateCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required]
    });
  }
  ngOnInit(): void {
this.loadCategories()  }
view(id: any) {
  console.log("hello");

  // Remove the yellow background from any previously selected card
  const previousCard = document.querySelector('.card.bg-warning');
  if (previousCard) {
    previousCard.classList.remove('bg-warning');
  }

  // Find the card corresponding to the clicked element using the provided id
  const selectedCard = document.querySelector(`#card-${id}`);
  if (selectedCard) {
    selectedCard.classList.add('bg-warning');
  }

  // Fetch category details by ID
  this.categoryService.getCategoryById(id).subscribe({
    next: (response) => {
      console.log('Response:', response);
      this.openDialog(response.status, response.message);

      // Extract category details
      this.categoryDetails = response.data;
      console.log(this.categoryDetails);

      // Extract subcategory details
      const subcategories = this.categoryDetails.subCategories;
      this.totalSubcategories = subcategories.length;

      // Prepare data for the table
      const tableData = subcategories.map((subcategory: { id: any; name: any; imageUrl: any; courses: any[]; }) => ({
        id: subcategory.id,
        name: subcategory.name,
        imageUrl: subcategory.imageUrl,
        numberOfCourses: subcategory.courses.length
      }));

      // Set the data source for the table with pagination
      this.subcategoryDataSource.data = tableData.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
    },
    error: (error) => {
      console.log('Error:', error);
      this.openDialog("failed", error.message);
    }
  });

  console.log(id);
}
deleteSubCategory(ele:any){
  console.log(ele);
  const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez supprimer cette subcategory "+ele.name+"?" }});
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.categoryService.deleteSubCategory(ele.id).subscribe(
      {
        next:(response)=> {
          console.log(response);
          
this.openDialog(response.state , response.message)
this.loadCategories()

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
deleteCategory(ele:any){
  console.log(ele);
  const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez supprimer cette category "+ele.name+"?" }});
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.categoryService.deleteCategory(ele.id).subscribe(
      {
        next:(response)=> {
          console.log(response);
          
this.openDialog(response.state , response.message)
this.loadCategories()


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
// Method to handle page change
onPageChange(event: PageEvent) {
  this.currentPage = event.pageIndex;
  this.subcategoryDataSource.data = this.categoryDetails.subcategories.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
}
  // Called after the component view has been initialized
  ngAfterViewInit(): void {
    this.modalElement = document.getElementById('exampleModal') as HTMLElement;
  }
  loadCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        console.log(response);
        this.categoryData=response.data
        this.openDialog(response.status, response.message);
        this.carouselItems = this.chunkArray(response.data, 3);
        console.log(this.carouselItems);
        

      },
      error: (error) => {
        this.openDialog("failed", error.message);
        console.error('Error fetching categories:', error);
      }
    });
  }
   // Helper function to chunk array into smaller arrays of size chunkSize
   chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  openDialog(state: string, message: string) {
    this.dialog.open(ResponseDialogComponent, {
      data: { state, message },
      width: '600px'
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
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = {
        name: this.categoryForm.get('name')?.value,
        imageUrl: this.imageBytes
      };
      console.log('Form Data:', formData);

      // Sending data to the backend
      this.categoryService.aDdCategory(formData).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.hideModalAndOpenDialog(response.state, response.message);
          this.loadCategories()

        },
        error: (error) => {
          console.log('Error:', error);
          this.hideModalAndOpenDialog("failed", error.message);
        }
      });
    }
  }

  hideModalAndOpenDialog(state: string, message: string): void {
    if (this.modalElement) {
      const modal = bootstrap.Modal.getInstance(this.modalElement) || new bootstrap.Modal(this.modalElement);
      modal.hide();
      document.querySelector('.modal-backdrop')?.remove();

      // Wait for the modal to be hidden before opening the dialog
      this.modalElement.addEventListener('hidden.bs.modal', () => {
        this.openDialog(state, message);
      }, { once: true });
    }
  }

  openUpdateModal(category: any): void {
    this.selectedCategory = category;
    console.log(category);
    
    this.updateCategoryForm.patchValue({
      name: category.name,
      imageUrl: category.imageUrl
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
  
  onUpdate(): void {
    if (this.updateCategoryForm.valid) {
      this.closeModal("updateModal")
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez mise a jour cette category ?" }});
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedCategory = this.updateCategoryForm.value;
          const formData = {
            name: this.updateCategoryForm.get('name')?.value,
            imageUrl: this.imageBytes
          };
          const categoryId = this.selectedCategory.id; // Utiliser l'ID de la catégorie sélectionnée
          console.log(categoryId);
          this.categoryService.updateCategory(categoryId, formData).subscribe(
          {
            next:(response)=> {
              console.log('Category updated successfully:', response);
this.openDialog(response.state , response.message)
this.loadCategories()

            },
            error:(error) => {
              console.error('Error updating category:', error);
              this.openDialog("failed", error.message);

            }
          }
          );
        }
      });
    }
  }
  AddSubCategory(id:any){
    console.log(id);
    this.idCategoryGlobal=id

    
  }
  onAjoute(){
    if (this.categoryForm.valid) {
      const formData = {
        name: this.categoryForm.get('name')?.value,
        imageUrl: this.imageBytes
      };
      console.log('Form Data:', formData);

      // Sending data to the backend
      this.categoryService.adDSubCategory(this.idCategoryGlobal,formData).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.closeModal("ajouterSubModal")
          this.openDialog(response.state, response.message)
          this.loadCategories()

        },
        error: (error) => {
          console.log('Error:', error);
          this.closeModal("ajouterSubModal")
          this.openDialog("failed", error.message)
        }
      });
    }
  }
}

