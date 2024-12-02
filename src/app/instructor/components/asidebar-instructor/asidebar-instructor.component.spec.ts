import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsidebarInstructorComponent } from './asidebar-instructor.component';

describe('AsidebarInstructorComponent', () => {
  let component: AsidebarInstructorComponent;
  let fixture: ComponentFixture<AsidebarInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsidebarInstructorComponent]
    });
    fixture = TestBed.createComponent(AsidebarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
