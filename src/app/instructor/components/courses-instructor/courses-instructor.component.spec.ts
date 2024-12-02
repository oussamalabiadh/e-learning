import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInstructorComponent } from './courses-instructor.component';

describe('CoursesInstructorComponent', () => {
  let component: CoursesInstructorComponent;
  let fixture: ComponentFixture<CoursesInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesInstructorComponent]
    });
    fixture = TestBed.createComponent(CoursesInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
