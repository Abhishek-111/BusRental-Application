import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBussComponent } from './search-buses.component';

describe('SearchBussComponent', () => {
  let component: SearchBussComponent;
  let fixture: ComponentFixture<SearchBussComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBussComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
