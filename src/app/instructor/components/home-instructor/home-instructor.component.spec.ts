import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInstructorComponent } from './home-instructor.component';

describe('HomeInstructorComponent', () => {
  let component: HomeInstructorComponent;
  let fixture: ComponentFixture<HomeInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeInstructorComponent]
    });
    fixture = TestBed.createComponent(HomeInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
