import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryinstructorComponent } from './sub-categoryinstructor.component';

describe('SubCategoryinstructorComponent', () => {
  let component: SubCategoryinstructorComponent;
  let fixture: ComponentFixture<SubCategoryinstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCategoryinstructorComponent]
    });
    fixture = TestBed.createComponent(SubCategoryinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
