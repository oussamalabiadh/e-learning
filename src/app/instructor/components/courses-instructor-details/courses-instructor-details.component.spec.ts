import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInstructorDetailsComponent } from './courses-instructor-details.component';

describe('CoursesInstructorDetailsComponent', () => {
  let component: CoursesInstructorDetailsComponent;
  let fixture: ComponentFixture<CoursesInstructorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesInstructorDetailsComponent]
    });
    fixture = TestBed.createComponent(CoursesInstructorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
