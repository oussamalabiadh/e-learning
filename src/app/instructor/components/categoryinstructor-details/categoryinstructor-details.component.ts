import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';
import { CategoryService } from 'src/app/shared/serices/category.service';

@Component({
  selector: 'app-categoryinstructor-details',
  templateUrl: './categoryinstructor-details.component.html',
  styleUrls: ['./categoryinstructor-details.component.css']
})
export class CategoryinstructorDetailsComponent implements OnChanges{
  @Input() categoryId: number | null = null;
  categoryDetails: any;
  subcategoryDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'image', 'numberOfCourses', 'actions'];
  subcategoryCount: number = 0;
  pageSize: number = 5;
  updateCategoryForm: FormGroup;
  selectedCategory: any;
  imageBytes: string | undefined; // Base64 string for image

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService,  private dialog: MatDialog, private fb: FormBuilder, private router:Router) {
    this.updateCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] && this.categoryId !== null) {
      this.getCategoryDetails(this.categoryId);
    }
  }

  getCategoryDetails(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (response) => {
        this.categoryDetails = response.data;
        this.subcategoryCount = this.categoryDetails.subCategories.length;

        // Prepare data for the table
        const tableData = this.categoryDetails.subCategories.map((subcategory: any) => ({
          id: subcategory.id,
          name: subcategory.name,
          imageUrl: subcategory.imageUrl,
          numberOfCourses: subcategory.courses.length
        }));

        this.subcategoryDataSource.data = tableData;
        this.subcategoryDataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching category details:', error);
      }
    });
  }

  viewSubCategory(el: any): void {
    this.router.navigate(['/instructor/subcategory', el.id]);
  }

  updateSubCategory(id: number): void {
    // Implement update functionality
  }

  deleteSubCategory(ele: any): void {
    console.log(ele);
  const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez supprimer cette subcategory "+ele.name+"?" }});
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.categoryService.deleteSubCategory(ele.id).subscribe(
      {
        next:(response)=> {
          console.log(response);
          
this.openDialog(response.state , response.message)
this.getCategoryDetails(ele.id);
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
  openDialog(state: string, message: string) {
    this.dialog.open(ResponseDialogComponent, {
      data: { state, message },
      width: '600px'
    });
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
          this.categoryService.updateSubCategory(categoryId, formData).subscribe(
          {
            next:(response)=> {
              console.log('Category updated successfully:', response);
this.openDialog(response.state , response.message)
this.getCategoryDetails(categoryId)

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
  openUpdateModal(category: any): void {
    this.selectedCategory = category;
    console.log(category);
    
    this.updateCategoryForm.patchValue({
      name: category.name,
      imageUrl: category.imageUrl
    });
  }
 
}
