import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationInstructorComponent } from './publication-instructor.component';

describe('PublicationInstructorComponent', () => {
  let component: PublicationInstructorComponent;
  let fixture: ComponentFixture<PublicationInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationInstructorComponent]
    });
    fixture = TestBed.createComponent(PublicationInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
