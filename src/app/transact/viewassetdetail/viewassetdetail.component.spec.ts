import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassetdetailComponent } from './viewassetdetail.component';

describe('ViewassetdetailComponent', () => {
  let component: ViewassetdetailComponent;
  let fixture: ComponentFixture<ViewassetdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewassetdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewassetdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
