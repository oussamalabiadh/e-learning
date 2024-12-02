import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryinstructorComponent } from './categoryinstructor.component';

describe('CategoryinstructorComponent', () => {
  let component: CategoryinstructorComponent;
  let fixture: ComponentFixture<CategoryinstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryinstructorComponent]
    });
    fixture = TestBed.createComponent(CategoryinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
