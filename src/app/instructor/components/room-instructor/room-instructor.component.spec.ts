import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInstructorComponent } from './room-instructor.component';

describe('RoomInstructorComponent', () => {
  let component: RoomInstructorComponent;
  let fixture: ComponentFixture<RoomInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomInstructorComponent]
    });
    fixture = TestBed.createComponent(RoomInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
