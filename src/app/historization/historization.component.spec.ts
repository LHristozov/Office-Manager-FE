import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorizationComponent } from './historization.component';

describe('HistorizationComponent', () => {
  let component: HistorizationComponent;
  let fixture: ComponentFixture<HistorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
