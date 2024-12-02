import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesDetailsComponent } from './subcategories-details.component';

describe('SubcategoriesDetailsComponent', () => {
  let component: SubcategoriesDetailsComponent;
  let fixture: ComponentFixture<SubcategoriesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoriesDetailsComponent]
    });
    fixture = TestBed.createComponent(SubcategoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
