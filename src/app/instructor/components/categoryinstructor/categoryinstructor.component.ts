import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/serices/category.service';

@Component({
  selector: 'app-categoryinstructor',
  templateUrl: './categoryinstructor.component.html',
  styleUrls: ['./categoryinstructor.component.css']
})
export class CategoryinstructorComponent implements OnInit {
  categories:any
  selectedCategoryId: number | null = null;  // Track selected category

 constructor(private CategoryService:CategoryService){}
  ngOnInit(): void {
    this.loadCatgory()
  }

  loadCatgory(){
    this.CategoryService.getAllCategory().subscribe({
      next:(response)=>{
        console.log(response);
        this.categories=response.data
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }
  view(category:any){
    this.selectedCategoryId =category. id;

    // Remove the yellow background from any previously selected card
  const previousCard = document.querySelector('.card.bg-warning');
  if (previousCard) {
    previousCard.classList.remove('bg-warning');
  }

  // Find the card corresponding to the clicked element using the provided id
  const selectedCard = document.querySelector(`#card-${category.id}`);
  if (selectedCard) {
    selectedCard.classList.add('bg-warning');
  }
  }
}
