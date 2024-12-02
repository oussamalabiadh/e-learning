import { TestBed } from '@angular/core/testing';

import { ManagmentInstructorService } from './managment-instructor.service';

describe('ManagmentInstructorService', () => {
  let service: ManagmentInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagmentInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
