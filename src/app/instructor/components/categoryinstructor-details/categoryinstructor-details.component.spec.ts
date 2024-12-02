import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryinstructorDetailsComponent } from './categoryinstructor-details.component';

describe('CategoryinstructorDetailsComponent', () => {
  let component: CategoryinstructorDetailsComponent;
  let fixture: ComponentFixture<CategoryinstructorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryinstructorDetailsComponent]
    });
    fixture = TestBed.createComponent(CategoryinstructorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
