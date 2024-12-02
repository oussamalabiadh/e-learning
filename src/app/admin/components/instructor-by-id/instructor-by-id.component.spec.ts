import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorByIdComponent } from './instructor-by-id.component';

describe('InstructorByIdComponent', () => {
  let component: InstructorByIdComponent;
  let fixture: ComponentFixture<InstructorByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorByIdComponent]
    });
    fixture = TestBed.createComponent(InstructorByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
