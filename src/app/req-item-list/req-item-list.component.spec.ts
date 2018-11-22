import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqItemListComponent } from './req-item-list.component';

describe('ReqItemListComponent', () => {
  let component: ReqItemListComponent;
  let fixture: ComponentFixture<ReqItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
